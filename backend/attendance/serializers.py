from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Student, Announcement

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class StudentSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)
    teacher_period2 = TeacherSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'name', 'grade', 'hcpss_email', 'account_email', 'phone_num', 'teacher', 'teacher_period2', 'temp_teacher']

class AnnouncementSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)

    class Meta:
        model = Announcement
        fields = ['id', 'title', 'body', 'teacher', 'timestamp']
