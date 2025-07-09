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
  Modal,
  IconButton,
} from "@loginapp/ui";
import { Edit, Delete } from "@loginapp/ui/icons";
import withAuth, {
  type WithAuthProps,
} from "../../../application/auth/withAuth.hoc";
import { getApiClient } from "../../../application/stores/apiClient";
import {
  todoListLoader,
  todoListItemsLoader,
} from "../../../application/loaders/todoList.loaders";
import {
  createTodoItem,
  invalidateTodoListItems,
  updateTodoList,
  deleteTodoList,
  invalidateTodoList,
  withErrors,
  ApiError,
} from "@loginapp/api-client";
import { getRouter } from "../../../application/routing/router";

import { AuthLayout, ContentLayout } from "../../../components/layouts";
import Sidebar from "../../../components/Sidebar/Sidebar";
import SpinnerScreen from "../../../components/SpinnerScreen/SpinnerScreen";
import TodoListItems from "./TodoListItems";
import { TodoListNotFound, InvalidTodoListId } from "./TodoListErrorComponents";

type TodoListScreenProps = WithAuthProps<void>;

interface TodoListScreenState {
  newItemTitle: string;
  isCreating: boolean;
  isEditModalOpen: boolean;
  editingName: string;
  isUpdating: boolean;
  isDeleteModalOpen: boolean;
  isDeleting: boolean;
}

class TodoListScreen extends React.Component<
  TodoListScreenProps,
  TodoListScreenState
> {
  private inputRef = React.createRef<HTMLInputElement>();

  constructor(props: TodoListScreenProps) {
    super(props);
    this.state = {
      newItemTitle: "",
      isCreating: false,
      isEditModalOpen: false,
      editingName: "",
      isUpdating: false,
      isDeleteModalOpen: false,
      isDeleting: false,
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
      // Focus the input field after successful creation
      setTimeout(() => {
        if (this.inputRef.current) {
          this.inputRef.current.focus();
        }
      }, 0);
    } finally {
      this.setState({ isCreating: false });
    }
  };

  handleOpenEditModal = () => {
    // Get the current todoList data from the loader with error handling
    const todoListResult = withErrors(todoListLoader)(
      getApiClient(),
      this.todoListId
    );
    const todoListName = todoListResult.data?.name || "";

    this.setState({
      isEditModalOpen: true,
      editingName: todoListName,
    });
  };

  handleCloseEditModal = () => {
    this.setState({ isEditModalOpen: false, editingName: "" });
  };

  handleUpdateTodoList = async () => {
    const { editingName } = this.state;
    if (!editingName.trim()) return;

    this.setState({ isUpdating: true });
    try {
      await updateTodoList(getApiClient(), this.todoListId, {
        name: editingName.trim(),
      });
      // Invalidate cache to reload todolist
      invalidateTodoList(getApiClient(), this.todoListId);
      this.handleCloseEditModal();
    } catch (error) {
      this.setState({ isUpdating: false });
      // Re-throw to let the global error handler display the permission modal
      throw error;
    }
  };

  handleOpenDeleteModal = () => {
    this.setState({ isDeleteModalOpen: true });
  };

  handleCloseDeleteModal = () => {
    this.setState({ isDeleteModalOpen: false });
  };

  handleDeleteTodoList = async () => {
    this.setState({ isDeleting: true });
    try {
      await deleteTodoList(getApiClient(), this.todoListId);
      // Navigate to home after successful deletion
      getRouter().push("/");
    } catch (error) {
      this.setState({ isDeleting: false });
      // Re-throw to let the global error handler display the permission modal
      throw error;
    }
  };

  canEditItems = (): boolean => {
    // Always return true to allow testing permissions
    return true;
  };

  render() {
    // Use the error-handling loader to catch potential errors
    const todoListResult = withErrors(todoListLoader)(
      getApiClient(),
      this.todoListId
    );

    // Handle loading state
    if (todoListResult.isLoading) {
      const todoListName = "Loading...";
      return (
        <AuthLayout appMenu={<Sidebar />}>
          <ContentLayout titleBar={this.renderTitleBar(todoListName)}>
            {this.renderContent()}
            {this.renderEditModal()}
            {this.renderDeleteModal()}
          </ContentLayout>
        </AuthLayout>
      );
    }

    // Handle error state
    if (todoListResult.error) {
      const error = todoListResult.error;

      // Check if it's an API error with not_found
      if (
        error instanceof ApiError &&
        error.response?.data?.error === "not_found"
      ) {
        return (
          <AuthLayout appMenu={<Sidebar />}>
            <ContentLayout>
              <TodoListNotFound />
            </ContentLayout>
          </AuthLayout>
        );
      } else {
        // Re-throw other errors to let the global error handler display the permission modal
        throw error;
      }
    }

    const todoListName = todoListResult.data?.name || "Unknown TodoList";

    return (
      <AuthLayout appMenu={<Sidebar />}>
        <ContentLayout titleBar={this.renderTitleBar(todoListName)}>
          {this.renderContent()}
          {this.renderEditModal()}
          {this.renderDeleteModal()}
        </ContentLayout>
      </AuthLayout>
    );
  }

  renderContent() {
    const { authContext } = this.props;
    const { newItemTitle, isCreating } = this.state;

    // Handle invalid TodoList ID
    if (!this.todoListId) {
      return <InvalidTodoListId />;
    }

    const todoListResult = withErrors(todoListLoader)(
      getApiClient(),
      this.todoListId
    );
    const { data: todoItems } = todoListItemsLoader(
      getApiClient(),
      this.todoListId
    );

    // Handle errors from todoList loading
    if (todoListResult.error) {
      const error = todoListResult.error;
      // Re-throw to let the main render method handle it
      throw error;
    }

    // Show loading spinner while data is being fetched
    if (!todoListResult.data || !todoItems) {
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
                  innerRef={this.inputRef as React.RefObject<HTMLInputElement>}
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
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="md" lineHeight="1em">
          {todoListName}
        </Heading>
        <HStack gap="2">
          <IconButton
            size="sm"
            variant="secondary"
            onClick={this.handleOpenEditModal}
            aria-label="Edit todolist name"
          >
            <Edit />
          </IconButton>
          <IconButton
            size="sm"
            variant="secondary"
            onClick={this.handleOpenDeleteModal}
            aria-label="Delete todolist"
          >
            <Delete />
          </IconButton>
        </HStack>
      </HStack>
    );
  }

  renderEditModal() {
    const { isEditModalOpen, editingName, isUpdating } = this.state;

    return (
      <Modal open={isEditModalOpen} onClose={this.handleCloseEditModal}>
        <VStack gap="4" alignItems="stretch">
          <Heading size="sm">Edit TodoList Name</Heading>
          <Input
            placeholder="Enter new name..."
            value={editingName}
            onChange={(e) => this.setState({ editingName: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.handleUpdateTodoList();
              }
            }}
          />
          <HStack gap="3" justifyContent="flex-end">
            <Button
              variant="secondary"
              onClick={this.handleCloseEditModal}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleUpdateTodoList}
              loading={isUpdating}
              disabled={!editingName.trim()}
            >
              Update
            </Button>
          </HStack>
        </VStack>
      </Modal>
    );
  }

  renderDeleteModal() {
    const { isDeleteModalOpen, isDeleting } = this.state;
    // Get the current todoList data from the loader with error handling
    const todoListResult = withErrors(todoListLoader)(
      getApiClient(),
      this.todoListId
    );
    const todoListName = todoListResult.data?.name || "Unknown TodoList";

    return (
      <Modal open={isDeleteModalOpen} onClose={this.handleCloseDeleteModal}>
        <VStack gap="4" alignItems="stretch">
          <Heading size="sm">Delete TodoList</Heading>
          <Text>
            Are you sure you want to delete "{todoListName}"? This action cannot
            be undone.
          </Text>
          <HStack gap="3" justifyContent="flex-end">
            <Button
              variant="secondary"
              onClick={this.handleCloseDeleteModal}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleDeleteTodoList}
              loading={isDeleting}
              variant="primary"
              style={{ backgroundColor: "#e53e3e", color: "white" }}
            >
              Delete
            </Button>
          </HStack>
        </VStack>
      </Modal>
    );
  }
}

const TodoListScreenWithAuth = withAuth(TodoListScreen);
export default TodoListScreenWithAuth;
