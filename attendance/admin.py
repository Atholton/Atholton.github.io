from django.contrib import admin
from .models import Student, Announcement, Notification

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('name', 'grade', 'hcpss_email', 'teacher', 'temp_teacher')
    
    # Fields to filter by in the sidebar
    list_filter = ('grade', 'teacher', 'receive_notif')
    
    # Fields to search through
    search_fields = ('name', 'hcpss_email', 'account_email')
    
    # Fields grouped in the detail view
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'grade', 'hcpss_email', 'account_email')
        }),
        ('Teacher Assignment', {
            'fields': ('teacher', 'teacher_period2', 'temp_teacher')
        }),
        ('Preferences', {
            'fields': ('receive_notif', 'theme', 'phone_num')
        }),
    )

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'teacher', 'timestamp')
    list_filter = ('teacher', 'timestamp')
    search_fields = ('title', 'body')
    date_hierarchy = 'timestamp'  # Adds date navigation
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'body')
        }),
        ('Metadata', {
            'fields': ('teacher',)
        }),
    )

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('truncated_message', 'timestamp')
    list_filter = ('timestamp',)
    search_fields = ('message',)
    date_hierarchy = 'timestamp'
    
    def truncated_message(self, obj):
        """Show first 50 characters of message in list view"""
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    truncated_message.short_description = 'Message'
