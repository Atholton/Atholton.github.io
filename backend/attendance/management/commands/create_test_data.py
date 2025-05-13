from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from attendance.models import Student, Announcement
from django.db import transaction

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates test data for development'

    @transaction.atomic
    def handle(self, *args, **kwargs):
        # Create a test teacher
        teacher, _ = User.objects.get_or_create(
            username='test_teacher',
            email='test_teacher@example.com',
            defaults={
                'first_name': 'Test',
                'last_name': 'Teacher',
                'is_staff': True
            }
        )
        teacher.set_password('test123')  # Set a password for the teacher
        teacher.save()

        # Create a test student
        student, created = Student.objects.get_or_create(
            account_email='tmccormick1104@gmail.com',
            defaults={
                'name': 'Tiffany McCormick',
                'grade': 11,
                'hcpss_email': 'tmccormick1104@gmail.com',
                'teacher': teacher
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS('Successfully created test student'))
        else:
            self.stdout.write(self.style.SUCCESS('Test student already exists'))
