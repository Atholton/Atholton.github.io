from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

class Student(models.Model):
    # Basic Info
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    name = models.CharField(max_length=255)
    grade = models.IntegerField(choices=[(i, i) for i in range(9, 13)])
    hcpss_email = models.EmailField(unique=True)
    account_email = models.EmailField(unique=True, blank=True, null=True)
    phone_num = models.CharField(max_length=20, blank=True, null=True)

    # Teacher Assignment
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='students',
        help_text='Primary teacher for this student'
    )

    # Preferences
    theme = models.CharField(
        max_length=10,
        choices=[('light', 'Light'), ('dark', 'Dark')],
        default='light'
    )
    notifications_enabled = models.BooleanField(default=True)

    def clean(self):
        if self.teacher.role != 'teacher':
            raise ValidationError({'teacher': 'Must be a teacher'})

    def __str__(self):
        return f"{self.name} (Grade {self.grade})"

    class Meta:
        ordering = ['grade', 'name']

class ClassPeriod(models.Model):
    name = models.CharField(max_length=50)
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='class_periods'
    )
    room_number = models.CharField(max_length=10)
    capacity = models.IntegerField(default=30)
    current_enrollment = models.IntegerField(default=0)

    def clean(self):
        if self.teacher.role != 'teacher':
            raise ValidationError({'teacher': 'Must be a teacher'})
        if self.current_enrollment > self.capacity:
            raise ValidationError({'current_enrollment': 'Exceeds capacity'})

    def __str__(self):
        return f"{self.name} - Room {self.room_number} ({self.teacher.get_full_name()})"

class Attendance(models.Model):
    STATUS_CHOICES = [
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('tardy', 'Tardy'),
        ('excused', 'Excused Absence')
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendance_records')
    class_period = models.ForeignKey(ClassPeriod, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    notes = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='attendance_updates'
    )

    class Meta:
        unique_together = ['student', 'class_period', 'date']
        ordering = ['-date', '-timestamp']

    def __str__(self):
        return f"{self.student.name} - {self.class_period.name} - {self.date} ({self.status})"

class Announcement(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='announcements'
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    target_grade = models.IntegerField(
        choices=[(i, i) for i in range(9, 13)],
        null=True,
        blank=True
    )
    is_urgent = models.BooleanField(default=False)

    def clean(self):
        if self.teacher.role != 'teacher':
            raise ValidationError({'teacher': 'Must be a teacher'})

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.title} by {self.teacher.get_full_name()}"

