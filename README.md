# HR Leave Management System

A complete, production-ready HR Leave Management System built with React, Vite, and TailwindCSS. This system implements a comprehensive leave request workflow with role-based access for employees, HR personnel, and managers.

## Features

### Core Functionality
- **Employee Dashboard**: View leave balances and submit leave requests
- **HR Dashboard**: Review and initially approve leave requests based on balance verification
- **Manager Review**: Final approval/rejection of HR-approved requests
- **Auto-Urgent Detection**: Automatically marks requests as urgent if submitted less than 24 hours before start date
- **Status Tracking**: Complete workflow from pending → initial_approved → approved/refused

### Business Rules
1. **24-Hour Urgent Rule**: Requests starting within 24 hours are automatically marked as urgent
2. **Three-Stage Approval**:
   - Employee submits → Status: `pending`
   - HR verifies balance and approves → Status: `initial_approved`
   - Manager makes final decision → Status: `approved` or `refused`
3. **Leave Balance Tracking**: Separate tracking for normal and urgent leave days

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom design system
- **Routing**: React Router v6
- **State Management**: React Context API
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **API Client**: Fetch API with custom wrapper
- **Form Validation**: Custom validators
- **Notifications**: Sonner (toast notifications)

## Project Structure

```
src/
├── components/
│   ├── layout/          # AppLayout, Header, Sidebar
│   ├── ui/              # Reusable UI components (Button, Input, Card, Badge, etc.)
│   ├── BalanceOverview.tsx
│   └── LeaveCard.tsx
├── context/
│   ├── AuthContext.tsx
│   └── LeavesContext.tsx
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── LeaveRequest.tsx
│   ├── HRDashboard.tsx
│   ├── ManagerReview.tsx
│   ├── EmployeeProfile.tsx
│   └── NotFound.tsx
├── services/
│   ├── authService.ts
│   ├── leavesService.ts
│   └── employeesService.ts
├── utils/
│   ├── apiClient.ts
│   ├── constants.ts
│   ├── dateHelpers.ts
│   └── validators.ts
├── mocks/
│   └── fixtures.json     # Mock data for development
└── styles/
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm/bun

### Install Dependencies
```bash
npm install
```

### Environment Configuration
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Configure your API endpoint:
```env
VITE_API_BASE=http://localhost:3000/api
```

### Development Mode
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## API Integration

The application is designed to integrate with a REST API. All API calls are centralized in the service layer.

### API Endpoints Expected

#### Authentication
- `POST /api/auth/login` - User login
  ```json
  Request: { "email": "string", "password": "string" }
  Response: { "token": "string", "user": { "id": "string", "name": "string", "email": "string", "role": "string" } }
  ```

#### Leaves
- `GET /api/leaves?employeeId={id}` - Get leave requests (optional employee filter)
- `POST /api/leaves` - Create new leave request
- `PUT /api/leaves/{id}` - Update leave status

#### Employees
- `GET /api/employees/{id}` - Get employee details
- `GET /api/employees/{id}/balance` - Get leave balance

### Switching Between Mock and Real API

**Development with Mock Data:**
The application includes mock data in `src/mocks/fixtures.json`. To use mock data, you can:
1. Use a service worker (MSW) setup (not included but recommended)
2. Or temporarily modify services to return mock data
3. Or run a local mock API server

**Production with Real API:**
1. Set `VITE_API_BASE` in your `.env` file to your production API URL
2. Ensure your API implements the expected endpoints
3. The `apiClient` will automatically handle authentication tokens

### API Client Features
- Automatic Bearer token injection
- Centralized error handling
- Request/Response interceptors
- TypeScript types for all responses

## User Roles & Access

### Employee (employee)
- View personal dashboard
- Check leave balance
- Submit leave requests
- View own request history

### HR (hr)
- All employee permissions
- View all leave requests
- Perform initial approval after balance verification
- Access HR dashboard

### Manager (manager)
- All employee permissions
- Review HR-approved requests
- Final approval/rejection authority
- Access manager review page

## Demo Credentials

For development/testing (when using mock data):

```
Employee:
Email: john@company.com
Password: password

HR Manager:
Email: jane@company.com
Password: password

Manager:
Email: bob@company.com
Password: password
```

## Key Components

### Context Providers
- **AuthContext**: Manages authentication state, login/logout
- **LeavesContext**: Manages leave requests state and operations

### Custom Hooks
- **useAuth**: Access authentication context
- **useLeaves**: Access leaves context and operations

### Service Layer
All API interactions are abstracted through services:
- **authService**: Authentication operations
- **leavesService**: Leave request CRUD with business logic
- **employeesService**: Employee data operations

### Utility Functions
- **apiClient**: Centralized API communication
- **dateHelpers**: Date formatting and calculations
- **validators**: Input validation functions
- **constants**: Application-wide constants

## Business Logic Implementation

### 24-Hour Urgent Rule
Implemented in `leavesService.createLeaveRequest()`:
```typescript
const isUrgent = isUrgentLeave(data.startDate, createdAt);
const requestData = {
  ...data,
  type: isUrgent ? 'urgent' : data.type,
  urgentAuto: isUrgent,
  // ...
};
```

### Status Workflow
```
Employee submits → PENDING
↓
HR approves (balance check) → INITIAL_APPROVED
↓
Manager reviews:
  → Accept: APPROVED (balance deducted)
  → Refuse: REFUSED
```

## Styling & Theming

The application uses a custom design system built on TailwindCSS with HSL color variables for easy theming:

### Design Tokens (src/index.css)
- Primary colors: Professional blue palette
- Status colors: Success (green), Warning (amber), Destructive (red)
- Semantic tokens: background, foreground, muted, accent
- Dark mode support included

### Customization
Modify design tokens in `src/index.css`:
```css
:root {
  --primary: 211 85% 45%;
  --success: 142 70% 45%;
  --warning: 38 92% 50%;
  /* ... */
}
```

## Contributing

1. Follow the existing code structure
2. Use TypeScript types for all new code
3. Maintain the design system - use semantic tokens
4. Add validation for all user inputs
5. Update tests for new features

## License

This project is part of a demonstration system. Modify and use as needed for your organization.

## Support

For issues or questions about setup and integration, refer to the inline code documentation or create an issue in the repository.
