import csv
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from attendance.models import Student, ClassPeriod

User = get_user_model()

class Command(BaseCommand):
    help = 'Import second period class data from CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='Path to CSV file')

    def handle(self, *args, **options):
        csv_file = options['csv_file']
        
        try:
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                
                with transaction.atomic():
                    # First pass: Create teachers and class periods
                    for row in reader:
                        if not row['Teacher'] or row['Teacher'] == '':
                            continue
                            
                        teacher_name = row['Teacher'].strip('" ')
                        room = row['Room Number'].strip()
                        subject = row['Class/Subject Name'].strip('" ')
                        class_id = row['Class ID'].strip()
                        
                        # Skip if no room number (like Release Time or ARL)
                        if not room:
                            continue
                        
                        # Parse teacher name (format: "Last, First")
                        last_name, first_name = self._parse_teacher_name(teacher_name)
                        
                        # Create or get teacher
                        teacher, created = User.objects.get_or_create(
                            username=f"{first_name.lower()}.{last_name.lower()}",
                            defaults={
                                'first_name': first_name,
                                'last_name': last_name,
                                'email': f"{first_name.lower()}.{last_name.lower()}@example.com",
                                'role': 'TEACHER'
                            }
                        )
                        
                        # Create class period
                        class_period, created = ClassPeriod.objects.get_or_create(
                            teacher=teacher,
                            period='2',
                            defaults={
                                'room_number': room,
                                'subject': subject,
                                'capacity': 30  # Default capacity
                            }
                        )
                        
                        if created:
                            self.stdout.write(f"Created class period: {class_period}")
                            
                    # Second pass: Update student assignments
                    f.seek(0)  # Reset file pointer
                    next(reader)  # Skip header
                    
                    for row in reader:
                        if not row['Teacher'] or row['Teacher'] == '':
                            continue
                            
                        student_name = row['Last Name, First Time Middle I.'].strip('" ')
                        teacher_name = row['Teacher'].strip('" ')
                        grade = int(row['Grade'])
                        
                        # Skip if no teacher (like Release Time or ARL)
                        if not teacher_name:
                            continue
                        
                        # Parse teacher name
                        last_name, first_name = self._parse_teacher_name(teacher_name)
                        
                        try:
                            teacher = User.objects.get(
                                first_name=first_name,
                                last_name=last_name
                            )
                            
                            # Parse student name (format: "Last, First Middle")
                            student_last, rest = student_name.split(',', 1)
                            student_first = rest.split()[0]
                            
                            # Update or create student
                            student, created = Student.objects.get_or_create(
                                name=f"{student_first} {student_last}",
                                defaults={
                                    'grade': grade,
                                    'hcpss_email': f"{student_first.lower()}.{student_last.lower()}@inst.hcpss.org"
                                }
                            )
                            
                            # Update period 2 teacher
                            student.teacher_period2 = teacher
                            student.save()
                            
                            # Update class enrollment
                            class_period = ClassPeriod.objects.get(
                                teacher=teacher,
                                period='2'
                            )
                            class_period.current_enrollment += 1
                            class_period.save()
                            
                            self.stdout.write(f"Updated student: {student.name}")
                                
                        except User.DoesNotExist:
                            self.stderr.write(f"Teacher not found: {teacher_name}")
                            
        except FileNotFoundError:
            self.stderr.write(f"File not found: {csv_file}")
        except Exception as e:
            self.stderr.write(f"Error importing data: {e}")
            
    def _parse_teacher_name(self, teacher_name):
        """Parse teacher name in format 'Last, First'"""
        try:
            last_name, first_name = teacher_name.split(',', 1)
            return last_name.strip(), first_name.strip()
        except ValueError:
            return teacher_name, ''  # Default if can't parse
