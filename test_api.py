"""
test script for API

Validates the core functionality of the backend API endpoints by:
1. Authenticating with the server using session-based authentication
2. Testing protected endpoints for class periods, students, and announcements
3. Verifying proper CSRF token handling and session management

It uses the requests library to simulate a web browser session and
tests the following endpoints:
- /api/accounts/login/: Authentication endpoint
- /api/class-periods/: Class period management
- /api/students/: Student information
- /api/announcements/: School announcements

Usage:
    python test_api.py

Note:
    Requires a running Django server at http://localhost:8000 (make sure it's running) (i made this mistake)
    Uses teacher credentials for authentication
"""

import requests
import json
from requests.sessions import Session

BASE_URL = 'http://localhost:8000'

def test_api():
    """
    Test the backend API endpoints with proper authentication.
    
    Creates a session, handles CSRF tokens, and tests protected endpoints.
    Prints the results of each API call for verification.
    
    Returns:
        None. Results are printed to stdout.
    """
    # Create a session to handle cookies
    session = Session()
    
    # Get CSRF token first
    session.get(f'{BASE_URL}/api/accounts/login/')
    csrf_token = session.cookies.get('csrftoken')
    
    # Login with a teacher account
    login_data = {
        'username': 'j..moore',  # Using an existing teacher from our database
        'password': 'password123'  # This needs to be the correct password
    }
    headers = {
        'X-CSRFToken': csrf_token,
        'Content-Type': 'application/json'
    }
    response = session.post(
        f'{BASE_URL}/api/accounts/login/',
        json=login_data,
        headers=headers
    )
    
    if response.status_code == 200:
        print("Login successful!")
        
        # Update headers with new CSRF token
        csrf_token = session.cookies.get('csrftoken')
        headers = {
            'X-CSRFToken': csrf_token,
            'Content-Type': 'application/json'
        }
        
        # Test class periods endpoint
        print("\nTesting class periods endpoint:")
        response = session.get(f'{BASE_URL}/api/class-periods/', headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            
        # Test students endpoint
        print("\nTesting students endpoint:")
        response = session.get(f'{BASE_URL}/api/students/', headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
            
        # Test announcements endpoint
        print("\nTesting announcements endpoint:")
        response = session.get(f'{BASE_URL}/api/announcements/', headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(json.dumps(data, indent=2))
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
    else:
        print("Login failed:", response.status_code)
        print(response.text)

if __name__ == '__main__':
    test_api()
