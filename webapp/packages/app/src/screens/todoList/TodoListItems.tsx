import React from "react";
import {
  Card,
  Heading,
  VStack,
  HStack,
  Box,
  Text,
  Input,
  IconButton,
  Checkbox,
} from "@loginapp/ui";
import { Edit, Delete, Check, Cancel } from "@loginapp/ui/src/icons/svg";
import { getApiClient } from "../../application/stores/apiClient";
import {
  updateTodoItem,
  deleteTodoItem,
  invalidateTodoListItems,
} from "@loginapp/api-client";
import type { ApiTodoItem } from "@loginapp/api-client";

interface TodoListItemsProps {
  items: ApiTodoItem[];
  todoListId: string;
  userRole: string;
}

interface TodoListItemsState {
  editingItemId: string | null;
  editingItemTitle: string;
}

class TodoListItems extends React.Component<
  TodoListItemsProps,
  TodoListItemsState
> {
  constructor(props: TodoListItemsProps) {
    super(props);
    this.state = {
      editingItemId: null,
      editingItemTitle: "",
    };
  }

  handleToggleComplete = async (item: ApiTodoItem) => {
    try {
      await updateTodoItem(getApiClient(), item.id, {
        completed: !item.completed,
      });
      // Invalidate cache to reload items
      invalidateTodoListItems(getApiClient(), this.props.todoListId);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  handleStartEdit = (item: ApiTodoItem) => {
    this.setState({
      editingItemId: item.id,
      editingItemTitle: item.title,
    });
  };

  handleSaveEdit = async () => {
    const { editingItemId, editingItemTitle } = this.state;
    if (!editingItemId || !editingItemTitle.trim()) return;

    try {
      await updateTodoItem(getApiClient(), editingItemId, {
        title: editingItemTitle.trim(),
      });
      this.setState({ editingItemId: null, editingItemTitle: "" });
      // Invalidate cache to reload items
      invalidateTodoListItems(getApiClient(), this.props.todoListId);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  handleCancelEdit = () => {
    this.setState({ editingItemId: null, editingItemTitle: "" });
  };

  handleDeleteItem = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteTodoItem(getApiClient(), itemId);
      // Invalidate cache to reload items
      invalidateTodoListItems(getApiClient(), this.props.todoListId);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  renderTodoItem = (item: ApiTodoItem) => {
    const { editingItemId, editingItemTitle } = this.state;
    const isEditing = editingItemId === item.id;

    if (isEditing) {
      return (
        <Card key={item.id} padding="sm">
          <HStack gap="3" alignItems="center">
            <Input
              value={editingItemTitle}
              onChange={(e) =>
                this.setState({ editingItemTitle: e.target.value })
              }
              flex="1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  this.handleSaveEdit();
                } else if (e.key === "Escape") {
                  this.handleCancelEdit();
                }
              }}
              autoFocus
            />
            <IconButton
              size="sm"
              variant="primary"
              onClick={this.handleSaveEdit}
              aria-label="Save"
            >
              <Check />
            </IconButton>
            <IconButton
              size="sm"
              variant="secondary"
              onClick={this.handleCancelEdit}
              aria-label="Cancel"
            >
              <Cancel />
            </IconButton>
          </HStack>
        </Card>
      );
    }

    return (
      <Card key={item.id} padding="sm">
        <HStack gap="3" alignItems="center">
          <Checkbox
            checked={item.completed}
            onChange={() => this.handleToggleComplete(item)}
          >
            {""}
          </Checkbox>
          <Text
            flex="1"
            textDecoration={item.completed ? "line-through" : "none"}
            color={item.completed ? "lighter" : "inherit"}
          >
            {item.title}
          </Text>
          <IconButton
            size="sm"
            variant="transparent"
            onClick={() => this.handleStartEdit(item)}
            aria-label="Edit"
          >
            <Edit />
          </IconButton>
          <IconButton
            size="sm"
            variant="transparent"
            onClick={() => this.handleDeleteItem(item.id)}
            aria-label="Delete"
          >
            <Delete />
          </IconButton>
        </HStack>
      </Card>
    );
  };

  render() {
    const { items, userRole } = this.props;

    return (
      <Card padding="md">
        <VStack alignItems="stretch" gap="4">
          <HStack justifyContent="space-between" alignItems="center">
            <Heading size="sm">Items ({items.length})</Heading>
            <Text fontSize="sm" color="lighter">
              Role: {userRole}
            </Text>
          </HStack>

          {items.length === 0 ? (
            <Box
              p="8"
              textAlign="center"
              borderWidth="1px"
              borderRadius="md"
              borderStyle="dashed"
              borderColor="gray.300"
              bg="gray.50"
            >
              <Text color="lighter">
                No items yet. Add your first item above!
              </Text>
            </Box>
          ) : (
            <VStack alignItems="stretch" gap="2">
              {items.map((item) => this.renderTodoItem(item))}
            </VStack>
          )}
        </VStack>
      </Card>
    );
  }
}

export default TodoListItems;
