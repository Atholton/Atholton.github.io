"""
URL configuration for the authentication endpoints

Defines the URL patterns for the authentication API endpoints
All URLs are prefixed with 'api/accounts/' from the main URLs configuration

Available endpoints:
- POST /api/accounts/verify/: Verify user email and return role
"""

from django.urls import path
from . import views

urlpatterns = [
    path('verify/', views.verify_user, name='verify_user'),
]
