import React, { useState } from "react";
import { Heading, Button, toaster } from "@loginapp/ui";
import {
  invalidateUserCache,
  loadUserWithCache,
  updateUserClientData,
} from "@loginapp/api-client";
import { getRouter } from "../../../application/routing/router";
import { getApiClient } from "../../../application/stores/apiClient";

const CompletedStep: React.FC<{ userId: string }> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const completeSetup = async () => {
    setIsLoading(true);
    try {
      await updateUserClientData(getApiClient(), userId, {});
      invalidateUserCache(getApiClient(), userId);
      await loadUserWithCache(getApiClient(), userId).promise;
      getRouter().replace("/home");
    } catch (error) {
      console.error("Error completing setup:", error);
      toaster.error("Failed to complete setup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading size="sm">Setup Complete!</Heading>
      <p>
        Your account has been set up successfully. You can now start using the
        application.
      </p>
      <Button onClick={completeSetup} loading={isLoading}>
        Get Started
      </Button>
    </>
  );
};

export default CompletedStep;
