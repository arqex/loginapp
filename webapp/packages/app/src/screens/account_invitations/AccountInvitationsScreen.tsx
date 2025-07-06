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
  Input,
  FormField,
  toaster,
  Separator,
  Select,
  Spinner,
} from "@loginapp/ui";
import withAuth, {
  type WithAuthProps,
} from "../../application/auth/withAuth.hoc";
import { getApiClient } from "../../application/stores/apiClient";
import {
  createAccountInvitation,
  deleteInvitation,
  updateInvitation,
  resendInvitation,
  invalidateAccountInvitations,
  type ApiInvitation,
  type CreateInvitationPayload,
} from "@loginapp/api-client";
import { accountInvitationsLoaderWithErrors } from "../../application/loaders";
import { AuthLayout, ContentLayout } from "../../components/layouts";
import Sidebar from "../../components/Sidebar/Sidebar";
import { t } from "../../application/i18n/i18n.service";
import { type ValidationErrors } from "../../application/utils/validation.utils";

type AccountInvitationsScreenProps = WithAuthProps<void>;

interface InviteFormData {
  email: string;
  role: "ADMIN" | "EDITOR" | "COLLABORATOR";
}

interface AccountInvitationsScreenState {
  inviteForm: InviteFormData;
  isInviting: boolean;
  editingInvitation: string | null;
  editForm: {
    role: "ADMIN" | "EDITOR" | "COLLABORATOR";
  };
  errors: ValidationErrors;
  processingInvitations: Set<string>;
}

class AccountInvitationsScreen extends React.Component<
  AccountInvitationsScreenProps,
  AccountInvitationsScreenState
> {
  state: AccountInvitationsScreenState = {
    inviteForm: {
      email: "",
      role: "COLLABORATOR",
    },
    isInviting: false,
    editingInvitation: null,
    editForm: {
      role: "COLLABORATOR",
    },
    errors: {},
    processingInvitations: new Set(),
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

  handleInviteFormChange = (
    field: keyof InviteFormData,
    value: string | number
  ) => {
    this.setState({
      inviteForm: {
        ...this.state.inviteForm,
        [field]: value,
      },
      errors: {
        ...this.state.errors,
        [field]: "",
      },
    });
  };

  validateInviteForm = (): ValidationErrors | null => {
    const { inviteForm } = this.state;
    const errors: ValidationErrors = {};

    if (!inviteForm.email.trim()) {
      errors.email = t("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteForm.email)) {
      errors.email = t("Please enter a valid email address");
    }

    if (!inviteForm.role) {
      errors.role = t("Role is required");
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  handleSendInvitation = async () => {
    const { authContext } = this.props;
    const { inviteForm } = this.state;

    if (!authContext.account) return;

    const errors = this.validateInviteForm();
    if (errors) {
      this.setState({ errors });
      return;
    }

    this.setState({ isInviting: true });

    try {
      const payload: CreateInvitationPayload = {
        email: inviteForm.email.trim().toLowerCase(),
        role: inviteForm.role,
      };

      await createAccountInvitation(
        getApiClient(),
        authContext.account.id,
        payload
      );

      // Invalidate cache to refresh the invitations list
      invalidateAccountInvitations(getApiClient(), authContext.account.id);

      toaster.success(t("Invitation sent successfully!"));
      this.setState({
        inviteForm: {
          email: "",
          role: "COLLABORATOR",
        },
        isInviting: false,
        errors: {},
      });
    } catch (error: unknown) {
      console.error("Error sending invitation:", error);
      const errorMessage = t("Failed to send invitation");
      toaster.error(errorMessage);
      this.setState({ isInviting: false });
    }
  };

  handleDeleteInvitation = async (invitationId: string) => {
    const { authContext } = this.props;
    if (
      !authContext.account ||
      !confirm(t("Are you sure you want to delete this invitation?"))
    )
      return;

    this.setState({
      processingInvitations: new Set([
        ...this.state.processingInvitations,
        invitationId,
      ]),
    });

    try {
      await deleteInvitation(getApiClient(), invitationId);
      invalidateAccountInvitations(getApiClient(), authContext.account.id);
      toaster.success(t("Invitation deleted successfully"));
    } catch (error: unknown) {
      console.error("Error deleting invitation:", error);
      const errorMessage = t("Failed to delete invitation");
      toaster.error(errorMessage);
    }

    this.setState({
      processingInvitations: new Set(
        [...this.state.processingInvitations].filter(
          (id) => id !== invitationId
        )
      ),
    });
  };

  handleResendInvitation = async (invitationId: string) => {
    const { authContext } = this.props;
    if (!authContext.account) return;

    this.setState({
      processingInvitations: new Set([
        ...this.state.processingInvitations,
        invitationId,
      ]),
    });

    try {
      await resendInvitation(getApiClient(), invitationId, 7);
      invalidateAccountInvitations(getApiClient(), authContext.account.id);
      toaster.success(t("Invitation resent successfully"));
    } catch (error: unknown) {
      console.error("Error resending invitation:", error);
      const errorMessage = t("Failed to resend invitation");
      toaster.error(errorMessage);
    }

    this.setState({
      processingInvitations: new Set(
        [...this.state.processingInvitations].filter(
          (id) => id !== invitationId
        )
      ),
    });
  };

  handleEditInvitation = (invitation: ApiInvitation) => {
    this.setState({
      editingInvitation: invitation.id,
      editForm: {
        role: invitation.meta.role,
      },
    });
  };

  handleCancelEdit = () => {
    this.setState({
      editingInvitation: null,
      editForm: {
        role: "COLLABORATOR",
      },
    });
  };

  handleSaveEdit = async (invitationId: string) => {
    const { authContext } = this.props;
    const { editForm } = this.state;

    if (!authContext.account) return;

    this.setState({
      processingInvitations: new Set([
        ...this.state.processingInvitations,
        invitationId,
      ]),
    });

    try {
      await updateInvitation(getApiClient(), invitationId, {
        role: editForm.role,
      });

      invalidateAccountInvitations(getApiClient(), authContext.account.id);
      toaster.success(t("Invitation updated successfully"));
      this.setState({ editingInvitation: null });
    } catch (error: unknown) {
      console.error("Error updating invitation:", error);
      const errorMessage = t("Failed to update invitation");
      toaster.error(errorMessage);
    }

    this.setState({
      processingInvitations: new Set(
        [...this.state.processingInvitations].filter(
          (id) => id !== invitationId
        )
      ),
    });
  };

  renderInviteForm = () => {
    const { inviteForm, isInviting, errors } = this.state;

    return (
      <Card padding="md">
        <VStack alignItems="stretch" gap="4">
          <Heading size="sm">{t("Invite New Member")}</Heading>

          <VStack alignItems="stretch" gap="3">
            <FormField error={errors?.email} label={t("Email Address")}>
              <Input
                type="email"
                value={inviteForm.email}
                onChange={(e) =>
                  this.handleInviteFormChange("email", e.target.value)
                }
                placeholder={t("Enter email address")}
              />
            </FormField>

            <FormField error={errors?.role} label={t("Role")}>
              <Select
                value={inviteForm.role}
                onChange={(e) =>
                  this.handleInviteFormChange("role", e.target.value)
                }
              >
                <option value="COLLABORATOR">{t("Collaborator")}</option>
                <option value="EDITOR">{t("Editor")}</option>
                <option value="ADMIN">{t("Admin")}</option>
              </Select>
            </FormField>

            <Button
              onClick={this.handleSendInvitation}
              loading={isInviting}
              colorScheme="blue"
            >
              {t("Send Invitation")}
            </Button>
          </VStack>
        </VStack>
      </Card>
    );
  };

  renderInvitationsList = () => {
    const { authContext } = this.props;
    const { editingInvitation, editForm, processingInvitations } = this.state;

    if (!authContext.account) return null;

    // Load invitations using the loader with error handling
    const {
      data: invitations,
      isLoading,
      error,
    } = accountInvitationsLoaderWithErrors(
      getApiClient(),
      authContext.account.id
    );

    if (error) {
      // Check if it's a permission error
      const isPermissionError = error?.status === 403;

      return (
        <Card padding="md">
          <VStack alignItems="center" gap="4">
            <Heading size="sm">{t("Invitations")}</Heading>
            <Box textAlign="center">
              <Text color="lighter" mb="2">
                {isPermissionError
                  ? t(
                      "You don't have permission to view invitations. Only account administrators can manage invitations."
                    )
                  : t("Error loading invitations")}
              </Text>
              {!isPermissionError && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    invalidateAccountInvitations(
                      getApiClient(),
                      authContext.account!.id
                    )
                  }
                >
                  {t("Retry")}
                </Button>
              )}
            </Box>
          </VStack>
        </Card>
      );
    }

    return (
      <Card padding="md">
        <VStack alignItems="stretch" gap="4">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="sm">{t("Sent Invitations")}</Heading>
            {isLoading && <Spinner size="sm" />}
          </HStack>

          {isLoading && !invitations ? (
            <Text color="lighter">{t("Loading invitations...")}</Text>
          ) : (
            <VStack alignItems="stretch" gap="3">
              {invitations && invitations.length > 0 ? (
                invitations.map((invitation) => (
                  <Box key={invitation.id}>
                    <Box
                      p="4"
                      borderWidth="1px"
                      borderRadius="md"
                      bg={invitation.isExpired ? "gray.50" : "white"}
                    >
                      {editingInvitation === invitation.id ? (
                        <VStack alignItems="stretch" gap="3">
                          <HStack justifyContent="space-between">
                            <VStack alignItems="flex-start" gap="1">
                              <Text fontWeight="medium">
                                {invitation.email}
                              </Text>
                              <Text fontSize="sm" color="lighter">
                                {t("Invited")}:{" "}
                                {new Date(
                                  invitation.createdAt
                                ).toLocaleDateString()}
                              </Text>
                            </VStack>
                            <Badge
                              colorScheme={this.getStatusBadgeColor(
                                invitation.status,
                                invitation.isExpired
                              )}
                            >
                              {invitation.isExpired
                                ? t("EXPIRED")
                                : t(invitation.status)}
                            </Badge>
                          </HStack>

                          <HStack gap="3">
                            <FormField label={t("Role")}>
                              <Select
                                value={editForm.role}
                                onChange={(e) =>
                                  this.setState({
                                    editForm: {
                                      ...editForm,
                                      role: e.target.value as
                                        | "ADMIN"
                                        | "EDITOR"
                                        | "COLLABORATOR",
                                    },
                                  })
                                }
                                size="sm"
                              >
                                <option value="COLLABORATOR">
                                  {t("Collaborator")}
                                </option>
                                <option value="EDITOR">{t("Editor")}</option>
                                <option value="ADMIN">{t("Admin")}</option>
                              </Select>
                            </FormField>
                          </HStack>

                          <HStack gap="2">
                            <Button
                              size="sm"
                              colorScheme="blue"
                              onClick={() => this.handleSaveEdit(invitation.id)}
                              loading={processingInvitations.has(invitation.id)}
                            >
                              {t("Save")}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={this.handleCancelEdit}
                              disabled={processingInvitations.has(
                                invitation.id
                              )}
                            >
                              {t("Cancel")}
                            </Button>
                          </HStack>
                        </VStack>
                      ) : (
                        <VStack alignItems="stretch" gap="3">
                          <HStack justifyContent="space-between">
                            <VStack alignItems="flex-start" gap="1">
                              <Text fontWeight="medium">
                                {invitation.email}
                              </Text>
                              <HStack gap="2">
                                <Text fontSize="sm" color="lighter">
                                  {t("Role")}:
                                </Text>
                                <Badge
                                  colorScheme={this.getRoleBadgeColor(
                                    invitation.meta.role
                                  )}
                                >
                                  {t(invitation.meta.role)}
                                </Badge>
                              </HStack>
                              <Text fontSize="sm" color="lighter">
                                {t("Invited")}:{" "}
                                {new Date(
                                  invitation.createdAt
                                ).toLocaleDateString()}
                              </Text>
                              <Text fontSize="sm" color="lighter">
                                {t("Expires")}:{" "}
                                {new Date(
                                  invitation.expiresAt
                                ).toLocaleDateString()}
                              </Text>
                            </VStack>
                            <VStack alignItems="flex-end" gap="2">
                              <Badge
                                colorScheme={this.getStatusBadgeColor(
                                  invitation.status,
                                  invitation.isExpired
                                )}
                              >
                                {invitation.isExpired
                                  ? t("EXPIRED")
                                  : t(invitation.status)}
                              </Badge>
                            </VStack>
                          </HStack>

                          {invitation.status === "PENDING" && (
                            <HStack gap="2" justifyContent="flex-end">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  this.handleEditInvitation(invitation)
                                }
                                disabled={processingInvitations.has(
                                  invitation.id
                                )}
                              >
                                {t("Edit")}
                              </Button>

                              {invitation.isExpired && (
                                <Button
                                  size="sm"
                                  colorScheme="blue"
                                  onClick={() =>
                                    this.handleResendInvitation(invitation.id)
                                  }
                                  loading={processingInvitations.has(
                                    invitation.id
                                  )}
                                >
                                  {t("Resend")}
                                </Button>
                              )}

                              <Button
                                size="sm"
                                colorScheme="red"
                                variant="outline"
                                onClick={() =>
                                  this.handleDeleteInvitation(invitation.id)
                                }
                                loading={processingInvitations.has(
                                  invitation.id
                                )}
                              >
                                {t("Delete")}
                              </Button>
                            </HStack>
                          )}
                        </VStack>
                      )}
                    </Box>
                  </Box>
                ))
              ) : (
                <Text color="lighter" textAlign="center" py="4">
                  {t("No invitations sent yet")}
                </Text>
              )}
            </VStack>
          )}
        </VStack>
      </Card>
    );
  };

  renderTitleBar = () => {
    const { authContext } = this.props;

    return (
      <HStack justifyContent="space-between" alignItems="center" p="4">
        <HStack gap="3">
          <Button variant="outline" size="sm" as="a" href="#account">
            {t("← Back to Account")}
          </Button>
          <Heading size="md">{t("Account Invitations")}</Heading>
        </HStack>
        {authContext.account && (
          <Badge colorScheme="blue">{authContext.account.name}</Badge>
        )}
      </HStack>
    );
  };

  render() {
    const { authContext } = this.props;

    if (!authContext.account) {
      return (
        <AuthLayout appMenu={<Sidebar />}>
          <ContentLayout titleBar={this.renderTitleBar()}>
            <Box minH="100vh" bg="gray.50" p="6">
              <VStack maxW="800px" mx="auto" gap="6" alignItems="stretch">
                <Card padding="md">
                  <VStack gap="4">
                    <Heading size="sm">{t("No Account Found")}</Heading>
                    <Text textAlign="center" color="lighter">
                      {t(
                        "You don't have access to any account. Please contact your administrator."
                      )}
                    </Text>
                  </VStack>
                </Card>
              </VStack>
            </Box>
          </ContentLayout>
        </AuthLayout>
      );
    }

    // Only show invite form for ADMINs
    const canManageInvitations = authContext.role === "ADMIN";

    return (
      <AuthLayout appMenu={<Sidebar />} contentWidth="full">
        <ContentLayout titleBar={this.renderTitleBar()}>
          <Box minH="100vh" bg="gray.50" p="6">
            <VStack maxW="800px" mx="auto" gap="6" alignItems="stretch">
              {canManageInvitations && this.renderInviteForm()}

              {canManageInvitations && <Separator />}

              {this.renderInvitationsList()}
            </VStack>
          </Box>
        </ContentLayout>
      </AuthLayout>
    );
  }
}

const AccountInvitationsScreenWithAuth = withAuth(AccountInvitationsScreen);
export default AccountInvitationsScreenWithAuth;
