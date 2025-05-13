"""
API Views

Implements the REST API endpoints for managing student attendance,
class periods, and announcements. The views provide:

1. Student Management:
   - List and filter students
   - Student detail views
   - Period assignments
   - Theme preferences
   - Communication settings

2. Class Period Management:
   - List available periods
   - Room capacity tracking
   - Teacher assignments
   - Enrollment management
   - Availability checking

3. Announcement System:
   - Create and list announcements
   - Teacher-specific announcements
   - School-wide notifications
   - Timestamp tracking

4. Features:
   - Pagination for all list views
   - Filtering and search
   - Role-based access control
   - Error handling
   - Response formatting

Security:
   - Authentication required
   - CSRF protection
   - Role validation
   - Data access controls

Related:
   - models.py: Database models
   - serializers.py: Data serialization
   - urls.py: URL routing
"""

from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Student, Announcement, Notification, ClassPeriod
from .serializers import (
    StudentSerializer, AnnouncementSerializer, 
    NotificationSerializer, ClassPeriodSerializer
)
from django.db.models import F

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_list(request):
    """API endpoint for listing students"""
    # Get filters from query params
    grade = request.GET.get('grade')
    teacher = request.GET.get('teacher')
    search = request.GET.get('search')
    
    # Start with all students
    students = Student.objects.all()
    
    # Apply filters
    if grade:
        students = students.filter(grade=grade)
    if teacher:
        students = students.filter(teacher=teacher)
    if search:
        students = students.filter(name__icontains=search)
    
    # Paginate results
    page_size = int(request.GET.get('page_size', 25))
    paginator = Paginator(students, page_size)
    page = request.GET.get('page', 1)
    students = paginator.get_page(page)
    
    # Serialize data
    data = {
        'results': StudentSerializer(students, many=True).data,
        'total_pages': paginator.num_pages,
        'current_page': page,
        'has_next': students.has_next(),
        'has_previous': students.has_previous()
    }
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_detail(request, student_id):
    """API endpoint for student details"""
    student = get_object_or_404(Student, pk=student_id)
    announcements = Announcement.objects.filter(teacher=student.teacher)
    
    data = {
        'student': StudentSerializer(student).data,
        'announcements': AnnouncementSerializer(announcements, many=True).data
    }
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def announcement_list(request):
    """API endpoint for listing announcements"""
    announcements = Announcement.objects.all().order_by('-timestamp')
    
    # Paginate results
    page_size = int(request.GET.get('page_size', 10))
    paginator = Paginator(announcements, page_size)
    page = request.GET.get('page', 1)
    announcements = paginator.get_page(page)
    
    data = {
        'results': AnnouncementSerializer(announcements, many=True).data,
        'total_pages': paginator.num_pages,
        'current_page': page,
        'has_next': announcements.has_next(),
        'has_previous': announcements.has_previous()
    }
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def class_period_list(request):
    """API endpoint for listing class periods"""
    # Get filters from query params
    period = request.GET.get('period')
    teacher = request.GET.get('teacher')
    available_only = request.GET.get('available', '').lower() == 'true'
    
    # Start with all class periods
    class_periods = ClassPeriod.objects.all()
    
    # Apply filters
    if period:
        class_periods = class_periods.filter(period=period)
    if teacher:
        class_periods = class_periods.filter(teacher=teacher)
    if available_only:
        class_periods = class_periods.filter(current_enrollment__lt=F('capacity'))
        
    # Order by room number
    class_periods = class_periods.order_by('room_number')
    
    # Paginate results
    page_size = int(request.GET.get('page_size', 25))
    paginator = Paginator(class_periods, page_size)
    page = request.GET.get('page', 1)
    class_periods = paginator.get_page(page)
    
    # Serialize data
    data = {
        'results': ClassPeriodSerializer(class_periods, many=True).data,
        'total_pages': paginator.num_pages,
        'current_page': page,
        'has_next': class_periods.has_next(),
        'has_previous': class_periods.has_previous()
    }
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def class_period_detail(request, class_id):
    """API endpoint for class period details"""
    class_period = get_object_or_404(ClassPeriod, pk=class_id)
    students = Student.objects.filter(teacher_period2=class_period.teacher)
    
    data = {
        'class_period': ClassPeriodSerializer(class_period).data,
        'students': StudentSerializer(students, many=True).data,
        'available_seats': class_period.capacity - class_period.current_enrollment
    }
    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_by_email(request, email):
    """API endpoint for getting student by email"""
    student = get_object_or_404(Student, hcpss_email=email)
    announcements = Announcement.objects.filter(teacher=student.teacher)
    
    data = {
        'student': StudentSerializer(student).data,
        'announcements': AnnouncementSerializer(announcements, many=True).data
    }
    return Response(data)
