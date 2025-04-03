"""
Serializers

Handles the conversion of complex data types (models, querysets)
to and from Python native datatypes that can be rendered into JSON or other
content types. It provides:

1. Model Serializers:
   - StudentSerializer: Full student data with teacher info
   - ClassPeriodSerializer: Class period data with availability
   - AnnouncementSerializer: Announcement data with teacher details
   - NotificationSerializer: Basic notification data
   - UserSerializer: Basic user information

2. Nested Serialization:
   - Teacher information within student data
   - Room availability within class periods
   - Timestamp formatting for announcements
   - User role handling

3. Validation:
   - Field validation for all models
   - Custom validation for capacity and enrollment
   - Role-based field access control
   - Data type conversion and formatting

4. Features:
   - Calculated fields (e.g., available_seats)
   - Conditional field inclusion
   - Related object handling
   - Many-to-many relationship support

Related:
   - models.py: Database models
   - views.py: API views using these serializers
   - urls.py: URL routing
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Student, Announcement, Notification, ClassPeriod

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class StudentSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    teacher_period2 = UserSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = (
            'id', 'name', 'grade', 'hcpss_email', 'account_email',
            'phone_num', 'receive_notif', 'teacher', 'teacher_period2',
            'theme', 'temp_teacher'
        )

class ClassPeriodSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    available_seats = serializers.SerializerMethodField()
    
    class Meta:
        model = ClassPeriod
        fields = (
            'id', 'period', 'teacher', 'room_number', 'subject',
            'capacity', 'current_enrollment', 'available_seats'
        )
        
    def get_available_seats(self, obj):
        return obj.capacity - obj.current_enrollment

class AnnouncementSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    
    class Meta:
        model = Announcement
        fields = ('id', 'title', 'body', 'teacher', 'timestamp')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'message', 'timestamp')
