import React, { useState } from "react";
import { Heading, Button, Input, FormField, Text } from "@loginapp/ui";
import {
  invalidateUserCache,
  loadUserWithCache,
  updateUser,
  type ApiUser,
} from "@loginapp/api-client";
import { getApiClient } from "../../../application/stores/apiClient";

interface UserNameProps {
  user: ApiUser;
  onGoNext: () => void;
}

const UserName: React.FC<UserNameProps> = ({ user, onGoNext }) => {
  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      await updateUser(getApiClient(), user.id, {
        name: name.trim(),
      });
      invalidateUserCache(getApiClient(), user.id);
      await loadUserWithCache(getApiClient(), user.id).promise;
      onGoNext();
    } catch {
      setError("Failed to save name. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    if (error) {
      setError(undefined);
    }
  };

  return (
    <>
      <Heading size="sm">Welcome! What's your name?</Heading>
      <p>Tell us how do you want the application to call you.</p>
      <FormField error={error} label="Your name:">
        <Input
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Enter your name"
          autoFocus
        />
      </FormField>
      <Button onClick={handleSubmit} loading={loading}>
        Continue
      </Button>
      <Text size="sm" color="lighter" textAlign="center">
        No pressure. You can always update your name later.
      </Text>
    </>
  );
};

export default UserName;
