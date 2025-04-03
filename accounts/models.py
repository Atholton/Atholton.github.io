from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', _('Admin')
        TEACHER = 'TEACHER', _('Teacher')
        STUDENT = 'STUDENT', _('Student')
    
    # Basic fields
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=10,
        choices=Role.choices,
        default=Role.STUDENT,
    )
    
    # School-specific fields
    student_id = models.CharField(
        max_length=10,
        unique=True,
        null=True,
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^\d{5,10}$',
                message='Student ID must be between 5 and 10 digits',
            )
        ]
    )
    grade_level = models.IntegerField(
        null=True,
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^(9|10|11|12)$',
                message='Grade level must be between 9 and 12',
            )
        ]
    )
    department = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        help_text='Department for teachers'
    )
    
    # Security fields
    is_active = models.BooleanField(default=True)
    failed_login_attempts = models.IntegerField(default=0)
    last_login_attempt = models.DateTimeField(null=True, blank=True)
    password_changed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        
    def __str__(self):
        return f"{self.get_full_name()} ({self.role})"
    
    def is_student(self):
        return self.role == self.Role.STUDENT
        
    def is_teacher(self):
        return self.role == self.Role.TEACHER
        
    def is_admin(self):
        return self.role == self.Role.ADMIN
        
    def clean(self):
        super().clean()
        if self.is_student() and not self.student_id:
            raise ValueError('Student ID is required for student accounts')
        if self.is_teacher() and not self.department:
            raise ValueError('Department is required for teacher accounts')
