from django.urls import path
from . import views

app_name = 'attendance'

urlpatterns = [
    # API endpoints
    path('api/students/', views.student_list, name='student_list_api'),
    path('api/students/<int:student_id>/', views.student_detail, name='student_detail_api'),
    path('api/announcements/', views.announcement_list, name='announcement_list_api'),
    path('api/class-periods/', views.class_period_list, name='class_period_list_api'),
    path('api/class-periods/<int:class_id>/', views.class_period_detail, name='class_period_detail_api'),
]
