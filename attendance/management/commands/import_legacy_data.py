import os
import re
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from attendance.models import Student, Announcement, Notification

User = get_user_model()

class Command(BaseCommand):
    help = 'Import legacy data from SQL file'

    def add_arguments(self, parser):
        parser.add_argument('sql_file', type=str, help='Path to SQL file')

    def handle(self, *args, **options):
        sql_file = options['sql_file']
        if not os.path.exists(sql_file):
            self.stderr.write(f"File not found: {sql_file}")
            return

        with open(sql_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Process students
        student_pattern = r"INSERT INTO `students` \((.*?)\) VALUES\s*\((.*?)\)"
        student_matches = re.finditer(student_pattern, content, re.DOTALL)

        for match in student_matches:
            columns = [col.strip('`') for col in match.group(1).split(',')]
            values = self._parse_values(match.group(2))
            
            # Create dictionary of column-value pairs
            data = dict(zip(columns, values))
            
            # Create or update student
            try:
                student = Student.objects.create(
                    name=data['name'],
                    grade=int(data['grade']),
                    hcpss_email=data['hcpssEmail'],
                    account_email=data['accountEmail'],
                    phone_num=data['phoneNum'],
                    receive_notif=bool(int(data['receiveNotif'])),
                    theme=data['theme'],
                    temp_teacher=data['tempTeacher']
                )
                self.stdout.write(f"Created student: {student.name}")
            except Exception as e:
                self.stderr.write(f"Error creating student: {e}")

    def _parse_values(self, values_str):
        """Parse values from SQL INSERT statement"""
        values = []
        current = ''
        in_quotes = False
        
        for char in values_str:
            if char == "'" and (not current or current[-1] != '\\'):
                in_quotes = not in_quotes
            elif char == ',' and not in_quotes:
                values.append(current.strip("' "))
                current = ''
            else:
                current += char
                
        if current:
            values.append(current.strip("' "))
            
        return values
