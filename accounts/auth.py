from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework import exceptions
from google.oauth2 import id_token
from google.auth.transport import requests

User = get_user_model()

class GoogleIDTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        try:
            # Extract the token from "Bearer <token>"
            token = auth_header.split(' ')[1]
            
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                None  # We don't verify the audience since we're using the token for our own API
            )

            # Get the user's email from the verified token
            email = idinfo['email']
            
            # Get or create a user with this email
            try:
                user = User.objects.get(email=email)
                return (user, None)
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed('No user found with this email')

        except ValueError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Authentication failed: {str(e)}')

    def authenticate_header(self, request):
        return 'Bearer'
