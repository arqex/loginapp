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
} from "@loginapp/ui";
import withAuth, {
  type WithAuthProps,
} from "../../application/auth/withAuth.hoc";
import { getApiClient } from "../../application/stores/apiClient";
import {
  updateAccount,
  clearAccountCache,
  clearAccountUsersCache,
} from "@loginapp/api-client";
import { accountUsersLoader } from "../../application/loaders";
import { AuthLayout, ContentLayout } from "../../components/layouts";
import Sidebar from "../../components/Sidebar/Sidebar";
import { t } from "../../application/i18n/i18n.service";
import { type ValidationErrors } from "../../application/utils/validation.utils";

type AccountScreenProps = WithAuthProps<void>;

interface AccountScreenState {
  isEditingName: boolean;
  newAccountName: string;
  isSaving: boolean;
  errors: ValidationErrors;
}

class AccountScreen extends React.Component<
  AccountScreenProps,
  AccountScreenState
> {
  state: AccountScreenState = {
    isEditingName: false,
    newAccountName: "",
    isSaving: false,
    errors: {},
  };

  componentDidMount() {
    // No need to load data here - using loaders in render
  }

  getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "red";
      case "EDITOR":
        return "blue";
      case "COLLABORATOR":
        return "green";
      case "UNKNOWN":
        return "gray";
      default:
        return "gray";
    }
  };

  handleEditNameClick = () => {
    const { authContext } = this.props;
    this.setState({
      isEditingName: true,
      newAccountName: authContext.account?.name || "",
      errors: {},
    });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditingName: false,
      newAccountName: "",
      errors: {},
    });
  };

  handleSaveAccountName = async () => {
    const { newAccountName } = this.state;
    const { authContext } = this.props;

    const errors = this.getValidationErrors(newAccountName);
    if (errors) {
      this.setState({ errors });
      return;
    }

    if (!authContext.account) return;

    this.setState({ isSaving: true });

    try {
      await updateAccount(getApiClient(), authContext.account.id, {
        name: newAccountName.trim(),
      });

      // Clear account cache to refresh data
      clearAccountCache(getApiClient(), authContext.account.id);
      clearAccountUsersCache(getApiClient(), authContext.account.id);

      toaster.success(t("Account name updated successfully!"));
      this.setState({
        isEditingName: false,
        isSaving: false,
        newAccountName: "",
        errors: {},
      });
    } catch (error) {
      console.error("Error updating account name:", error);
      toaster.error(t("Failed to update account name"));
      this.setState({ isSaving: false });
    }
  };

  getValidationErrors(accountName: string): ValidationErrors | null {
    const errors: ValidationErrors = {};

    if (!accountName || accountName.trim().length === 0) {
      errors.accountName = t("Account name is required.");
    } else if (accountName.trim().length < 2) {
      errors.accountName = t(
        "Account name must be at least 2 characters long."
      );
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  renderAccountInfo = () => {
    const { authContext } = this.props;
    const { isEditingName, newAccountName, isSaving, errors } = this.state;

    if (!authContext.account) return null;

    return (
      <Card padding="md">
        <VStack alignItems="stretch" gap="4">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="sm">{t("Account Information")}</Heading>
            {authContext.role === "ADMIN" && !isEditingName && (
              <Button
                variant="outline"
                size="sm"
                onClick={this.handleEditNameClick}
              >
                {t("Edit Name")}
              </Button>
            )}
          </HStack>

          {isEditingName ? (
            <VStack alignItems="stretch" gap="3">
              <FormField error={errors?.accountName} label={t("Account Name")}>
                <Input
                  type="text"
                  value={newAccountName}
                  onChange={(e) =>
                    this.setState({ newAccountName: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") this.handleSaveAccountName();
                    if (e.key === "Escape") this.handleCancelEdit();
                  }}
                  placeholder={t("Account name")}
                  autoFocus
                />
              </FormField>
              <HStack gap="2">
                <Button
                  size="sm"
                  onClick={this.handleSaveAccountName}
                  loading={isSaving}
                >
                  {t("Save")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={this.handleCancelEdit}
                  disabled={isSaving}
                >
                  {t("Cancel")}
                </Button>
              </HStack>
            </VStack>
          ) : (
            <Box>
              <Text fontSize="lg" fontWeight="semibold" mb="2">
                {authContext.account.name}
              </Text>
              <Text fontSize="sm" color="lighter" mb="2">
                {t("Created")}:{" "}
                {new Date(authContext.account.createdAt).toLocaleDateString()}
              </Text>
              <HStack gap="2">
                <Text fontSize="sm" color="lighter">
                  {t("Your role")}:
                </Text>
                <Badge
                  colorScheme={this.getRoleBadgeColor(
                    authContext.role || "COLLABORATOR"
                  )}
                >
                  {authContext.role}
                </Badge>
              </HStack>
            </Box>
          )}
        </VStack>
      </Card>
    );
  };

  renderAccountMembers = () => {
    const { authContext } = this.props;

    if (!authContext.account) return null;

    // Load account users using the loader
    const { data: accountUsersResponse, isLoading: isLoadingUsers } =
      accountUsersLoader(getApiClient(), authContext.account.id);

    const accountUsers = accountUsersResponse?.items || [];

    return (
      <Card padding="md">
        <VStack alignItems="stretch" gap="4">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="sm">{t("Account Members")}</Heading>
            {authContext.role === "ADMIN" && (
              <Button
                variant="outline"
                size="sm"
                as="a"
                href="/account/invitations"
              >
                {t("Manage Invitations")}
              </Button>
            )}
          </HStack>

          {isLoadingUsers ? (
            <Text color="lighter">{t("Loading members...")}</Text>
          ) : (
            <VStack alignItems="stretch" gap="3">
              {accountUsers.map((user) => (
                <Box key={user.id}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    p="3"
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <VStack alignItems="flex-start" gap="1">
                      <Text fontWeight="medium">{user.name}</Text>
                      <Text fontSize="sm" color="lighter">
                        {t("Member since")}:{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Text>
                    </VStack>
                    <VStack alignItems="flex-end" gap="1">
                      <Badge colorScheme={this.getRoleBadgeColor(user.role)}>
                        {t(user.role)}
                      </Badge>
                      {authContext.role === "ADMIN" &&
                        user.id !== authContext.user.id && (
                          <Button
                            variant="outline"
                            size="sm"
                            colorScheme="red"
                            disabled
                          >
                            {t("Remove")}
                          </Button>
                        )}
                    </VStack>
                  </HStack>
                </Box>
              ))}
              {accountUsers.length === 0 && (
                <Text color="lighter" textAlign="center" py="4">
                  {t("No members found")}
                </Text>
              )}
            </VStack>
          )}
        </VStack>
      </Card>
    );
  };

  renderPermissionsInfo = () => {
    const { authContext } = this.props;

    if (!authContext.role) return null;

    const permissions = {
      ADMIN: [
        "Create, edit, and delete todo lists",
        "Create, edit, and delete todo items",
        "Manage account settings",
        "Invite and remove members",
        "View all account data",
      ],
      EDITOR: [
        "Create, edit, and delete todo items",
        "Mark todo items as done/undone",
        "View all todo lists and items",
        "View account information",
      ],
      COLLABORATOR: [
        "Mark todo items as done/undone",
        "View todo lists and items",
        "View account information",
      ],
    };

    return (
      <Card padding="md">
        <VStack alignItems="stretch" gap="4">
          <Heading size="sm">{t("Your Permissions")}</Heading>
          <Box>
            <Text mb="3" fontWeight="medium">
              {t("As")} {authContext.role} {t("in")} "
              {authContext.account?.name}", {t("you can")}:
            </Text>
            <VStack alignItems="flex-start" gap="1">
              {permissions[authContext.role as keyof typeof permissions]?.map(
                (permission, index) => (
                  <HStack key={index} gap="2">
                    <Text fontSize="sm" color="action">
                      ✓
                    </Text>
                    <Text fontSize="sm">{permission}</Text>
                  </HStack>
                )
              )}
            </VStack>
          </Box>
        </VStack>
      </Card>
    );
  };

  renderTitleBar = () => {
    const { authContext } = this.props;

    return (
      <HStack justifyContent="space-between" alignItems="center" p="4">
        <Heading size="md">{t("Account Settings")}</Heading>
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
        <AuthLayout appMenu={<Sidebar />} contentWidth="full">
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

    return (
      <AuthLayout appMenu={<Sidebar />} contentWidth="full">
        <ContentLayout titleBar={this.renderTitleBar()}>
          <Box minH="100vh" bg="gray.50" p="6">
            <VStack maxW="800px" mx="auto" gap="6" alignItems="stretch">
              {this.renderAccountInfo()}

              <Separator />

              {this.renderAccountMembers()}

              <Separator />

              {this.renderPermissionsInfo()}
            </VStack>
          </Box>
        </ContentLayout>
      </AuthLayout>
    );
  }
}

const AccountScreenWithAuth = withAuth(AccountScreen);
export default AccountScreenWithAuth;
