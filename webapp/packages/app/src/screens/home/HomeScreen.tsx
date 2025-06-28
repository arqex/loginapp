import React from "react";
import { Card, Heading, VStack, HStack, Box, Text, Badge } from "@loginapp/ui";
import withAuth, {
  type WithAuthProps,
} from "../../application/auth/withAuth.hoc";
import { setAuthenticatedId } from "../../application/auth/auth.context";
import { getRouter } from "../../application/routing/router";

import { AuthLayout, ContentLayout } from "../../components/layouts";
import Sidebar from "../../components/Sidebar/Sidebar";

type HomeScreenProps = WithAuthProps<void>;

class HomeScreen extends React.Component<HomeScreenProps> {
  handleLogout = () => {
    setAuthenticatedId("");
    getRouter().push("/login");
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

    return (
      <AuthLayout appMenu={<Sidebar />} contentWidth="full">
        <ContentLayout titleBar={this.renderTitleBar()}>
          <Box minH="100vh" bg="gray.50" p="6">
            <VStack maxW="1200px" mx="auto" gap="6" alignItems="stretch">
              {/* Current Account Info */}
              {authContext.account && (
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
                      {authContext.account.name}
                    </Text>
                  </VStack>
                </Card>
              )}

              {/* Account Details */}
              {authContext.account && (
                <Card padding="md">
                  <VStack alignItems="stretch" gap="4">
                    <Heading size="sm">Account Details</Heading>
                    <Box
                      p="4"
                      borderWidth="1px"
                      borderRadius="md"
                      borderColor="blue.500"
                      bg="blue.50"
                    >
                      <HStack
                        justifyContent="space-between"
                        alignItems="center"
                        gap="4"
                      >
                        <VStack alignItems="flex-start" gap="1">
                          <Text fontWeight="semibold">
                            {authContext.account.name}
                          </Text>
                          <Text fontSize="sm" color="lighter">
                            Created:{" "}
                            {new Date(
                              authContext.account.createdAt
                            ).toLocaleDateString()}
                          </Text>
                        </VStack>
                        <VStack alignItems="flex-end" gap="1">
                          <Badge
                            colorScheme={this.getRoleBadgeColor(
                              authContext.role || "CONTRIBUTOR"
                            )}
                          >
                            {authContext.role}
                          </Badge>
                          <Text
                            fontSize="xs"
                            color="action"
                            fontWeight="medium"
                          >
                            Current
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </VStack>
                </Card>
              )}

              {/* Role Permissions Info */}
              <Card padding="md">
                <VStack alignItems="stretch" gap="4">
                  <Heading size="sm">Your Permissions</Heading>
                  {authContext.account && (
                    <Box>
                      <Text mb="3" fontWeight="medium">
                        As {authContext.role} in "{authContext.account.name}",
                        you can:
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
            </VStack>
          </Box>
        </ContentLayout>
      </AuthLayout>
    );
  }

  renderTitleBar() {
    const userName = this.props.authContext.user.name;
    return (
      <Heading size="sm" lineHeight="1em">
        Welcome {userName}!
      </Heading>
    );
  }
}

const HomeScreenWithAuth = withAuth(HomeScreen);
export default HomeScreenWithAuth;
