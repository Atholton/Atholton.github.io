"""
Django Logging Configuration

Configures Django's logging system for authentication monitoring
Sets up two main log files:
1. auth.log: Authentication-related events (login attempts, verifications)
2. error.log: System-wide errors and warnings

Log Format:
- Authentication logs include: timestamp, level, message, IP, email, user agent
- Error logs include: level, timestamp, module, process ID, thread ID, message

Usage:
    from .logging_config import LOGGING
    # Add to Django settings
    LOGGING = LOGGING
"""

import os
from datetime import datetime  

# Base directory for all logs
LOG_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')
os.makedirs(LOG_DIR, exist_ok=True)

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'auth': {
            'format': '[{asctime}] {levelname} {message} - IP: {ip_address} Email: {email}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'auth_file': {
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOG_DIR, 'auth.log'),
            'formatter': 'auth',
        },
        'error_file': {
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOG_DIR, 'error.log'),
            'formatter': 'verbose',
            'level': 'ERROR',
        },
    },
    'loggers': {
        'auth': {
            'handlers': ['console', 'auth_file'],
            'level': 'INFO',
            'propagate': False,
        },
        'django': {
            'handlers': ['console', 'error_file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
