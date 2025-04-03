from django.conf import settings
from django.test import TestCase

class EnvironmentVariablesTest(TestCase):
    def test_env_variables(self):
        """Test that critical environment variables are set correctly"""
        # Test Django settings
        self.assertTrue(len(settings.SECRET_KEY) > 50, "Secret key should be long enough")
        
        # Test Database settings
        db_settings = settings.DATABASES['default']
        self.assertTrue(db_settings['NAME'].endswith('atholton_test'), 
                       "Database name should end with atholton_test")
        self.assertEqual(db_settings['USER'], 'postgres', "Database user should match")
        self.assertEqual(db_settings['HOST'], 'localhost', "Database host should match")
        self.assertEqual(db_settings['PORT'], 5432, "Database port should match")
        
        # Test Security settings
        self.assertTrue(settings.SESSION_COOKIE_SECURE, "Session cookie should be secure")
        self.assertTrue(settings.CSRF_COOKIE_SECURE, "CSRF cookie should be secure")
        self.assertIn('http://localhost:3000', settings.CORS_ALLOWED_ORIGINS, 
                     "localhost:3000 should be in CORS origins")
        
        # Test Email backend - accept either console or locmem backend
        self.assertIn(settings.EMAIL_BACKEND, 
                     ['django.core.mail.backends.console.EmailBackend',
                      'django.core.mail.backends.locmem.EmailBackend'],
                     "Email backend should be console or locmem in development")
