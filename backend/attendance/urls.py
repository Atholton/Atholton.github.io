from django.urls import path
from .views import StudentViewSet, AnnouncementViewSet
from rest_framework.routers import DefaultRouter

app_name = 'attendance'

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'announcements', AnnouncementViewSet, basename='announcement')

urlpatterns = router.urls + [
    path('students/by-email/<str:email>/', StudentViewSet.as_view({'get': 'by_email'}), name='student-by-email'),
]
