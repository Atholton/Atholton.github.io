# Atholton Raider Time Management Website

A web application for managing raider time sessions at Atholton High School, built with Next.js and Django.
The website for managing raider time sessions at Atholton High School, built with Next.js for its access to shadcn and built in backend functionality and Django for backend

## Project Setup

### Prerequisites
- Node.js (for frontend)
    - Download Node.js: https://nodejs.org/en/download
- Python 3.8+ (for backend)
- PostgreSQL 17+
    - Download PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

** Make sure to git pull origin main periodically or else when you try to push your feature it'll get really messed up because if your local repo is too far behind it'll give you errors

## Frontend Setup

### Initial Setup
1. Make sure node.js is installed:
```bash
node -v  # Check Node.js version
npm -v   # Check npm version
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start localhost:
```bash
cd frontend
npm run dev
```
### Pages
- '/" - home login
- '/login/student' - student login
- '/login/teacher' - teacher login
- '/student' - student dashboard
- '/teacher' - teacher dashboard
- '/student/all' - student all page
- '/teacher/all' - teacher all page


## Backend Setup

### PostgreSQL Installation
1. Download PostgreSQL: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
2. During installation:
   - Set a secure password for postgres user
   - Keep default port (5432)
   - Install all components when prompted

### Stack Builder Components
Install these additional components via Stack Builder:
1. psqlODBC (64 bit) - Database driver
2. pgAgent - For automated backups
3. pgBouncer - Connection pooling

### Testing

#### Running Tests

1. **Authentication System Tests**:
```bash
# Run all authentication tests
python manage.py test backend.tests.test_authentication

# Run with verbose output
python manage.py test backend.tests.test_authentication -v 2
```

2. **User Model Tests**:
```bash
# Run all accounts app tests
python manage.py test accounts

# Run specific model tests
python manage.py test accounts.tests.test_models

# Run a specific test class
python manage.py test accounts.tests.test_models.UserModelTests

# Run a specific test method
python manage.py test accounts.tests.test_models.UserModelTests.test_create_valid_student
```

3. **Test Coverage**:
```bash
# Run tests with coverage report
coverage run manage.py test
coverage report

# Generate HTML coverage report
coverage html
# View report in browser at htmlcov/index.html
```

### Environment Setup
1. Create a `.env` file in project root with required settings (see `.env.example`)
2. Never commit `.env` file to git (always add in .gitignore, if it's already there then don't change it pls)
3. Generate a new Django secret key:
```python
# Run this in terminal to generate secure access key:
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Database Setup
1. Open pgAdmin 4
2. Create new database named 'atholton_test'
3. Run migrations:
```bash
cd backend
python manage.py migrate
```

### Virtual Environment
```bash
python -m venv venv              # Create virtual environment
venv\Scripts\activate            # Activate (Windows) 
venv/bin/activate                # Activate (Mac)
pip install -r requirements.txt  # Install dependencies
```

### Django Commands
```bash
# Development
python manage.py runserver          # Start development server
python manage.py createsuperuser    # Create admin user
python manage.py makemigrations     # Create database migrations
python manage.py migrate           # Apply migrations

# Testing
python manage.py test              # Run all tests
python manage.py test backend.tests.test_env  # Run environment tests

# Authentication Tests
python manage.py test backend.tests.test_authentication  # Run auth flow tests
python manage.py test accounts.tests.test_models        # Run user model tests

# Run with coverage
coverage run manage.py test
coverage report
coverage html  # Creates HTML report in htmlcov/

# Static Files
python manage.py collectstatic     # Collect static files
```

## Project Structure

### Frontend (/frontend)
- `/pages` - Next.js pages and routing
- `/components` - Reusable React components
- `/styles` - CSS and styling
- `/public` - Static assets

### Backend (/backend)
- `/accounts` - User authentication and profiles
- `/attendance` - Attendance tracking system
- `/backend` - Main Django configuration
- `/tests` - Test cases and stuff

## Development Workflow
1. Start PostgreSQL service
2. Start Django backend:
```bash
cd backend
python manage.py runserver
```

4. Access:
   - Frontend: http://localhost:3000
   - Admin panel: http://localhost:8000/admin
   - API: http://localhost:8000/api/

## Roadmap

### Phase 1: Core Models 
- [x] Create RaiderTimeSession model
- [x] Create Attendance tracking model
- [x] Create Room management model
- [x] Add model relationships
- [x] Write model tests

### Phase 2: Authentication (In Progress)
- [x] Implement Google OAuth2 integration
- [x] Set up domain restriction (@inst.hcpss.org)
- [x] Create login UI with Google Sign-In
- [x] Complete backend account verification
- [x] Add authentication logging system
- [x] Set up role-based routing
- [x] Add authentication tests

### Phase 3: Teacher Features
- [x] Session management UI
- [ ] Student registration view
- [ ] Attendance taking interface
- [ ] Reporting dashboard
- [x] Room assignment system

### Phase 4: Student Features
- [ ] Session browsing interface
- [ ] Registration system
- [ ] Schedule viewer
- [ ] Attendance history
- [ ] Room location information

### Phase 6: Optimization
- [x (sort of)] Performance testing
- [ ] Mobile responsiveness
- [ ] Accessibility improvements
- [ ] Documentation updates

## Testing
```bash
# Backend
cd backend
python manage.py test
```

## Security Notes
- Keep `.env` file secure and never commit it PLEASE DONT
- Use environment variables for sensitive data
- Regular security audits (npm audit)
- Keep dependencies updated:
```bash
# Update frontend dependencies
npm update        # Update packages within allowed ranges
npm outdated      # Check for outdated packages
npm audit fix     # Fix security vulnerabilities

# Update backend dependencies
pip list --outdated              # Check for outdated packages
pip install --upgrade -r requirements.txt  # Update all packages
```

## How it works

### The custom user model
- Created a custom User model that extends Django's AbstractUser
- Added role-based authentication with three roles:
  - ADMIN: School administrators
  - TEACHER: Teachers who manage raider times
  - STUDENT: Students who attend raider times
- Added school-specific fields for user profiles

### The attendance system
- Implemented a raider time attendance system
- Added functionality to track attendance for each raider time session
- Added functionality to view attendance for each raider time session

### Database Configuration
- Set up PostgreSQL as the database backend
- Database name: atholton_test
- Configured for:
  - Up to 2000 users (scalable)
  - Secure connections
  - Connection pooling via pgBouncer

### Testing Framework
- Environment variable tests:
  - Secret key length verification
  - Database connection testing
  - Security settings validation
- Test database configuration:
  - Automatic test database creation
  - Isolation from production data

### Authentication System

#### Overview
- Google OAuth2 integration with NextAuth.js in frontend
- Domain restriction to @inst.hcpss.org emails (disabled in development)
- Now manually adding in personal emails for testing
- JWT-based session management with 30-day persistence
- Role-based access control (teacher/student)
- Test user system for development

#### Role-Based Access
The system supports two primary user roles:
- **Teacher**: Full access to teacher dashboard and session management
- **Student**: Access to student dashboard and session registration

##### Development Testing
For development, roles are assigned based on email in `route.ts`:
```typescript
const TEST_USER_ROLES = {
  'teacher@example.com': 'teacher',
  'student@example.com': 'student'
};
```

##### Production Setup
- Domain is restricted to `@inst.hcpss.org` and `@hcpss.org`
- Roles are verified against the school's database
- OAuth app should be created within HCPSS Google Workspace

### Authentication Flow

#### Step-by-Step Process
1. **User Initiates Sign-In**
   - User clicks "Sign in with Google" button
   - Frontend calls `signIn('google')` from NextAuth.js
   - Redirects to Google's consent screen

2. **Google OAuth Authentication**
   - User authenticates with Google
   - Google sends OAuth code to our callback URL
   - NextAuth exchanges code for access/refresh tokens

3. **Role Assignment**
   - System checks user's email domain
   - Development: Assigns role based on test user list
   - Production: Verifies against school database
   - Sets user role (teacher/student)

4. **Token Generation**
   - Creates JWT with user info and role
   - Encrypts token and stores in HTTP-only cookie
   - Sets up 30-day session persistence

5. **Session Creation**
   - Creates session from JWT data
   - Makes session available via `useSession()`
   - Handles automatic token refresh

6. **Route Protection**
   - Protected routes check session status
   - Verify user role for access control
   - Redirect unauthorized users

#### Security Measures
- Domain restriction to `@inst.hcpss.org` (not anymore be)
- CORS and CSRF protection
- Rate limiting on auth endpoints
- Secure cookie handling
- Automatic token refresh

### OAuth Setup and Configuration

#### Development Environment
1. Create a `.env.local` file in your frontend directory:
```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret  # Generate this using the command below
```

2. Generate your NEXTAUTH_SECRET:
```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

3. Development Credentials:
   - **Team Members**: Message Tiffany for the development OAuth credentials
   - Development mode allows any Google account for testing
   - Test users can be added to `TEST_USER_ROLES` for role assignment

4. Security Rules:
   - Store credentials ONLY in `.env.local`
   - Never commit credentials to git
   - Don't share credentials outside the team
   - Each developer should have their own NEXTAUTH_SECRET

#### Production Setup
1. Create OAuth app in HCPSS Google Workspace:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create project under HCPSS organization
   - Enable Google OAuth2 API
   - Configure OAuth consent screen:
     - Internal user type
     - Restricted to HCPSS domain
     - Required scopes: `openid`, `email`, `profile`

2. Configure OAuth Client:
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://your-production-url/api/auth/callback/google`
   - Add authorized JavaScript origins

3. Production Environment Variables:
   - Set up secure environment variable storage
   - Enable domain verification
   - Configure role verification with school database
1. **Initial Setup**:
   ```typescript
   GoogleProvider({
     clientId: process.env.CLIENT_ID!,
     clientSecret: process.env.CLIENT_SECRET!,
   })
   ```
   - Configured in `/app/api/auth/[...nextauth]/route.ts`
   - Uses environment variables for credentials
   - Handles OAuth2 protocol automatically

2. **Authentication Flow**:
   - User clicks "Sign in with Google"
   - Redirects to Google consent screen
   - Google returns auth code
   - NextAuth exchanges code for tokens
   - Verifies @inst.hcpss.org domain

3. **Token Management**:
   ```typescript
   async jwt({ token, account }) {
     if (account) {
       token.userRole = "pending";
     }
     return token;
   }
   ```
   - Creates JWT with custom claims
   - Stores user role information
   - Manages token refresh
   - 30-day session persistence

4. **Session Handling**:
   ```typescript
   async session({ session, token }) {
     session.user.role = token.userRole;
     return session;
   }
   ```
   - Syncs JWT data with session
   - Provides role-based access
   - Maintains user context
   - Handles session expiry

5. **Security Features**:
   - Domain verification
   - CSRF protection
   - Secure cookie storage
   - HTTP-only cookies
   - Automatic token rotation

### Backend Integration
- Django OAuth Toolkit for token validation
- Custom middleware for JWT verification
- Role-based permission system
- Session synchronization with frontend
- Secure token storage in PostgreSQL


#### Backend Authentication Monitoring

1. **View Authentication Logs**:
```bash
# Monitor auth events in real-time (last 10 entries)
python manage.py monitor_auth

# Show more historical entries
python manage.py monitor_auth --tail 50

# View raw log files
cat logs/auth.log     # All auth events
cat logs/error.log    # Error events only

# Follow new log entries in real-time
tail -f logs/auth.log
```

2. **Search Authentication Events**:
```bash
# Find failed login attempts
grep "WARNING" logs/auth.log

# Search by email
grep "email@inst.hcpss.org" logs/auth.log

# Search by IP address
grep "ip_address: 192.168.1.1" logs/auth.log
```

3. **Log Information Captured**:
- IP address of login attempt
- User agent (browser/device info)
- Timestamp of attempt
- Email address used
- Success/failure status
- User details (if found)
- Failed attempt counts