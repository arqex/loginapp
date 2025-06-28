import React from "react";
import { ApiError } from "@loginapp/api-client";

interface PermissionErrorContextValue {
  handleApiError: (error: unknown) => void;
}

const PermissionErrorContext =
  React.createContext<PermissionErrorContextValue | null>(null);

export const usePermissionErrorHandler = () => {
  const context = React.useContext(PermissionErrorContext);
  if (!context) {
    throw new Error(
      "usePermissionErrorHandler must be used within a PermissionErrorProvider"
    );
  }
  return context;
};

interface PermissionErrorProviderProps {
  children: React.ReactNode;
  onPermissionError: () => void;
}

export const PermissionErrorProvider: React.FC<
  PermissionErrorProviderProps
> = ({ children, onPermissionError }) => {
  const handleApiError = React.useCallback(
    (error: unknown) => {
      if (error instanceof ApiError && error.response?.status === 403) {
        const method = error.request?.method?.toLowerCase();
        if (method === "post" || method === "patch" || method === "delete") {
          console.log("Permission error detected:", error);
          onPermissionError();
          return; // Error was handled
        }
      }
      // If it's not a 403 error or not a mutation operation, re-throw it
      throw error;
    },
    [onPermissionError]
  );

  const value = React.useMemo(
    () => ({
      handleApiError,
    }),
    [handleApiError]
  );

  return (
    <PermissionErrorContext.Provider value={value}>
      {children}
    </PermissionErrorContext.Provider>
  );
};
