from rest_framework import authentication
from rest_framework import exceptions
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

class GoogleIDTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            # Extract the token
            auth_parts = auth_header.split(' ')
            if len(auth_parts) != 2 or auth_parts[0].lower() != 'bearer':
                return None
            token = auth_parts[1]

            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID
            )

            # Get the user's email from the verified token
            email = idinfo['email']
            
            # Get or create a user based on the email
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email,
                    'is_active': True
                }
            )

            return (user, None)

        except ValueError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))
