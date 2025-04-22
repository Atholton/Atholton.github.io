"""
Tests for the accounts app models.

These tests verify the validation rules and custom methods
of the User model.
"""

from django.test import TestCase
from django.core.exceptions import ValidationError
from accounts.models import User

class UserModelTests(TestCase):

    def test_create_valid_student(self):
        """Test creating a valid student user"""
        user = User.objects.create_user(
            email='student@inst.hcpss.org',
            password='password123',
            role='student',
            first_name='Test',
            last_name='Student',
            student_id='123456',
            grade_level=10
        )
        self.assertEqual(user.email, 'student@inst.hcpss.org')
        self.assertEqual(user.role, 'student')
        self.assertEqual(user.student_id, '123456')
        self.assertEqual(user.grade_level, 10)
        self.assertTrue(user.is_student())
        self.assertFalse(user.is_teacher())
        self.assertFalse(user.is_admin())
        self.assertEqual(user.get_full_name(), 'Test Student')

    def test_create_valid_teacher(self):
        """Test creating a valid teacher user"""
        user = User.objects.create_user(
            email='teacher@inst.hcpss.org',
            password='password123',
            role='teacher',
            first_name='Test',
            last_name='Teacher',
            department='Science'
        )
        self.assertEqual(user.role, 'teacher')
        self.assertEqual(user.department, 'Science')
        self.assertFalse(user.is_student())
        self.assertTrue(user.is_teacher())
        self.assertFalse(user.is_admin())

    def test_invalid_email_domain(self):
        """Test creating a user with an invalid email domain"""
        with self.assertRaises(ValidationError):
            User.objects.create_user(email='test@gmail.com', role='student')

    def test_invalid_student_id(self):
        """Test validation of student_id field"""
        test_cases = ['123', '12345678901', 'abcde', '1234a']
        for invalid_id in test_cases:
            with self.subTest(student_id=invalid_id):
                user = User(email='student@inst.hcpss.org', role='student', student_id=invalid_id)
                with self.assertRaises(ValidationError):
                    user.full_clean() # Trigger model validation

    def test_invalid_grade_level(self):
        """Test validation of grade_level field"""
        test_cases = [8, 13]
        for invalid_grade in test_cases:
            with self.subTest(grade=invalid_grade):
                user = User(email='student@inst.hcpss.org', role='student', grade_level=invalid_grade)
                with self.assertRaises(ValidationError):
                    user.full_clean()

    def test_invalid_role_assignment(self):
        """Test assigning student fields to a teacher and vice versa"""
        # Teacher with student fields
        user_teacher = User(email='teacher@inst.hcpss.org', role='teacher', student_id='12345', grade_level=10)
        with self.assertRaises(ValidationError):
            user_teacher.full_clean()
        
        # Student with teacher fields
        user_student = User(email='student@inst.hcpss.org', role='student', department='Math')
        with self.assertRaises(ValidationError):
            user_student.full_clean()

    def test_role_specific_methods(self):
        """Test role checking helper methods"""
        student = User(role='student')
        teacher = User(role='teacher')
        admin = User(role='admin')
        self.assertTrue(student.is_student())
        self.assertFalse(student.is_teacher())
        self.assertFalse(teacher.is_student())
        self.assertTrue(teacher.is_teacher())
        self.assertTrue(admin.is_admin())
        self.assertFalse(admin.is_student())
