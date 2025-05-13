from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from .models import User

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_google_token(request):
    """Verify Google ID token and return user info"""
    try:
        token = request.data.get('token')
        if not token:
            return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Verify the token
        idinfo = id_token.verify_oauth2_token(
            token,
            requests.Request(),
            settings.GOOGLE_CLIENT_ID
        )

        # Get or create user
        email = idinfo['email']
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email,
                'first_name': idinfo.get('given_name', ''),
                'last_name': idinfo.get('family_name', ''),
            }
        )

        # Return user info
        return Response({
            'email': user.email,
            'role': user.role,
            'name': user.get_full_name(),
            'is_new_user': created
        })

    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': 'Authentication failed'}, status=status.HTTP_400_BAD_REQUEST)
