from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from attendance.models import Student, Announcement

User = get_user_model()

class AttendanceAPITests(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        
        # Create a test teacher
        self.teacher = User.objects.create_user(
            username='testteacher',
            password='testpass123',
            first_name='Test',
            last_name='Teacher'
        )
        
        # Create test students
        self.student1 = Student.objects.create(
            name='John Doe',
            grade=9,
            hcpss_email='jdoe@inst.hcpss.org',
            teacher=self.teacher
        )
        
        self.student2 = Student.objects.create(
            name='Jane Smith',
            grade=10,
            hcpss_email='jsmith@inst.hcpss.org',
            teacher=self.teacher
        )
        
        # Create test announcement
        self.announcement = Announcement.objects.create(
            title='Test Announcement',
            body='Test body',
            teacher=self.teacher
        )
        
        # Create API client
        self.client = APIClient()

    def test_student_list_unauthorized(self):
        """Test that unauthorized users can't access student list API"""
        url = reverse('attendance:student_list_api')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_student_list_authorized(self):
        """Test that authorized users can access student list API"""
        self.client.force_authenticate(user=self.user)
        url = reverse('attendance:student_list_api')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
        self.assertIn('John Doe', [s['name'] for s in response.data['results']])

    def test_student_list_filtering(self):
        """Test student list API filtering"""
        self.client.force_authenticate(user=self.user)
        url = reverse('attendance:student_list_api')
        
        # Test grade filter
        response = self.client.get(url, {'grade': 9})
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'John Doe')
        
        # Test search
        response = self.client.get(url, {'search': 'Jane'})
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Jane Smith')

    def test_student_detail(self):
        """Test student detail API"""
        self.client.force_authenticate(user=self.user)
        url = reverse('attendance:student_detail_api', kwargs={'student_id': self.student1.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['student']['name'], 'John Doe')
        self.assertIn('announcements', response.data)

    def test_announcement_list(self):
        """Test announcement list API"""
        self.client.force_authenticate(user=self.user)
        url = reverse('attendance:announcement_list_api')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], 'Test Announcement')
