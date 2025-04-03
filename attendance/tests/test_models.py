from django.test import TestCase
from django.contrib.auth import get_user_model
from attendance.models import Student, Announcement, Notification

User = get_user_model()

class StudentModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a test teacher
        cls.teacher = User.objects.create(
            username='testteacher',
            first_name='Test',
            last_name='Teacher'
        )
        
        # Create a test student
        cls.student = Student.objects.create(
            name='John Doe',
            grade=9,
            hcpss_email='jdoe1234@inst.hcpss.org',
            account_email='john@example.com',
            phone_num='123-456-7890',
            receive_notif=True,
            teacher=cls.teacher,
            theme='light',
            temp_teacher='Smith, J.'
        )

    def test_student_creation(self):
        """Test that a student can be created with all fields"""
        self.assertEqual(self.student.name, 'John Doe')
        self.assertEqual(self.student.grade, 9)
        self.assertEqual(self.student.teacher, self.teacher)

    def test_student_str(self):
        """Test the string representation of a student"""
        self.assertEqual(str(self.student), 'John Doe (Grade 9)')

class AnnouncementModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a test teacher
        cls.teacher = User.objects.create(
            username='testteacher',
            first_name='Test',
            last_name='Teacher'
        )
        
        # Create a test announcement
        cls.announcement = Announcement.objects.create(
            title='Test Announcement',
            body='This is a test announcement',
            teacher=cls.teacher
        )

    def test_announcement_creation(self):
        """Test that an announcement can be created"""
        self.assertEqual(self.announcement.title, 'Test Announcement')
        self.assertEqual(self.announcement.teacher, self.teacher)

    def test_announcement_str(self):
        """Test the string representation of an announcement"""
        expected = f'Test Announcement by Test Teacher'
        self.assertEqual(str(self.announcement), expected)

class NotificationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create a test notification
        cls.notification = Notification.objects.create(
            message='Test notification message'
        )

    def test_notification_creation(self):
        """Test that a notification can be created"""
        self.assertEqual(self.notification.message, 'Test notification message')

    def test_notification_str(self):
        """Test the string representation of a notification"""
        self.assertTrue(str(self.notification).startswith('Notification from'))
