# Permission Error Handling

This system provides global handling for API permission errors (403 status codes) that occur during mutation operations (POST, PATCH, DELETE) using global error handlers.

## How it works

1. **Global Error Handler**: A global permission error handler is set up in the Root component that displays a modal when permission errors occur.

2. **Window Error Handlers**: The system sets up global `error` and `unhandledrejection` event listeners on the window object to catch:
   - Uncaught exceptions (`window.addEventListener("error")`)
   - Unhandled promise rejections (`window.addEventListener("unhandledrejection")`)

3. **Error Detection**: When an error occurs, the global handler checks if the error is:
   - An `ApiError` instance
   - Has a 403 status code  
   - Comes from a mutation operation (POST, PATCH, DELETE)

4. **Automatic Modal**: When a permission error is detected, a modal automatically appears informing the user they don't have sufficient permissions.

## Usage in Components

### No wrapping needed!
Components can use API calls directly without any try-catch blocks or wrappers:

```typescript
const handleDeleteItem = async (itemId: string) => {
  await deleteTodoItem(getApiClient(), itemId);
  // Any 403 error will be automatically caught by the global handler
  // Success handling continues normally...
};
```

### Optional: Add try-catch for specific error handling
If you need to handle specific errors differently, you can still use try-catch:

```typescript
const handleDeleteItem = async (itemId: string) => {
  try {
    await deleteTodoItem(getApiClient(), itemId);
    // Success handling...
  } catch (error) {
    if (error instanceof ApiError && error.response?.status === 404) {
      // Handle not found specifically
      console.log("Item not found");
    }
    // Permission errors (403) are still handled globally
    throw error; // Re-throw so global handler can catch it
  }
};
```

## What gets handled

- ✅ 403 errors from POST requests (creating resources)
- ✅ 403 errors from PATCH requests (updating resources)  
- ✅ 403 errors from DELETE requests (deleting resources)
- ❌ 403 errors from GET requests (these are usually handled differently)
- ❌ Other HTTP error codes (401, 404, 500, etc.)

## Testing

To test the permission error handling:

1. Login as a contributor user: `contributor@example.com` (password: `Testapp0`)
2. Try to perform actions that require higher permissions:
   - Delete a todo item (requires EDITOR role)
   - Create a new todo list (requires ADMIN role)
3. The permission error modal should appear automatically
