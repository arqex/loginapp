# Loginapp Webapp

This is the React web application for the LoginApp project, designed as a bootstrap foundation for building personalized applications with complete authentication infrastructure already implemented. The webapp provides a modern, responsive user interface with a comprehensive authentication system, user management, and a demo todo-list application to showcase the capabilities.

## Purpose

This webapp serves as a starting point for developers who need:
- Complete authentication system (login, signup, email verification, password reset)
- User account management with role-based permissions
- Modern React application structure with TypeScript
- Responsive design with component library
- Internationalization support
- API client integration

## Main Technologies

### Core Framework & Build Tools
- **React 19.1** - Modern React with latest features
- **TypeScript 5.8** - Type-safe development
- **Vite 6.3** - Fast build tool and development server
- **SWC** - Fast TypeScript/JSX compiler

### State Management & Routing
- **URLHub** - URL-based state management and routing
- Application state management is custom but simple, using the local package `@loginapp/api-client`

### Styling & UI
- **CSS Modules**

### Internationalization
- **i18next** - Complete internationalization framework
- **react-i18next** - React integration for i18n

### Development & Testing
- **ESLint** - Code linting with React-specific rules
- **Vitest** - Fast unit testing framework

## Folder Structure

The webapp follows a monorepo structure with three main packages:

```
webapp/
├── packages/
│   ├── app/           # Main React application
│   ├── api-client/    # HTTP client for backend API
│   └── ui/            # Shared UI components library
├── public/
│   ├── i18n/         # Translation files
│   └── vite.svg      # Static assets
├── package.json      # Workspace configuration
└── vite.config.ts    # Build configuration
```

### Package Details

#### `packages/app/` - Main Application
Contains the core React application with:
- **src/application/** - Core application logic, stores, and utilities
- **src/screens/** - Page components and screen layouts
- **src/components/** - Reusable React components
- **src/assets/** - Images, icons, and static resources
- **Root.tsx** - Application root component
- **main.tsx** - Application entry point

#### `packages/api-client/` - API Integration
A custom HTTP client library that provides:
- Type-safe API calls to the backend
- Authentication token management
- Request/response interceptors
- Error handling utilities

#### `packages/ui/` - Component Library
Shared UI components that can be used across the application:
- Reusable React components
- Design system components
- Based on chakra-ui
- Form controls and layouts
- Component documentation with Styleguidist

## Demo Application - Todo Lists

The webapp includes a fully functional collaborative todo-list application that demonstrates:

### Features
- **TodoItems** - Individual tasks that can be marked as done/undone
- **TodoLists** - Collections of related todo items
- **Account-based organization** - Each account has its own todo lists

### User Roles & Permissions
- **CONTRIBUTORS** - Can read todo lists and mark items as done/undone
- **EDITORS** - Can create and edit todo items in existing lists
- **ADMINS** - Full access to create, delete, and edit todo lists and items

### Test Data
The application comes with pre-configured test accounts:
- **Simple Account** - `simple@example.com` (ADMIN role)
- **Collaboration Account** - Multiple users with different roles:
  - `admin@example.com` (ADMIN)
  - `editor@example.com` (EDITOR) 
  - `contributor@example.com` (CONTRIBUTOR)
- All test users have password: `Testapp0`

## Getting Started

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# or
npm start
```

### Building
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing
```bash
# Run tests
npm run test
```

## Documentation Links

For more detailed information about specific aspects of the system:

- **[Backend Documentation](../../backend/docs/introduction_backend.md)** - API structure, authentication, and database
- **[API Client Documentation](../api-client/readme.md)** - How data loading works in the webapp
- **[Test Application Guide](../../test-application.md)** - Detailed explanation of the todo-list demo
- **[Data Model](../../docs/data-model.md)** - Database schema and relationships

## Authentication Flow

The webapp implements a complete authentication system including:
- Email/password login and signup
- Email verification process
- Password reset functionality
- Persistent sessions with JWT tokens
- Automatic token refresh
- Protected route handling

## Customization

This webapp is designed to be easily customizable for your specific needs:
1. **Replace the demo todo application** with your business logic
2. **Customize the UI components** in the `packages/ui/` directory
3. **Modify the API client** to match your backend endpoints
4. **Update translations** in the `public/i18n/` directory
5. **Adjust the design system** by modifying CSS custom properties

The authentication infrastructure and core application structure remain unchanged, allowing you to focus on building your specific features.
