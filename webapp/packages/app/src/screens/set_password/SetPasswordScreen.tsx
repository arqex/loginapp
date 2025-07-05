import React from "react";
import { getRouter } from "../../application/routing/router";
import {
  Box,
  Button,
  Card,
  FormField,
  Heading,
  Input,
  Link,
  toaster,
  VStack,
} from "@loginapp/ui";
import UnauthenticatedLayout from "../../components/UnauthenticatedLayout/UnauthenticatedLayout";
import { getApiClient } from "../../application/stores/apiClient";
import { setPassword, invalidateUserCache } from "@loginapp/api-client";
import { setAuthenticatedId } from "../../application/auth/auth.context";
import type { ApiError } from "@loginapp/api-client";
import withAuth, {
  type WithAuthProps,
} from "../../application/auth/withAuth.hoc";
import SpinnerScreen from "../../components/SpinnerScreen/SpinnerScreen";

type SetPasswordScreenProps = WithAuthProps<void>;
interface SetPasswordScreenState {
  password: string;
  loading: boolean;
  errors: { [key: string]: string | undefined };
}

class SetPasswordScreen extends React.Component<
  SetPasswordScreenProps,
  SetPasswordScreenState
> {
  state: SetPasswordScreenState = {
    password: "",
    loading: false,
    errors: {},
  };

  render() {
    const { authContext } = this.props;
    const { password, loading, errors } = this.state;

    if (!authContext.user.signals.missingAuth) {
      return <SpinnerScreen />;
    }

    return (
      <UnauthenticatedLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            <Heading size="sm">Set Your Password</Heading>
            <p>First, let's set a password so you can log in and out freely.</p>
            <FormField error={errors.password} label="Your Password">
              <Input
                type="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                onKeyDown={(e) =>
                  e.key === "Enter" && this._onSetPasswordClick()
                }
                autoFocus
              />
            </FormField>
            <Button onClick={this._onSetPasswordClick} loading={loading}>
              Set Password
            </Button>
          </VStack>
        </Card>
        <Box mt="2" textAlign="center" fontSize="sm">
          <Link href="/login">Back to Login</Link>
        </Box>
      </UnauthenticatedLayout>
    );
  }

  _onSetPasswordClick = async () => {
    const validationErrors = this.getValidationErrors();
    if (validationErrors) {
      this.setState({ errors: validationErrors });
      return;
    }

    this.setState({ loading: true });
    const { password } = this.state;

    try {
      const { data } = await setPassword(getApiClient(), password);
      setAuthenticatedId(data.authenticatedId);

      // Invalidate user cache so the next screen can load fresh user data
      invalidateUserCache(getApiClient(), data.authenticatedId);

      toaster.success("Password set successfully!");
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error setting password:", apiError);

      if (apiError.response?.status === 400) {
        this.setState({
          errors: {
            password:
              "There was an error setting your password. Please try again.",
          },
          loading: false,
        });
      } else {
        this.setState({
          errors: {
            password: "An unexpected error occurred. Please try again.",
          },
          loading: false,
        });
      }
    }
  };

  getValidationErrors() {
    const { password } = this.state;
    const errors: { [key: string]: string | undefined } = {};

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  checkPasswordSet() {
    const { authContext } = this.props;
    if (!authContext.user.signals.missingAuth) {
      getRouter().replace("/home");
    }
  }

  componentDidUpdate() {
    this.checkPasswordSet();
  }

  componentDidMount(): void {
    this.checkPasswordSet();
  }
}

const SetPasswordScreenWithAuth = withAuth(SetPasswordScreen, {
  skipIntercept: true,
});
export default SetPasswordScreenWithAuth;
