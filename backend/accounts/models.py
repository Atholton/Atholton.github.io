from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    Adds role-based access control and security features.
    """
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('teacher', 'Teacher'),
        ('admin', 'Administrator'),
    ]

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    student_id = models.CharField(max_length=10, blank=True, null=True)
    department = models.CharField(max_length=50, blank=True, null=True)
    failed_login_attempts = models.IntegerField(default=0)
    last_login_attempt = models.DateTimeField(null=True, blank=True)
    is_locked = models.BooleanField(default=False)
    lock_expiry = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Required for Django admin

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"

    def increment_login_attempts(self):
        """Increment failed login attempts and lock if threshold reached"""
        self.failed_login_attempts += 1
        self.last_login_attempt = timezone.now()
        
        if self.failed_login_attempts >= 5:  # Lock after 5 attempts
            self.is_locked = True
            self.lock_expiry = timezone.now() + timezone.timedelta(minutes=5)
        
        self.save()

    def reset_login_attempts(self):
        """Reset failed login attempts after successful login"""
        self.failed_login_attempts = 0
        self.is_locked = False
        self.lock_expiry = None
        self.save()

    def is_account_locked(self):
        """Check if account is locked"""
        if not self.is_locked:
            return False
        
        if self.lock_expiry and timezone.now() > self.lock_expiry:
            self.is_locked = False
            self.lock_expiry = None
            self.failed_login_attempts = 0
            self.save()
            return False
            
        return True

    class Meta:
        db_table = 'auth_user'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
