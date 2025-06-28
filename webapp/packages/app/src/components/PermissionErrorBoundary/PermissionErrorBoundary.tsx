import React from "react";
import { ApiError } from "@loginapp/api-client";
import PermissionErrorModal from "../PermissionErrorModal/PermissionErrorModal";

interface PermissionErrorBoundaryProps {
  children: React.ReactNode;
}

interface PermissionErrorBoundaryState {
  hasError: boolean;
  showPermissionModal: boolean;
}

export default class PermissionErrorBoundary extends React.Component<
  PermissionErrorBoundaryProps,
  PermissionErrorBoundaryState
> {
  constructor(props: PermissionErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      showPermissionModal: false,
    };
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<PermissionErrorBoundaryState> {
    // Check if this is a permission error from a mutation operation
    if (error instanceof ApiError && error.response?.status === 403) {
      const method = error.request?.method?.toLowerCase();
      if (method === "post" || method === "patch" || method === "delete") {
        return {
          hasError: true,
          showPermissionModal: true,
        };
      }
    }

    // For other errors, don't handle them here
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error for debugging
    if (error instanceof ApiError && error.response?.status === 403) {
      const method = error.request?.method?.toLowerCase();
      if (method === "post" || method === "patch" || method === "delete") {
        console.log("Permission error caught:", error);
        console.log("Error info:", errorInfo);
      }
    }
  }

  handleClosePermissionModal = () => {
    this.setState({
      hasError: false,
      showPermissionModal: false,
    });
  };

  render() {
    if (this.state.hasError && this.state.showPermissionModal) {
      return (
        <>
          {this.props.children}
          <PermissionErrorModal
            isOpen={this.state.showPermissionModal}
            onClose={this.handleClosePermissionModal}
          />
        </>
      );
    }

    return this.props.children;
  }
}
