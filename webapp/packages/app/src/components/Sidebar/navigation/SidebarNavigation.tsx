import { MenuItem, Button } from "@loginapp/ui";
import { CheckCircle, Add, Settings } from "@loginapp/ui/src/icons/svg";
import React from "react";
import { getApiClient } from "../../../application/stores/apiClient";
import { getAuthContext } from "../../../application/auth/auth.context";
import { accountTodoListsLoader } from "../../../application/loaders";
import { createAccountTodoList } from "@loginapp/api-client";
import type { ApiTodoList } from "@loginapp/api-client";
import { t } from "../../../application/i18n/i18n.service";

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
      <>
        {/* Account Settings */}
        <MenuItem
          href="/account"
          startIcon={<Settings />}
          selected={hash.startsWith("#/account")}
        >
          {t("Account Settings")}
        </MenuItem>

        {/* TodoLists Section */}
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

        {isLoadingTodoLists && <MenuItem>Loading TodoLists...</MenuItem>}

        {/* Create TodoList Button */}
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Add />}
          onClick={this._createTodoList}
          loading={isCreatingTodoList}
          style={{ margin: "8px 0", width: "100%" }}
        >
          {t("Create TodoList")}
        </Button>
      </>
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
