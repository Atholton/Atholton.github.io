"""
Authentication System Tests

This module contains tests for the authentication system, including:
- User verification
- Role-based access
- Email validation
- Error handling
"""

from django.test import TestCase, Client
from django.urls import reverse
from accounts.models import User
from rest_framework import status
import json

class AuthenticationTests(TestCase):
    def setUp(self):
        """Set up test data"""
        self.client = Client()
        # Create test users
        self.teacher = User.objects.create(
            email='teacher@inst.hcpss.org',
            role='teacher',
            first_name='Test',
            last_name='Teacher'
        )
        self.student = User.objects.create(
            email='student@inst.hcpss.org',
            role='student',
            first_name='Test',
            last_name='Student'
        )
        self.admin = User.objects.create(
            email='admin@inst.hcpss.org',
            role='admin',
            first_name='Test',
            last_name='Admin'
        )

    def test_verify_existing_users(self):
        """Test verification of existing accounts for all roles"""
        test_cases = [
            (self.teacher, 'teacher'),
            (self.student, 'student'),
            (self.admin, 'admin')
        ]
        
        for user, role in test_cases:
            with self.subTest(role=role):
                response = self.client.post(
                    reverse('verify_user'),
                    {'email': user.email},
                    content_type='application/json'
                )
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                data = json.loads(response.content)
                self.assertEqual(data['role'], role)
                self.assertEqual(data['name'], f'Test {role.title()}')

    def test_verify_nonexistent_user(self):
        """Test verification of non-existent user"""
        response = self.client.post(
            reverse('verify_user'),
            {'email': 'nonexistent@inst.hcpss.org'},
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_verify_invalid_requests(self):
        """Test verification with invalid inputs"""
        test_cases = [
            ({}, 'Missing email'),
            ({'email': 'invalid-email'}, 'Invalid email format'),
            ({'email': 'test@gmail.com'}, 'Non-inst.hcpss.org domain'),
        ]
        
        for data, case_name in test_cases:
            with self.subTest(case=case_name):
                response = self.client.post(
                    reverse('verify_user'),
                    data,
                    content_type='application/json'
                )
                self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_failed_login_tracking(self):
        """Test tracking of failed login attempts"""
        # Attempt to verify nonexistent user multiple times
        email = 'nonexistent@inst.hcpss.org'
        for _ in range(3):
            response = self.client.post(
                reverse('verify_user'),
                {'email': email},
                content_type='application/json'
            )
            self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
            
        # Check logs for failed attempts (if logging is enabled)
        # This would need to be implemented based on your logging setup
