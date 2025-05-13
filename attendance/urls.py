from django.urls import path
from . import views

app_name = 'attendance'

urlpatterns = [
    # API endpoints
    path('students/', views.student_list, name='student_list_api'),
    path('students/<int:student_id>/', views.student_detail, name='student_detail_api'),
    path('students/by-email/<str:email>/', views.student_by_email, name='student_by_email_api'),
    path('announcements/', views.announcement_list, name='announcement_list_api'),
    path('class-periods/', views.class_period_list, name='class_period_list_api'),
    path('class-periods/<int:class_id>/', views.class_period_detail, name='class_period_detail_api'),
]
