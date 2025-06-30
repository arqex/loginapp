import React from "react";
import {
  Card,
  Heading,
  VStack,
  HStack,
  Box,
  Text,
  Badge,
  Button,
  Spinner,
} from "@loginapp/ui";
import { getApiClient } from "../../application/stores/apiClient";
import {
  loadInvitation,
  acceptInvitation,
  declineInvitation,
  type ApiInvitation,
} from "@loginapp/api-client";
import { AuthLayout, ContentLayout } from "../../components/layouts";
import Sidebar from "../../components/Sidebar/Sidebar";
import { t } from "../../application/i18n/i18n.service";
import { getAuthenticatedId } from "../../application/auth/auth.context";

interface InvitationScreenProps {
  invitationId?: string;
}

interface InvitationScreenState {
  invitation: ApiInvitation | null;
  isLoading: boolean;
  isProcessing: boolean;
  error: string | null;
  result: "accepted" | "declined" | null;
  invitationId: string | null;
}

class InvitationScreen extends React.Component<
  InvitationScreenProps,
  InvitationScreenState
> {
  state: InvitationScreenState = {
    invitation: null,
    isLoading: true,
    isProcessing: false,
    error: null,
    result: null,
    invitationId: null,
  };

  componentDidMount() {
    // Extract invitation ID from props or URL
    const invitationId =
      this.props.invitationId || this.getInvitationIdFromUrl();
    if (invitationId) {
      this.setState({ invitationId }, () => {
        this.loadInvitationData();
      });
    } else {
      this.setState({
        error: t("Invalid invitation link"),
        isLoading: false,
      });
    }
  }

  getInvitationIdFromUrl = (): string | null => {
    try {
      // Extract from window location hash
      const hash = window.location.hash;
      const match = hash.match(/\/invitation\/([^/?]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  loadInvitationData = async () => {
    const { invitationId } = this.state;

    if (!invitationId) return;

    try {
      const response = await loadInvitation(getApiClient(), invitationId);
      this.setState({
        invitation: response.data,
        isLoading: false,
      });
    } catch (error: unknown) {
      console.error("Error loading invitation:", error);
      this.setState({
        error: t("Failed to load invitation details"),
        isLoading: false,
      });
    }
  };

  getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "red";
      case "EDITOR":
        return "blue";
      case "COLLABORATOR":
        return "green";
      default:
        return "gray";
    }
  };

  getStatusBadgeColor = (status: string, isExpired?: boolean) => {
    if (isExpired) return "gray";
    switch (status) {
      case "PENDING":
        return "yellow";
      case "ACCEPTED":
        return "green";
      case "DECLINED":
        return "red";
      case "CANCELLED":
        return "gray";
      default:
        return "gray";
    }
  };

  handleAcceptInvitation = async () => {
    const { invitationId } = this.state;

    if (!invitationId) return;

    if (!getAuthenticatedId()) {
      // Redirect to login with invitation context
      window.location.href = `#/login?invitationId=${invitationId}`;
      return;
    }

    this.setState({ isProcessing: true });

    try {
      await acceptInvitation(getApiClient(), invitationId);
      this.setState({
        result: "accepted",
        isProcessing: false,
      });
    } catch (error: unknown) {
      console.error("Error accepting invitation:", error);
      this.setState({
        error: t("Failed to accept invitation"),
        isProcessing: false,
      });
    }
  };

  handleDeclineInvitation = async () => {
    const { invitationId } = this.state;

    if (!invitationId) return;

    if (!getAuthenticatedId()) {
      // Redirect to login with invitation context
      window.location.href = `#/login?invitationId=${invitationId}`;
      return;
    }

    this.setState({ isProcessing: true });

    try {
      await declineInvitation(getApiClient(), invitationId);
      this.setState({
        result: "declined",
        isProcessing: false,
      });
    } catch (error: unknown) {
      console.error("Error declining invitation:", error);
      this.setState({
        error: t("Failed to decline invitation"),
        isProcessing: false,
      });
    }
  };

  renderResultScreen = () => {
    const { result, invitation } = this.state;

    if (result === "accepted") {
      return (
        <Card padding="md">
          <VStack alignItems="center" gap="6">
            <Box textAlign="center">
              <Text fontSize="lg" color="action" mb="2">
                ✓ {t("Invitation Accepted!")}
              </Text>
              <Text fontSize="md" mb="4">
                {t("Welcome to")} <strong>{invitation?.account.name}</strong>!
              </Text>
              <Text fontSize="sm" color="lighter" mb="4">
                {t("You now have")} <strong>{invitation?.meta.role}</strong>{" "}
                {t("access to this account")}.
              </Text>
            </Box>
            <HStack gap="3">
              <Button as="a" href="#/home" colorScheme="blue">
                {t("Go to Dashboard")}
              </Button>
              <Button as="a" href="#/account" variant="outline">
                {t("View Account")}
              </Button>
            </HStack>
          </VStack>
        </Card>
      );
    }

    if (result === "declined") {
      return (
        <Card padding="md">
          <VStack alignItems="center" gap="6">
            <Box textAlign="center">
              <Text fontSize="lg" color="lighter" mb="2">
                {t("Invitation Declined")}
              </Text>
              <Text fontSize="md" mb="4">
                {t("You have declined the invitation to join")}{" "}
                <strong>{invitation?.account.name}</strong>.
              </Text>
            </Box>
            <Button as="a" href="#/home" colorScheme="blue">
              {t("Go to Dashboard")}
            </Button>
          </VStack>
        </Card>
      );
    }

    return null;
  };

  renderInvitationDetails = () => {
    const { invitation, isProcessing } = this.state;
    const isAuthenticated = !!getAuthenticatedId();

    if (!invitation) return null;

    const isExpired =
      invitation.isExpired || new Date(invitation.expiresAt) < new Date();
    const isPending = invitation.status === "PENDING";
    const canRespond = isPending && !isExpired;

    return (
      <Card padding="md">
        <VStack alignItems="stretch" gap="6">
          <Box textAlign="center">
            <Heading size="lg" mb="4">
              {t("You're Invited!")}
            </Heading>
            <Text fontSize="lg" mb="2">
              {t("You've been invited to join")}
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="action" mb="4">
              {invitation.account.name}
            </Text>
          </Box>

          <VStack alignItems="stretch" gap="4">
            <HStack justifyContent="space-between">
              <Text fontWeight="medium">{t("Email")}:</Text>
              <Text>{invitation.email}</Text>
            </HStack>

            <HStack justifyContent="space-between">
              <Text fontWeight="medium">{t("Role")}:</Text>
              <Badge colorScheme={this.getRoleBadgeColor(invitation.meta.role)}>
                {t(invitation.meta.role)}
              </Badge>
            </HStack>

            <HStack justifyContent="space-between">
              <Text fontWeight="medium">{t("Status")}:</Text>
              <Badge
                colorScheme={this.getStatusBadgeColor(
                  invitation.status,
                  isExpired
                )}
              >
                {isExpired ? t("EXPIRED") : t(invitation.status)}
              </Badge>
            </HStack>

            <HStack justifyContent="space-between">
              <Text fontWeight="medium">{t("Expires")}:</Text>
              <Text fontSize="sm" color="lighter">
                {new Date(invitation.expiresAt).toLocaleDateString()}
              </Text>
            </HStack>
          </VStack>

          {!canRespond && (
            <Box
              p="4"
              bg="yellow.50"
              borderWidth="1px"
              borderColor="yellow.200"
              borderRadius="md"
            >
              <Text color="lighter" fontSize="sm" textAlign="center">
                {isExpired
                  ? t("This invitation has expired")
                  : t("This invitation is no longer available")}
              </Text>
            </Box>
          )}

          {!isAuthenticated && canRespond && (
            <Box
              p="4"
              bg="blue.50"
              borderWidth="1px"
              borderColor="blue.200"
              borderRadius="md"
            >
              <VStack gap="3">
                <Text color="lighter" fontSize="sm" textAlign="center">
                  {t(
                    "Please sign in or create an account to respond to this invitation"
                  )}
                </Text>
                <HStack gap="2" justifyContent="center">
                  <Button
                    as="a"
                    href={`#/login?invitationId=${invitation.id}`}
                    size="sm"
                    colorScheme="blue"
                  >
                    {t("Sign In")}
                  </Button>
                  <Button
                    as="a"
                    href={`#/signup?invitationId=${invitation.id}`}
                    size="sm"
                    variant="outline"
                  >
                    {t("Create Account")}
                  </Button>
                </HStack>
              </VStack>
            </Box>
          )}

          {isAuthenticated && canRespond && (
            <VStack gap="3">
              <Text textAlign="center" fontSize="sm" color="lighter">
                {t("What would you like to do?")}
              </Text>
              <HStack gap="3" justifyContent="center">
                <Button
                  colorScheme="green"
                  onClick={this.handleAcceptInvitation}
                  loading={isProcessing}
                  size="lg"
                >
                  {t("Accept Invitation")}
                </Button>
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={this.handleDeclineInvitation}
                  loading={isProcessing}
                  size="lg"
                >
                  {t("Decline")}
                </Button>
              </HStack>
            </VStack>
          )}
        </VStack>
      </Card>
    );
  };

  renderTitleBar = () => {
    return (
      <HStack justifyContent="space-between" alignItems="center" p="4">
        <Heading size="md">{t("Account Invitation")}</Heading>
      </HStack>
    );
  };

  render() {
    const { isLoading, error, result } = this.state;
    const isAuthenticated = !!getAuthenticatedId();

    return (
      <AuthLayout
        appMenu={isAuthenticated ? <Sidebar /> : undefined}
        contentWidth="full"
      >
        <ContentLayout titleBar={this.renderTitleBar()}>
          <Box minH="100vh" bg="gray.50" p="6">
            <VStack maxW="600px" mx="auto" gap="6" alignItems="stretch">
              {isLoading ? (
                <Card padding="md">
                  <VStack alignItems="center" gap="4">
                    <Spinner size="lg" />
                    <Text>{t("Loading invitation...")}</Text>
                  </VStack>
                </Card>
              ) : error ? (
                <Card padding="md">
                  <VStack alignItems="center" gap="4">
                    <Text color="lighter" textAlign="center">
                      {error}
                    </Text>
                    <Button variant="outline" onClick={this.loadInvitationData}>
                      {t("Try Again")}
                    </Button>
                  </VStack>
                </Card>
              ) : result ? (
                this.renderResultScreen()
              ) : (
                this.renderInvitationDetails()
              )}
            </VStack>
          </Box>
        </ContentLayout>
      </AuthLayout>
    );
  }
}

export default InvitationScreen;
