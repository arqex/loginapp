# Permissions Middleware

This middleware provides role-based access control for endpoints based on user roles in accounts.

## Overview

The middleware checks if an authenticated user has sufficient permissions (role) for a specific account before allowing access to protected endpoints.

### Role Hierarchy
- **ADMIN**: Full access (can create, edit, delete TodoLists and TodoItems)
- **EDITOR**: Can create and edit TodoItems in existing TodoLists
- **COLLABORATOR**: Can only mark TodoItems as Done/Undone

## Usage

### Basic Usage

For endpoints where the account ID is directly in the request parameters:

```typescript
import { Router } from 'express';
import { requireAdmin, requireEditor, requireCollaborator } from '../utils/permissions.utils';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';

const router = Router();

// Requires ADMIN role for the account
router.post('/accounts/:accountId/todolists', 
  withJWTAuth, 
  requireAdmin(), 
  createTodoListController
);

// Requires EDITOR role for the account  
router.patch('/accounts/:accountId/todolists/:id', 
  withJWTAuth, 
  requireEditor(), 
  updateTodoListController
);

// Requires COLLABORATOR role for the account
router.get('/accounts/:accountId/todolists', 
  withJWTAuth, 
  requireCollaborator(), 
  getTodoListsController
);
```

### Custom Account ID Parameter

If the account ID is in a different parameter:

```typescript
// Account ID is in 'id' parameter instead of 'accountId'
router.delete('/accounts/:id', 
  withJWTAuth, 
  requireAdmin('id'), 
  deleteAccountController
);
```

### Advanced Usage with Extractors

For complex scenarios where account ID needs to be extracted from related entities:

```typescript
import { requireRoleForTodoList, requireRoleForTodoItem } from '../utils/permissions.utils';

// Extract account ID from TodoList
router.patch('/todolists/:id', 
  withJWTAuth, 
  requireRoleForTodoList('EDITOR'), 
  updateTodoListController
);

// Extract account ID from TodoItem
router.patch('/todoitems/:id', 
  withJWTAuth, 
  requireRoleForTodoItem('COLLABORATOR'), 
  updateTodoItemController
);
```

### Custom Extractor Functions

For even more complex scenarios:

```typescript
import { requireRoleWithExtractor } from '../utils/permissions.utils';

// Custom extractor that gets account ID from request body
const extractAccountFromBody = (req) => req.body.accountId;

router.post('/custom-endpoint', 
  withJWTAuth, 
  requireRoleWithExtractor('ADMIN', extractAccountFromBody), 
  customController
);
```

## Available in Controllers

After the middleware runs successfully, the following information is available in your controllers:

```typescript
export async function myController(req: AuthRequest, res: Response) {
  const userId = req.user.id;              // User ID
  const accountId = req.user.accountId;    // Account ID (added by middleware)
  const userRole = req.user.accountRole;   // User's role in the account (added by middleware)
  
  // Your controller logic here
}
```

## Error Responses

The middleware returns appropriate HTTP status codes:

- **401 Unauthorized**: User is not authenticated
- **400 Bad Request**: Account ID parameter is missing or invalid
- **403 Forbidden**: User doesn't have access to the account or insufficient role
- **500 Internal Server Error**: Database or other internal error

## Example Implementation

Here's a complete example of how to protect TodoList endpoints:

```typescript
// todoList.router.ts
import { Router } from 'express';
import { withJWTAuth } from '../auth/strategies/jwt.strategy';
import { 
  requireAdmin, 
  requireEditor, 
  requireCollaborator,
  requireRoleForTodoList 
} from '../utils/permissions.utils';
import * as controllers from './controllers';

const router = Router();

// Get TodoLists for an account - requires COLLABORATOR role
router.get('/accounts/:accountId/todolists', 
  withJWTAuth, 
  requireCollaborator(), 
  controllers.getTodoLists
);

// Create TodoList - requires ADMIN role
router.post('/accounts/:accountId/todolists', 
  withJWTAuth, 
  requireAdmin(), 
  controllers.createTodoList
);

// Get specific TodoList - requires COLLABORATOR role (account ID extracted from TodoList)
router.get('/todolists/:id', 
  withJWTAuth, 
  requireRoleForTodoList('COLLABORATOR'), 
  controllers.getTodoList
);

// Update TodoList - requires ADMIN role (account ID extracted from TodoList)
router.patch('/todolists/:id', 
  withJWTAuth, 
  requireRoleForTodoList('ADMIN'), 
  controllers.updateTodoList
);

// Delete TodoList - requires ADMIN role (account ID extracted from TodoList)
router.delete('/todolists/:id', 
  withJWTAuth, 
  requireRoleForTodoList('ADMIN'), 
  controllers.deleteTodoList
);

export default router;
```

## Notes

- Always use `withJWTAuth` middleware before permission middleware to ensure user authentication
- The middleware automatically adds `accountRole` and `accountId` to `req.user` for use in controllers
- Permission checks are performed against the database in real-time
- The middleware handles all error cases and returns appropriate HTTP status codes
