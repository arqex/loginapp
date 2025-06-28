import React from "react";
import { Modal, VStack, Heading, Text, Button } from "@loginapp/ui";
import { getAuthContext } from "../../application/auth/auth.context";

interface PermissionErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default class PermissionErrorModal extends React.Component<PermissionErrorModalProps> {
  render() {
    const { isOpen, onClose } = this.props;
    const authContext = getAuthContext();
    const userRole = authContext?.role || "Unknown";

    return (
      <Modal open={isOpen} onClose={onClose}>
        <VStack gap="4" padding="6">
          <Heading size="sm">Permission Denied</Heading>
          <Text fontSize="sm" color="lighter">
            You don't have sufficient permissions to perform this action. Your
            current role is <strong>{userRole}</strong>. Please contact an
            administrator if you need additional access.
          </Text>
          <Button onClick={onClose} variant="outline" size="sm">
            Close
          </Button>
        </VStack>
      </Modal>
    );
  }
}
