import React from "react";
import { Box, Text, VStack, Button, Heading, Card } from "@loginapp/ui";

export const TodoListNotFound: React.FC = () => {
  return (
    <Box
      minH="100vh"
      bg="gray.50"
      p="6"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card maxWidth={460}>
        <VStack gap="4" textAlign="center">
          <Heading size="sm">TodoList Not Found</Heading>
          <Text fontSize="md">
            The requested TodoList could not be found. It may have been deleted
            or you may not have permission to access it.
          </Text>
          <Button href="/" colorScheme="blue">
            Go to Home
          </Button>
        </VStack>
      </Card>
    </Box>
  );
};

export const InvalidTodoListId: React.FC = () => {
  return (
    <Box
      minH="100vh"
      bg="gray.50"
      p="6"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap="4" textAlign="center">
        <Text fontSize="lg" style={{ color: "#e53e3e" }}>
          Invalid TodoList ID
        </Text>
        <Text fontSize="md">The TodoList ID provided is not valid.</Text>
        <Button href="/" colorScheme="blue">
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};
