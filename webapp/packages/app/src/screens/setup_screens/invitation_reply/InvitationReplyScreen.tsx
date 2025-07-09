import React from "react";
import {
  Card,
  Heading,
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Link,
  toaster,
} from "@loginapp/ui";
import { getApiClient } from "../../../application/stores/apiClient";
import { getRouter } from "../../../application/routing/router";
import { replyToInvitationPublic, ApiError } from "@loginapp/api-client";
import UnauthenticatedLayout from "../../../components/UnauthenticatedLayout/UnauthenticatedLayout";
import { setAuthenticatedId } from "../../../application/auth/auth.context";

interface InvitationReplyScreenState {
  isProcessing: boolean;
  error: string | null;
  isValidLink: boolean;
}

export default class InvitationReplyScreen extends React.Component<
  void,
  InvitationReplyScreenState
> {
  state: InvitationReplyScreenState = {
    isProcessing: false,
    error: null,
    isValidLink: this.validateUrlParams(),
  };

  render() {
    const { isValidLink } = this.state;
    if (!isValidLink) {
      return this.renderInvalidLink();
    }

    return this.renderInvitationDialog();
  }

  private renderInvalidLink() {
    return (
      <UnauthenticatedLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            <Heading size="sm">Invalid Invitation Link</Heading>
            <Text>
              This invitation link appears to be invalid or corrupted. Please
              check the link you received or contact the person who invited you.
            </Text>
            <Box>
              <Link href="/login">Go to Login</Link>
            </Box>
          </VStack>
        </Card>
      </UnauthenticatedLayout>
    );
  }

  private renderInvitationDialog() {
    const { isProcessing } = this.state;
    const params = this.getParams();

    // Get invitation details from URL parameters
    const accountName = params.account;
    const invitedEmail = params.email;

    return (
      <UnauthenticatedLayout>
        <Card padding="md" width="100%" maxW="500px">
          <VStack alignItems="stretch" gap="6">
            <VStack alignItems="stretch" gap="3">
              <Heading size="sm">Got an invite!</Heading>
              <Text block>
                Welcome <b>{invitedEmail}</b>!
              </Text>
              <Text>
                You've been invited to join <strong>{accountName}</strong>. If
                you accept, you will be able to work alongside their team.
              </Text>
              <Text></Text>
            </VStack>

            <VStack alignItems="stretch" gap="4">
              <HStack gap="3" justifyContent="center">
                <Button
                  colorScheme="green"
                  loading={isProcessing}
                  onClick={this.handleAccept}
                  size="lg"
                >
                  Accept Invitation
                </Button>
                <Button
                  variant="outline"
                  loading={isProcessing}
                  onClick={this.handleDecline}
                  size="lg"
                >
                  Decline
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </UnauthenticatedLayout>
    );
  }

  private validateUrlParams(): boolean {
    const params = this.getParams();

    return !!(params.email && params.account && params.secret);
  }

  private getParams() {
    const query = getRouter()?.location?.query;
    return {
      email: typeof query?.email === "string" ? query.email : "",
      account: typeof query?.account === "string" ? query.account : "",
      secret: typeof query?.secret === "string" ? query.secret : "",
    };
  }

  private handleAccept = async () => {
    const params = this.getParams();

    this.setState({ isProcessing: true });

    try {
      const apiClient = getApiClient();
      const response = await replyToInvitationPublic(
        apiClient,
        params.email,
        params.secret,
        "ACCEPT"
      );

      setAuthenticatedId(response.data.authenticatedId || "");

      // Redirect to home immediately
      getRouter().push("/home");
    } catch (error) {
      console.error("Failed to accept invitation:", error);
      this.setState({ isProcessing: false });

      toaster.error(
        error instanceof ApiError
          ? error.response?.data?.message || "Failed to accept invitation"
          : "Failed to accept invitation"
      );
    }
  };

  private handleDecline = async () => {
    const params = this.getParams();

    this.setState({ isProcessing: true });

    try {
      const apiClient = getApiClient();
      await replyToInvitationPublic(
        apiClient,
        params.email,
        params.secret,
        "DECLINE"
      );

      toaster.info("You've declined the invitation.");

      // Redirect to home immediately
      getRouter().push("/home");
    } catch (error) {
      console.error("Failed to decline invitation:", error);
      this.setState({ isProcessing: false });

      toaster.error(
        error instanceof ApiError
          ? error.response?.data?.message || "Failed to decline invitation"
          : "Failed to decline invitation"
      );
    }
  };
}
