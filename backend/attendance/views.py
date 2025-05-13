from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Student, Announcement
from .serializers import StudentSerializer, AnnouncementSerializer
import logging

logger = logging.getLogger('api')

class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Student.objects.all()
        
        # Filter by grade if specified
        grade = self.request.query_params.get('grade', None)
        if grade is not None:
            queryset = queryset.filter(grade=grade)
        
        # Filter by teacher if specified
        teacher = self.request.query_params.get('teacher', None)
        if teacher is not None:
            queryset = queryset.filter(teacher_id=teacher)
        
        # Search by name if specified
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset

    @action(detail=False, methods=['get'], url_path='by-email/(?P<email>[^/.]+)')
    def by_email(self, request, email=None):
        """Get student details by email."""
        try:
            logger.info(f"Fetching student by email: {email}")
            
            # Try to find student by either account_email or hcpss_email
            student = Student.objects.filter(account_email=email).first() or \
                     Student.objects.filter(hcpss_email=email).first()
            
            if not student:
                logger.warning(f"Student not found for email: {email}")
                return Response({
                    'error': 'Student not found'
                }, status=status.HTTP_404_NOT_FOUND)
            
            # Just return the student data
            serialized_data = StudentSerializer(student).data
            logger.info(f"Successfully fetched student data for: {email}")
            return Response(serialized_data)
            
        except Exception as e:
            logger.error(f"Error fetching student by email: {e}", extra={
                'email': email,
                'user': request.user.email if request.user else None
            })
            return Response({
                'error': 'Failed to fetch student data'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AnnouncementViewSet(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        try:
            # Get the authenticated user's email
            user_email = self.request.user.email
            logger.info(f"Fetching announcements for user: {user_email}")
            
            # Find the student by email
            student = Student.objects.filter(account_email=user_email).first() or \
                     Student.objects.filter(hcpss_email=user_email).first()
            
            if student:
                # Get announcements for the student's teacher
                queryset = Announcement.objects.filter(teacher=student.teacher)
                logger.info(f"Found {queryset.count()} announcements for student: {user_email}")
            else:
                # If no student found, return empty queryset
                logger.warning(f"No student found for email: {user_email}, returning empty queryset")
                queryset = Announcement.objects.none()
                
            return queryset.order_by('-timestamp')
            
        except Exception as e:
            logger.error(f"Error fetching announcements: {e}", extra={
                'user': self.request.user.email if self.request.user else None
            })
            return Announcement.objects.none()
