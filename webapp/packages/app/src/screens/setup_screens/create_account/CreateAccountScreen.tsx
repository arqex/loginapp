import React from "react";
import { getRouter } from "../../../application/routing/router";
import {
  Button,
  Card,
  FormField,
  Heading,
  Input,
  VStack,
  toaster,
} from "@loginapp/ui";
import { type ValidationErrors } from "../../../application/utils/validation.utils";
import UnauthenticatedLayout from "../../../components/UnauthenticatedLayout/UnauthenticatedLayout";
import { getApiClient } from "../../../application/stores/apiClient";
import { createAccount, clearUserAccountsCache } from "@loginapp/api-client";
import { userLoader } from "../../../application/loaders/user.loaders";
import { t } from "../../../application/i18n/i18n.service";
import withAuthId from "../../../application/auth/withAuthId.hoc";

interface CreateAccountScreenProps {
  authenticatedId: string;
}

interface CreateAccountScreenState {
  accountName: string;
  isCreating: boolean;
  errors: ValidationErrors;
}

class CreateAccountScreen extends React.Component<
  CreateAccountScreenProps,
  CreateAccountScreenState
> {
  state: CreateAccountScreenState = {
    accountName: "",
    isCreating: false,
    errors: {},
  };

  componentDidMount() {
    const { authenticatedId } = this.props;

    // Try to load user data to suggest an account name
    try {
      const { data: user } = userLoader(getApiClient(), authenticatedId);
      if (user && user.email) {
        const suggestedName = `${user.email.split("@")[0]}'s Account`;
        this.setState({ accountName: suggestedName });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      // Continue with empty account name
    }
  }

  render() {
    const { accountName, isCreating, errors } = this.state;

    return (
      <UnauthenticatedLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            <Heading size="sm">{t("Create your account")}</Heading>
            <p>
              {t(
                "Welcome! We are going to create an account for you where you can manage your todos."
              )}
            </p>
            <FormField error={errors?.accountName} label={t("Account Name")}>
              <Input
                type="text"
                value={accountName}
                onChange={(e) => this.setState({ accountName: e.target.value })}
                onKeyDown={this._onKeyDown}
                placeholder={t("My Account")}
                autoFocus
                autoComplete="off"
              />
            </FormField>

            <Button onClick={this._onCreateClick} loading={isCreating}>
              Create Account
            </Button>
          </VStack>
        </Card>
      </UnauthenticatedLayout>
    );
  }

  _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this._onCreateClick();
    }
  };

  _onCreateClick = async () => {
    const { accountName } = this.state;
    const { authenticatedId } = this.props;
    const errors = this.getValidationErrors(accountName);

    if (errors) {
      this.setState({ errors });
      return;
    }

    this.setState({ isCreating: true });

    try {
      await createAccount(getApiClient(), accountName.trim());
      toaster.success(t("Account created successfully!"));

      // Clear user accounts cache so the new account appears immediately
      clearUserAccountsCache(getApiClient(), authenticatedId);

      getRouter().replace("/home");
    } catch (error) {
      console.error("Error creating account:", error);
      toaster.error(t("Failed to create account. Please try again."));
      this.setState({ isCreating: false });
    }
  };

  getValidationErrors(accountName: string): ValidationErrors | null {
    const errors: ValidationErrors = {};

    if (!accountName || accountName.trim().length === 0) {
      errors.accountName = t("Account name is required.");
    } else if (accountName.trim().length < 2) {
      errors.accountName = t(
        "Account name must be at least 2 characters long."
      );
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }
}

const CreateAccountScreenWithAuth = withAuthId(CreateAccountScreen);
export default CreateAccountScreenWithAuth;
