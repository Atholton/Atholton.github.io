"""
Django Management Command for Authentication Monitoring

Provides real-time monitoring of authentication events through
a colorized command-line interface. It reads from the auth.log file and
displays both historical and live authentication attempts

Colors:
- Green: Successful verifications
- Yellow: Warnings (unrecognized emails)
- Red: Errors and critical events
- White: Other information

Usage:
    # Show last 10 entries and monitor
    python manage.py monitor_auth

    # Show last 50 entries
    python manage.py monitor_auth --tail 50
"""

import os
import time
from django.core.management.base import BaseCommand
from django.conf import settings
from datetime import datetime, timedelta
from colorama import init, Fore, Style

init()  # Initialize colorama

class Command(BaseCommand):
    help = 'Monitor authentication logs in real-time'

    def add_arguments(self, parser):
        parser.add_argument(
            '--tail',
            type=int,
            default=10,
            help='Number of recent log lines to show'
        )

    def handle(self, *args, **options):
        log_file = os.path.join(settings.BASE_DIR, 'logs', 'auth.log')
        
        if not os.path.exists(log_file):
            self.stdout.write(self.style.ERROR(f'Log file not found: {log_file}'))
            return

        # Show recent logs first
        self.show_recent_logs(log_file, options['tail'])
        
        # Then start monitoring
        self.stdout.write(self.style.SUCCESS('\nMonitoring for new auth events... (Ctrl+C to stop)\n'))
        
        try:
            with open(log_file, 'r') as f:
                # Move to end of file
                f.seek(0, 2)
                
                while True:
                    line = f.readline()
                    if line:
                        self.colorize_and_print(line.strip())
                    else:
                        time.sleep(0.1)
        except KeyboardInterrupt:
            self.stdout.write('\nStopped monitoring.')

    def show_recent_logs(self, log_file, num_lines):
        self.stdout.write(self.style.SUCCESS(f'\nShowing last {num_lines} log entries:\n'))
        
        try:
            with open(log_file, 'r') as f:
                lines = f.readlines()
                for line in lines[-num_lines:]:
                    self.colorize_and_print(line.strip())
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error reading log file: {e}'))

    def colorize_and_print(self, line):
        if 'ERROR' in line or 'CRITICAL' in line:
            color = Fore.RED
        elif 'WARNING' in line:
            color = Fore.YELLOW
        elif 'SUCCESS' in line or 'INFO' in line:
            color = Fore.GREEN
        else:
            color = Fore.WHITE
            
        self.stdout.write(f'{color}{line}{Style.RESET_ALL}')
