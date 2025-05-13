from django.contrib import admin
from .models import Student, ClassPeriod, Attendance, Announcement

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'grade', 'teacher')
    list_filter = ('grade', 'teacher')
    search_fields = ('name', 'hcpss_email', 'account_email')
    raw_id_fields = ('user', 'teacher')

@admin.register(ClassPeriod)
class ClassPeriodAdmin(admin.ModelAdmin):
    list_display = ('name', 'teacher', 'room_number', 'current_enrollment', 'capacity')
    list_filter = ('teacher',)
    search_fields = ('name', 'room_number', 'teacher__email')

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'class_period', 'date', 'status', 'updated_by')
    list_filter = ('status', 'date', 'class_period')
    search_fields = ('student__name', 'notes')
    raw_id_fields = ('student', 'class_period', 'updated_by')
    date_hierarchy = 'date'
    ordering = ('student__name',)

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'teacher', 'timestamp')
    list_filter = ('teacher', 'timestamp')
    search_fields = ('title', 'body')
    ordering = ('-timestamp',)
