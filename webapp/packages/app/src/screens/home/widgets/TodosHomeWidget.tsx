import React from "react";
import { Card, Heading, VStack, HStack, Box, Text, Link } from "@loginapp/ui";
import { getApiClient } from "../../../application/stores/apiClient";
import { accountTodoListsLoader } from "../../../application/loaders/todoList.loaders";
import type { WithAuthProps } from "../../../application/auth/withAuth.hoc";
import SpinnerScreen from "../../../components/SpinnerScreen/SpinnerScreen";

interface TodosHomeWidgetProps {
  authContext: WithAuthProps<void>["authContext"];
}

class TodosHomeWidget extends React.Component<TodosHomeWidgetProps> {
  render() {
    const { authContext } = this.props;

    if (!authContext.account) {
      return null;
    }

    const { data: todoLists, isLoading } = accountTodoListsLoader(
      getApiClient(),
      authContext.account.id
    );

    return (
      <Card padding="md">
        <VStack alignItems="stretch" gap="4">
          <Heading size="sm">Todo Lists</Heading>

          {isLoading ? (
            <Box py="8" display="flex" justifyContent="center">
              <SpinnerScreen />
            </Box>
          ) : (
            <VStack alignItems="stretch" gap="3">
              {todoLists && todoLists.length > 0 ? (
                todoLists.map((todoList) => (
                  <Box
                    key={todoList.id}
                    p="3"
                    borderWidth="1px"
                    borderRadius="md"
                    borderColor="border"
                    bg="white"
                    _hover={{ bg: "bg.muted" }}
                    transition="all 0.2s"
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <VStack alignItems="flex-start" gap="1">
                        <Link href={`#/lists/${todoList.id}`} color="action">
                          <Text fontWeight="semibold">{todoList.name}</Text>
                        </Link>
                        <Text fontSize="sm" color="lighter">
                          Created:{" "}
                          {new Date(todoList.createdAt).toLocaleDateString()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))
              ) : (
                <Box
                  p="6"
                  textAlign="center"
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor="border"
                  borderStyle="dashed"
                >
                  <Text color="lighter" fontSize="sm">
                    No todo lists found. Create your first list to get started!
                  </Text>
                </Box>
              )}
            </VStack>
          )}
        </VStack>
      </Card>
    );
  }
}

export default TodosHomeWidget;
