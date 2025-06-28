import React from "react";
import {
  Card,
  Heading,
  VStack,
  HStack,
  Box,
  Button,
  Text,
  Badge,
} from "@loginapp/ui";
import withAuth, {
  type WithAuthProps,
} from "../../application/auth/withAuth.hoc";
import { setAuthenticatedId } from "../../application/auth/auth.context";
import { getRouter } from "../../application/routing/router";
import { userAccountsLoader } from "../../application/loaders/user.loaders";
import { getApiClient } from "../../application/stores/apiClient";
import type { UserAccount } from "@loginapp/api-client";
import { AuthLayout, ContentLayout } from "../../components/layouts";
import Sidebar from "../../components/Sidebar/Sidebar";
import { t } from "../../application/i18n/i18n.service";

type HomeScreenProps = WithAuthProps<void>;

interface HomeScreenState {
  selectedAccountId?: string;
}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  state: HomeScreenState = {
    selectedAccountId: this.props.authContext.account?.id,
  };

  handleLogout = () => {
    setAuthenticatedId("");
    getRouter().push("/login");
  };

  handleAccountSwitch = (accountId: string) => {
    this.setState({ selectedAccountId: accountId });
    // You can add logic here to switch the context account
    // For now, we'll just update the local state
  };

  getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "red";
      case "EDITOR":
        return "blue";
      case "CONTRIBUTOR":
        return "green";
      default:
        return "gray";
    }
  };

  render() {
    const { authContext } = this.props;
    const { selectedAccountId } = this.state;

    // Get user accounts using the loader
    const userAccountsResult = userAccountsLoader(
      getApiClient(),
      authContext.user.id
    );
    const userAccounts = userAccountsResult.data || [];

    const selectedAccount =
      userAccounts.find((acc: UserAccount) => acc.id === selectedAccountId) ||
      authContext.account;

    return (
      <AuthLayout appMenu={<Sidebar />} contentWidth="full">
        <ContentLayout titleBar={this.renderTitleBar()}>
          <Box minH="100vh" bg="gray.50" p="6">
            <VStack maxW="1200px" mx="auto" gap="6" alignItems="stretch">
              {/* Header */}
              <Card padding="md">
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  gap="4"
                >
                  <HStack gap="4">
                    <Box>
                      {authContext.user.picURL && (
                        <img
                          src={authContext.user.picURL}
                          alt={authContext.user.name}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </Box>
                    <VStack alignItems="flex-start" gap="1">
                      <Heading size="md">
                        Welcome, {authContext.user.name}!
                      </Heading>
                      <Text color="lighter">{authContext.user.email}</Text>
                    </VStack>
                  </HStack>
                  <Button onClick={this.handleLogout} variant="outline">
                    Logout
                  </Button>
                </HStack>
              </Card>

              {/* Current Account Info */}
              {selectedAccount && (
                <Card padding="md">
                  <VStack alignItems="flex-start" gap="3">
                    <HStack gap="2">
                      <Heading size="sm">Current Account:</Heading>
                      <Badge
                        colorScheme={this.getRoleBadgeColor(
                          authContext.role || "CONTRIBUTOR"
                        )}
                      >
                        {authContext.role}
                      </Badge>
                    </HStack>
                    <Text fontSize="lg" fontWeight="semibold">
                      {selectedAccount.name}
                    </Text>
                  </VStack>
                </Card>
              )}

              {/* Accounts List */}
              <Card padding="md">
                <VStack alignItems="stretch" gap="4">
                  <Heading size="sm">Your Accounts</Heading>
                  <VStack gap="3" alignItems="stretch">
                    {userAccounts.map((account: UserAccount) => (
                      <Box
                        key={account.id}
                        p="4"
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor={
                          selectedAccountId === account.id
                            ? "blue.500"
                            : "gray.200"
                        }
                        bg={
                          selectedAccountId === account.id ? "blue.50" : "white"
                        }
                        cursor="pointer"
                        onClick={() => this.handleAccountSwitch(account.id)}
                        _hover={{ borderColor: "blue.300", bg: "blue.25" }}
                      >
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          gap="4"
                        >
                          <VStack alignItems="flex-start" gap="1">
                            <Text fontWeight="semibold">{account.name}</Text>
                            <Text fontSize="sm" color="lighter">
                              Created:{" "}
                              {new Date(account.createdAt).toLocaleDateString()}
                            </Text>
                          </VStack>
                          <VStack alignItems="flex-end" gap="1">
                            <Badge
                              colorScheme={this.getRoleBadgeColor(account.role)}
                            >
                              {account.role}
                            </Badge>
                            {selectedAccountId === account.id && (
                              <Text
                                fontSize="xs"
                                color="action"
                                fontWeight="medium"
                              >
                                Current
                              </Text>
                            )}
                          </VStack>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </Card>

              {/* Role Permissions Info */}
              <Card padding="md">
                <VStack alignItems="stretch" gap="4">
                  <Heading size="sm">Your Permissions</Heading>
                  {selectedAccount && (
                    <Box>
                      <Text mb="3" fontWeight="medium">
                        As {authContext.role} in "{selectedAccount.name}", you
                        can:
                      </Text>
                      <VStack alignItems="flex-start" gap="2">
                        {authContext.role === "ADMIN" && (
                          <>
                            <Text fontSize="sm">
                              • Create, edit, and delete TodoLists
                            </Text>
                            <Text fontSize="sm">
                              • Create, edit, and delete TodoItems
                            </Text>
                            <Text fontSize="sm">
                              • Mark TodoItems as done/undone
                            </Text>
                            <Text fontSize="sm">
                              • Manage users and permissions
                            </Text>
                          </>
                        )}
                        {authContext.role === "EDITOR" && (
                          <>
                            <Text fontSize="sm">
                              • Create and edit TodoItems in existing TodoLists
                            </Text>
                            <Text fontSize="sm">
                              • Mark TodoItems as done/undone
                            </Text>
                            <Text fontSize="sm">
                              • Read all TodoLists and TodoItems
                            </Text>
                          </>
                        )}
                        {authContext.role === "CONTRIBUTOR" && (
                          <>
                            <Text fontSize="sm">
                              • Mark TodoItems as done/undone
                            </Text>
                            <Text fontSize="sm">
                              • Read all TodoLists and TodoItems
                            </Text>
                          </>
                        )}
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </Card>

              {/* Quick Actions */}
              <Card padding="md">
                <VStack alignItems="stretch" gap="4">
                  <Heading size="sm">Quick Actions</Heading>
                  <HStack gap="3">
                    <Button variant="primary">View TodoLists</Button>
                    {(authContext.role === "ADMIN" ||
                      authContext.role === "EDITOR") && (
                      <Button variant="outline">Create TodoList</Button>
                    )}
                    <Button variant="outline">Account Settings</Button>
                  </HStack>
                </VStack>
              </Card>
            </VStack>
          </Box>
        </ContentLayout>
      </AuthLayout>
    );
  }

  renderTitleBar() {
    return (
      <Heading size="sm" lineHeight="1em">
        {t("Welcome {{name}}!", { name: this.props.authContext.user.name })}
      </Heading>
    );
  }
}

const HomeScreenWithAuth = withAuth(HomeScreen);
export default HomeScreenWithAuth;
