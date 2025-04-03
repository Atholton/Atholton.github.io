from django.test import TestCase, Client
from django.urls import reverse
from django.utils import timezone
from datetime import timedelta
from .models import User

class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            role=User.Role.STUDENT,
            student_id='12345'
        )
        self.login_url = reverse('login')
        
    def test_successful_login(self):
        response = self.client.post(
            self.login_url,
            {'username': 'testuser', 'password': 'testpass123'},
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        user = User.objects.get(username='testuser')
        self.assertEqual(user.failed_login_attempts, 0)
        
    def test_failed_login_tracking(self):
        # Test multiple failed attempts
        for i in range(3):
            response = self.client.post(
                self.login_url,
                {'username': 'testuser', 'password': 'wrongpass'},
                content_type='application/json'
            )
            self.assertEqual(response.status_code, 401)
        
        user = User.objects.get(username='testuser')
        self.assertEqual(user.failed_login_attempts, 3)
        
    def test_account_lockout(self):
        # Create 5 failed attempts
        for i in range(5):
            self.client.post(
                self.login_url,
                {'username': 'testuser', 'password': 'wrongpass'},
                content_type='application/json'
            )
        
        # Try logging in during lockout period
        response = self.client.post(
            self.login_url,
            {'username': 'testuser', 'password': 'testpass123'},
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 403)
        
    def test_lockout_reset(self):
        # Create 5 failed attempts
        for i in range(5):
            self.client.post(
                self.login_url,
                {'username': 'testuser', 'password': 'wrongpass'},
                content_type='application/json'
            )
        
        # Set last attempt to 6 minutes ago
        user = User.objects.get(username='testuser')
        user.last_login_attempt = timezone.now() - timedelta(minutes=6)
        user.save()
        
        # Should be able to login now
        response = self.client.post(
            self.login_url,
            {'username': 'testuser', 'password': 'testpass123'},
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        
        user.refresh_from_db()
        self.assertEqual(user.failed_login_attempts, 0)
