import React from "react";
import { Card, Heading, VStack, HStack, Box, Text, Badge } from "@loginapp/ui";
import type { WithAuthProps } from "../../../application/auth/withAuth.hoc";

interface AccountHomeWidgetProps {
  authContext: WithAuthProps<void>["authContext"];
}

class AccountHomeWidget extends React.Component<AccountHomeWidgetProps> {
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

  render() {
    const { authContext } = this.props;

    if (!authContext.account) {
      return null;
    }

    return (
      <Card padding="md">
        <VStack alignItems="stretch" gap="4">
          <Heading size="sm">Current Account</Heading>

          {/* Account Details Box */}
          <Box
            p="4"
            borderWidth="1px"
            borderRadius="md"
            borderColor="blue.500"
            bg="blue.50"
          >
            <HStack justifyContent="space-between" alignItems="center" gap="4">
              <VStack alignItems="flex-start" gap="1">
                <Text fontWeight="semibold">{authContext.account.name}</Text>
                <Text fontSize="sm" color="lighter">
                  Created:{" "}
                  {new Date(authContext.account.createdAt).toLocaleDateString()}
                </Text>
              </VStack>
              <VStack alignItems="flex-end" gap="1">
                <Badge
                  colorScheme={this.getRoleBadgeColor(
                    authContext.role || "COLLABORATOR"
                  )}
                >
                  {authContext.role}
                </Badge>
                <Text fontSize="xs" color="action" fontWeight="medium">
                  Current
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* User Permissions */}
          <Box>
            <Text mb="3" fontWeight="medium">
              As {authContext.role} in "{authContext.account.name}", you can:
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
                  <Text fontSize="sm">• Mark TodoItems as done/undone</Text>
                  <Text fontSize="sm">• Manage users and permissions</Text>
                </>
              )}
              {authContext.role === "EDITOR" && (
                <>
                  <Text fontSize="sm">
                    • Create and edit TodoItems in existing TodoLists
                  </Text>
                  <Text fontSize="sm">• Mark TodoItems as done/undone</Text>
                  <Text fontSize="sm">• Read all TodoLists and TodoItems</Text>
                </>
              )}
              {authContext.role === "COLLABORATOR" && (
                <>
                  <Text fontSize="sm">• Mark TodoItems as done/undone</Text>
                  <Text fontSize="sm">• Read all TodoLists and TodoItems</Text>
                </>
              )}
            </VStack>
          </Box>
        </VStack>
      </Card>
    );
  }
}

export default AccountHomeWidget;
