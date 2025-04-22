from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.conf import settings
from ..models import User
from django.utils import timezone
import logging

logger = logging.getLogger('auth')

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_user(request):
    """
    Verify if a user exists and return their role.
    Also handles logging of unrecognized login attempts.
    """
    email = request.data.get('email')
    ip_address = request.META.get('REMOTE_ADDR')
    user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown')
    
    log_context = {
        'ip_address': ip_address,
        'email': email,
        'user_agent': user_agent,
        'timestamp': timezone.now().isoformat()
    }
    
    if not email:
        logger.warning('Login attempt without email', extra=log_context)
        return Response({
            'status': 'error',
            'message': 'Email is required',
            'role': None
        }, status=400)

    try:
        user = User.objects.get(email=email)
        log_context.update({
            'user_id': user.id,
            'role': user.role,
            'name': user.get_full_name()
        })
        
        # Log successful verification
        logger.info(
            "Successful user verification",
            extra=log_context
        )
        
        # Update user's last login attempt
        user.last_login_attempt = timezone.now()
        user.failed_login_attempts = 0  # Reset failed attempts
        user.save(update_fields=['last_login_attempt', 'failed_login_attempts'])
        
        return Response({
            'status': 'success',
            'role': user.role,
            'name': user.get_full_name()
        })
        
    except User.DoesNotExist:
        # Log unrecognized login attempt
        logger.warning(
            "Unrecognized login attempt",
            extra=log_context
        )
        
        return Response({
            'status': 'error',
            'message': 'User not found in system',
            'role': None
        }, status=404)
