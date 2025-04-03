"""
WSGI Configuration

Serves as the Web Server Gateway Interface (WSGI) entry point for
production deployment. It configures the application to work with WSGI-compatible
web servers like Gunicorn, uWSGI, or Apache with mod_wsgi.

Key Functions:
1. Load Django settings and environment variables
2. Initialize the WSGI application
3. Configure logging and error handling
4. Set up static file serving (in production)

Deployment:
    In production, this file is used by the WSGI server to:
    - Handle HTTP requests
    - Manage application lifecycle
    - Process static files
    - Handle errors and logging

Configuration:
    The WSGI application is configured through Django settings and
    environment variables. Key settings include:
    - DJANGO_SETTINGS_MODULE
    - STATIC_ROOT
    - MEDIA_ROOT
    - Logging configuration

Related:
    settings.py: Django project settings
    urls.py: URL routing configuration
    asgi.py: Asynchronous server configuration
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_wsgi_application()
