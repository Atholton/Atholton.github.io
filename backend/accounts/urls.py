from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('verify-token/', views.verify_google_token, name='verify-token'),
]
