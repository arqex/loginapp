import {
  MenuItem,
  Button,
  Text,
  VStack,
  Box,
  MenuHeading,
  Separator,
} from "@loginapp/ui";
import { CheckCircle, Add, Settings, Home } from "@loginapp/ui/src/icons/svg";
import React from "react";
import { getApiClient } from "../../../application/stores/apiClient";
import { getAuthContext } from "../../../application/auth/auth.context";
import { accountTodoListsLoader } from "../../../application/loaders";
import { createAccountTodoList } from "@loginapp/api-client";
import type { ApiTodoList } from "@loginapp/api-client";
import { t } from "../../../application/i18n/i18n.service";

// Logo component for the sidebar
function Logo() {
  return (
    <svg
      width="100%"
      height="24"
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loginapp logo"
      style={{ display: "block", margin: "0 auto" }}
    >
      <text
        x="0"
        y="18"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="16px"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="1"
        textLength="200"
        lengthAdjust="spacingAndGlyphs"
      >
        LoginApp
      </text>
    </svg>
  );
}

interface SidebarNavigationState {
  isCreatingTodoList: boolean;
}

export default class SidebarNavigation extends React.Component<
  Record<string, never>,
  SidebarNavigationState
> {
  state: SidebarNavigationState = {
    isCreatingTodoList: false,
  };

  render() {
    const { hash } = window.location;
    const authContext = getAuthContext();
    const { isCreatingTodoList } = this.state;

    let todoLists: ApiTodoList[] = [];
    let isLoadingTodoLists = false;

    // Load TodoLists if we have an authenticated context with account
    if (authContext?.account) {
      const apiClient = getApiClient();
      const todoListsResult = accountTodoListsLoader(
        apiClient,
        authContext.account.id
      );
      todoLists = todoListsResult.data || [];
      isLoadingTodoLists = todoListsResult.isLoading;
    }

    return (
      <VStack
        w="100%"
        h="100%"
        alignItems="stretch"
        justifyContent="space-between"
      >
        {/* Header Section */}
        <VStack alignItems="stretch" gap="4">
          {/* LoginApp Logo */}
          <Box paddingX="16px" paddingY="8px">
            <Logo />
          </Box>

          {/* TodoLists Section */}
          <VStack alignItems="stretch" gap="2">
            {/* Section heading */}
            <Box paddingX="16px" paddingY="4px">
              <MenuHeading>Your todo lists</MenuHeading>
            </Box>

            {/* TodoLists */}
            {todoLists.map((todoList) => (
              <MenuItem
                key={todoList.id}
                href={`/lists/${todoList.id}`}
                startIcon={<CheckCircle />}
                selected={hash.startsWith(`#/lists/${todoList.id}`)}
              >
                {todoList.name}
              </MenuItem>
            ))}

            {/* Loading state */}
            {isLoadingTodoLists && (
              <Box paddingX="16px" paddingY="8px">
                <Text fontSize="sm" color="lighter">
                  Loading TodoLists...
                </Text>
              </Box>
            )}

            {/* Empty state */}
            {!isLoadingTodoLists && todoLists.length === 0 && (
              <Box paddingX="16px" paddingY="8px">
                <Text fontSize="sm" color="lighter">
                  No todolists found. Create one to get started.
                </Text>
              </Box>
            )}

            {/* Create TodoList Button */}
            <Box paddingX="16px" paddingY="8px">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Add />}
                onClick={this._createTodoList}
                loading={isCreatingTodoList}
                style={{ width: "100%" }}
              >
                {t("Create TodoList")}
              </Button>
            </Box>
          </VStack>
        </VStack>

        {/* Separator */}
        <Box paddingX="16px">
          <Separator />
        </Box>

        {/* Menu Links Section */}
        <VStack alignItems="stretch" paddingBottom="16px">
          {/* Section heading */}
          <Box paddingX="16px" paddingY="4px">
            <MenuHeading>Navigation</MenuHeading>
          </Box>

          <MenuItem
            href="/home"
            startIcon={<Home />}
            selected={hash.startsWith("#/home")}
          >
            {t("Home")}
          </MenuItem>
          <MenuItem
            href="/account"
            startIcon={<Settings />}
            selected={hash.startsWith("#/account")}
          >
            {t("Account Settings")}
          </MenuItem>
        </VStack>
      </VStack>
    );
  }

  _createTodoList = async () => {
    const authContext = getAuthContext();
    if (!authContext?.account) return;

    const apiClient = getApiClient();
    const listName = prompt("Enter TodoList name:");

    if (!listName || listName.trim() === "") return;

    this.setState({ isCreatingTodoList: true });

    try {
      await createAccountTodoList(apiClient, authContext.account.id, {
        name: listName.trim(),
        accountId: authContext.account.id,
      });

      // Invalidate the cache to refresh the TodoLists
      apiClient.invalidateCacheResponse(
        `/accounts/${authContext.account.id}/lists`
      );

      // The load listener will automatically trigger a re-render
    } catch (error) {
      console.error("Failed to create TodoList:", error);
      alert("Failed to create TodoList. Please try again.");
    } finally {
      this.setState({ isCreatingTodoList: false });
    }
  };
}
