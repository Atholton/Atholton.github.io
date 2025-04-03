from django.db import models
from django.conf import settings

# Create your models here.

class Student(models.Model):
    """Student model based on existing database structure"""
    name = models.CharField(max_length=255)
    grade = models.IntegerField()
    hcpss_email = models.EmailField(unique=True)
    account_email = models.EmailField(blank=True)
    phone_num = models.CharField(max_length=20, blank=True)
    receive_notif = models.BooleanField(default=False)
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='students'
    )
    teacher_period2 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='period2_students'
    )
    theme = models.CharField(max_length=50, blank=True)
    temp_teacher = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = 'students'  # Match existing table name

    def __str__(self):
        return f"{self.name} (Grade {self.grade})"

class ClassPeriod(models.Model):
    """Model for tracking class periods and room assignments"""
    PERIOD_CHOICES = [
        (1, 'First Period'),
        (2, 'Second Period'),
        (3, 'Third Period'),
        (4, 'Fourth Period'),
        ('RT', 'Raider Time'),
    ]
    
    period = models.CharField(max_length=2, choices=PERIOD_CHOICES)
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='teaching_periods'
    )
    room_number = models.CharField(max_length=10)
    capacity = models.IntegerField(default=30)
    current_enrollment = models.IntegerField(default=0)
    subject = models.CharField(max_length=100)
    
    class Meta:
        unique_together = ['teacher', 'period']
        
    def __str__(self):
        return f"{self.get_period_display()} - {self.subject} ({self.teacher.get_full_name()})"
        
    def is_available(self):
        """Check if the class has available space"""
        return self.current_enrollment < self.capacity

class Announcement(models.Model):
    """Announcement model based on existing database structure"""
    timestamp = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='announcements'
    )

    class Meta:
        db_table = 'announcements'

    def __str__(self):
        return f"{self.title} by {self.teacher.get_full_name()}"

class Notification(models.Model):
    """Notification model based on existing database structure"""
    timestamp = models.DateTimeField(auto_now=True)
    message = models.TextField()

    class Meta:
        db_table = 'notifications'

    def __str__(self):
        return f"Notification from {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
