import React, { useState, useEffect, useCallback } from "react";
import { Heading, toaster } from "@loginapp/ui";
import {
  invalidateUserCache,
  loadUserWithCache,
  updateUserClientData,
} from "@loginapp/api-client";
import { getRouter } from "../../../../application/routing/router";
import { getApiClient } from "../../../../application/stores/apiClient";

const CompletedStep: React.FC<{ userId: string }> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const completeSetup = useCallback(async () => {
    setIsLoading(true);
    try {
      await updateUserClientData(getApiClient(), userId, {});
      invalidateUserCache(getApiClient(), userId);
      await loadUserWithCache(getApiClient(), userId).promise;

      // Redirect after 2 seconds
      setTimeout(() => {
        getRouter().replace("/home");
      }, 2000);
    } catch (error) {
      console.error("Error completing setup:", error);
      toaster.error("Failed to complete setup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    completeSetup();
  }, [completeSetup]);

  return (
    <>
      <Heading size="sm">Setup Complete!</Heading>
      <p>
        {isLoading
          ? "Completing setup..."
          : "Your account has been set up successfully. Redirecting you to the home screen..."}
      </p>
    </>
  );
};

export default CompletedStep;
