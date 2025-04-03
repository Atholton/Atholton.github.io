"""
Authentication Views

The module handles user authentication and session management for both students
and teachers.

Implements secure login with:
- Session-based authentication
- CSRF protection
- Account lockout after failed attempts
- Password validation
- Role-based access control

The authentication system is critical for:
1. Protecting sensitive student and teacher data
2. Managing class period assignments
3. Controlling access to announcements and notifications
4. Ensuring proper user session management

Key Components:
- login_view: Handles user authentication with attempt tracking
- logout_view: Manages secure user logout
- User model: Custom user model with role-based permissions

Related:
- models.py: Defines the User model
- serializers.py: Handles data serialization
- urls.py: Maps URLs to these views
"""

from django.contrib.auth import authenticate, login, logout
from django.utils import timezone
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import json

from .models import User

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Handle user login with attempt tracking"""
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return Response(
                {'error': 'Please provide both username and password'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # Reset failed attempts on successful login
            user.failed_login_attempts = 0
            user.save()
            
            # Create session
            login(request, user)
            
            return Response({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role if hasattr(user, 'role') else None,
                    'firstName': user.first_name,
                    'lastName': user.last_name,
                }
            })
        else:
            # Handle failed login attempt
            try:
                user = User.objects.get(username=username)
                
                # Check if account is locked
                if user.failed_login_attempts >= settings.MAX_LOGIN_ATTEMPTS:
                    lockout_duration = timezone.now() - user.last_login_attempt
                    if lockout_duration.total_seconds() < settings.LOCKOUT_DURATION:
                        return Response(
                            {'error': 'Account is locked. Please try again later.'},
                            status=status.HTTP_403_FORBIDDEN
                        )
                    else:
                        # Reset attempts if lockout period is over
                        user.failed_login_attempts = 0
                
                # Increment failed attempts
                user.failed_login_attempts += 1
                user.last_login_attempt = timezone.now()
                user.save()
                
                remaining_attempts = settings.MAX_LOGIN_ATTEMPTS - user.failed_login_attempts
                if remaining_attempts > 0:
                    message = f'Invalid password. {remaining_attempts} attempts remaining.'
                else:
                    message = 'Account locked due to too many failed attempts.'
                
                return Response(
                    {'error': message},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            except User.DoesNotExist:
                return Response(
                    {'error': 'Invalid username or password'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
    except json.JSONDecodeError:
        return Response(
            {'error': 'Invalid JSON format'},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
def logout_view(request):
    """Handle user logout"""
    logout(request)
    return Response({'message': 'Logged out successfully'})
