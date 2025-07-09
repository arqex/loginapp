import React, { useState, useCallback } from "react";
import { Heading, Button, Input, FormField, HStack, Text } from "@loginapp/ui";
import {
  createAccount,
  invalidateAccountCache,
  invalidateUserAccountsCache,
  loadUserAccountsWithCache,
  updateAccount,
  type ApiAccount,
  type ApiUser,
} from "@loginapp/api-client";
import { getApiClient } from "../../../../application/stores/apiClient";

interface AccountNameStepProps {
  user: ApiUser;
  account?: ApiAccount;
  onGoNext: () => void;
}

const AccountNameStep: React.FC<AccountNameStepProps> = ({
  user,
  account,
  onGoNext,
}) => {
  const [accountName, setAccountName] = useState(
    account?.name || generateAccountName(user.name)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = useCallback(async () => {
    if (!accountName.trim()) {
      setError("Please enter an account name");
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      if (account) {
        await updateAccount(getApiClient(), account.id, {
          name: accountName.trim(),
        });
        // Invalidate account cache to refresh data
        invalidateAccountCache(getApiClient(), account.id);
      } else {
        // If no account exists, create a new one
        await createAccount(getApiClient(), accountName.trim());
      }
      invalidateUserAccountsCache(getApiClient(), user.id);
      await loadUserAccountsWithCache(getApiClient(), user.id).promise;
      onGoNext();
    } catch {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [accountName, account, onGoNext, user]);

  const handleAccountNameChange = (newAccountName: string) => {
    setAccountName(newAccountName);
    if (error) {
      setError(undefined);
    }
  };

  return (
    <>
      <Heading size="sm">Your account</Heading>
      <p>
        Nice to meet you {user.name}! Your account is where you work, you might
        invite other colleagues in the future to work in it. Give it a memorable
        name.
      </p>
      <FormField error={error} label="Account name">
        <Input
          value={accountName}
          onChange={(e) => handleAccountNameChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder="Enter your account name"
          autoFocus
        />
      </FormField>
      <Button onClick={handleSubmit} loading={loading}>
        Complete Setup
      </Button>
      <Text size="sm" color="lighter" textAlign="center">
        If you are not sure, you can always update your account name later.
      </Text>
    </>
  );
};

function generateAccountName(userName: string) {
  if (!userName) return "";
  return `${userName}'s Account`;
}

export default AccountNameStep;
