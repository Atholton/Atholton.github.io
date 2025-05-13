from .settings import *

# Override settings for development
DEBUG = True
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = True

# Session settings
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"]
CSRF_USE_SESSIONS = True
CSRF_COOKIE_HTTPONLY = True
