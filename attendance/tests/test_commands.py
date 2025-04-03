from django.test import TestCase
from django.core.management import call_command
from django.core.management.base import CommandError
from io import StringIO
import os
from attendance.models import Student

class ImportLegacyDataTest(TestCase):
    def setUp(self):
        # Create a test SQL file
        self.test_sql = 'test_data.sql'
        with open(self.test_sql, 'w') as f:
            f.write("""
            INSERT INTO `students` (`ID`, `name`, `grade`, `hcpssEmail`, `accountEmail`, 
                                 `password`, `phoneNum`, `receiveNotif`, `teacherID`, 
                                 `teacherPeriod2`, `theme`, `tempTeacher`) 
            VALUES (1, 'Test Student', 9, 'test@inst.hcpss.org', '', '', '', 0, 87, 0, '', 'Test, T.');
            """)

    def tearDown(self):
        # Clean up test file
        if os.path.exists(self.test_sql):
            os.remove(self.test_sql)

    def test_import_students(self):
        """Test importing student data"""
        # Call the command
        out = StringIO()
        call_command('import_legacy_data', self.test_sql, stdout=out)

        # Check that the student was created
        student = Student.objects.first()
        self.assertIsNotNone(student)
        self.assertEqual(student.name, 'Test Student')
        self.assertEqual(student.grade, 9)
        self.assertEqual(student.hcpss_email, 'test@inst.hcpss.org')
        self.assertEqual(student.temp_teacher, 'Test, T.')

    def test_file_not_found(self):
        """Test handling of non-existent file"""
        out = StringIO()
        call_command('import_legacy_data', 'nonexistent.sql', stderr=out)
        self.assertIn('File not found', out.getvalue())
