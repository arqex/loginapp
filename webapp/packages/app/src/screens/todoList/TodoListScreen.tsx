import React from "react";
import {
  Card,
  Heading,
  VStack,
  HStack,
  Box,
  Text,
  Input,
  Button,
} from "@loginapp/ui";
import withAuth, {
  type WithAuthProps,
} from "../../application/auth/withAuth.hoc";
import { getApiClient } from "../../application/stores/apiClient";
import {
  todoListLoader,
  todoListItemsLoader,
} from "../../application/loaders/todoList.loaders";
import { createTodoItem, invalidateTodoListItems } from "@loginapp/api-client";

import { AuthLayout, ContentLayout } from "../../components/layouts";
import Sidebar from "../../components/Sidebar/Sidebar";
import SpinnerScreen from "../../components/SpinnerScreen/SpinnerScreen";
import TodoListItems from "./TodoListItems";

type TodoListScreenProps = WithAuthProps<void>;

interface TodoListScreenState {
  newItemTitle: string;
  isCreating: boolean;
}

class TodoListScreen extends React.Component<
  TodoListScreenProps,
  TodoListScreenState
> {
  constructor(props: TodoListScreenProps) {
    super(props);
    this.state = {
      newItemTitle: "",
      isCreating: false,
    };
  }

  get todoListId(): string {
    // Extract ID from URL params - assuming URL format is /lists/:id
    const path = window.location.hash.replace("#", "");
    const match = path.match(/^\/lists\/([^/]+)/);
    return match ? match[1] : "";
  }

  handleCreateItem = async () => {
    const { newItemTitle } = this.state;
    if (!newItemTitle.trim()) return;

    this.setState({ isCreating: true });
    try {
      await createTodoItem(getApiClient(), this.todoListId, {
        title: newItemTitle.trim(),
      });
      this.setState({ newItemTitle: "" });
      // Invalidate cache to reload items
      invalidateTodoListItems(getApiClient(), this.todoListId);
    } finally {
      this.setState({ isCreating: false });
    }
  };

  canEditItems = (): boolean => {
    // Always return true to allow testing permissions
    return true;
  };

  render() {
    const { data: todoList } = todoListLoader(getApiClient(), this.todoListId);
    const todoListName = todoList?.name || "Loading...";

    return (
      <AuthLayout appMenu={<Sidebar />}>
        <ContentLayout titleBar={this.renderTitleBar(todoListName)}>
          {this.renderContent()}
        </ContentLayout>
      </AuthLayout>
    );
  }

  renderContent() {
    const { authContext } = this.props;
    const { newItemTitle, isCreating } = this.state;

    // Handle invalid TodoList ID
    if (!this.todoListId) {
      return (
        <Box
          minH="100vh"
          bg="gray.50"
          p="6"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="lg" style={{ color: "#e53e3e" }}>
            Invalid TodoList ID
          </Text>
        </Box>
      );
    }

    const { data: todoList } = todoListLoader(getApiClient(), this.todoListId);
    const { data: todoItems } = todoListItemsLoader(
      getApiClient(),
      this.todoListId
    );

    // Show loading spinner while data is being fetched
    if (!todoList || !todoItems) {
      return (
        <Box
          minH="100vh"
          bg="gray.50"
          p="6"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <SpinnerScreen />
        </Box>
      );
    }

    return (
      <Box minH="100vh" bg="gray.50" p="6">
        <VStack maxW="800px" mx="auto" gap="6" alignItems="stretch">
          {/* Create new item */}
          <Card padding="md">
            <VStack alignItems="stretch" gap="3">
              <Heading size="sm">Add New Item</Heading>
              <HStack gap="3">
                <Input
                  placeholder="Enter todo item title..."
                  value={newItemTitle}
                  onChange={(e) =>
                    this.setState({ newItemTitle: e.target.value })
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      this.handleCreateItem();
                    }
                  }}
                  flex="1"
                />
                <Button
                  onClick={this.handleCreateItem}
                  colorScheme="blue"
                  loading={isCreating}
                  disabled={!newItemTitle.trim()}
                >
                  Add Item
                </Button>
              </HStack>
            </VStack>
          </Card>

          {/* TodoItems List */}
          <TodoListItems
            items={todoItems}
            todoListId={this.todoListId}
            userRole={authContext.role || ""}
          />
        </VStack>
      </Box>
    );
  }

  renderTitleBar(todoListName: string) {
    return (
      <Heading size="md" lineHeight="1em">
        {todoListName}
      </Heading>
    );
  }
}

const TodoListScreenWithAuth = withAuth(TodoListScreen);
export default TodoListScreenWithAuth;
