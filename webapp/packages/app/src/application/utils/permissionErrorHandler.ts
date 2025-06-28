import { ApiError } from "@loginapp/api-client";

// Global permission error handler
let globalPermissionErrorHandler: (() => void) | null = null;

export function setGlobalPermissionErrorHandler(handler: () => void) {
  globalPermissionErrorHandler = handler;
}

function handlePermissionError(error: unknown): boolean {
  if (error instanceof ApiError && error.response?.status === 403) {
    const method = error.request?.method?.toLowerCase();
    if (method === "post" || method === "patch" || method === "delete") {
      console.log("Permission error detected:", error);
      if (globalPermissionErrorHandler) {
        globalPermissionErrorHandler();
        return true; // Error was handled
      }
    }
  }
  return false; // Error was not handled
}

export function setupGlobalErrorHandlers() {
  // Handle uncaught exceptions
  window.addEventListener("error", (event) => {
    const handled = handlePermissionError(event.error);
    if (handled) {
      event.preventDefault(); // Prevent the error from being logged to console
    }
  });

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    const handled = handlePermissionError(event.reason);
    if (handled) {
      event.preventDefault(); // Prevent the error from being logged to console
    }
  });
}

export function removeGlobalErrorHandlers() {
  // Note: We can't easily remove the exact listeners we added since they're anonymous functions
  // This is mainly for cleanup purposes if needed
  globalPermissionErrorHandler = null;
}
