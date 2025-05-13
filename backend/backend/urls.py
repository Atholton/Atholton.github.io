"""
URL Configurations

Defines the URL routing for the entire application, connecting URLs
to their corresponding views. It serves as the main routing configuration for:

1. API Endpoints:
   - /api/accounts/: Authentication endpoints
   - /api/students/: Student management
   - /api/class-periods/: Class period information
   - /api/announcements/: School announcements

2. Administrative Interface:
   - /admin/: Django admin site
   - Custom admin views

3. Static and Media Files:
   - Development server static file serving
   - Media file handling

URL Structure:
    The API follows RESTful conventions with nested resources where appropriate.
    All API endpoints are prefixed with /api/ to distinguish them from other URLs.
    Authentication is required for most endpoints except login/logout.

Security:
    - CSRF protection is enabled for all POST/PUT/DELETE requests
    - Session-based authentication is required for API access
    - Admin interface requires staff privileges

Related:
    views.py: View implementations
    settings.py: Project settings including URL configuration
    wsgi.py: Web server entry point
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/', include('attendance.urls')),
]