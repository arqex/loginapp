import React from "react";
import { getRouter } from "../../application/routing/router";
import { isValidEmailAddress } from "../../application/utils/validation.utils";

import {
  Card,
  Heading,
  VStack,
  HStack,
  Box,
  Input,
  FormField,
  Button,
  Link,
} from "@loginapp/ui";
import UnauthenticatedLayout from "../../components/UnauthenticatedLayout/UnauthenticatedLayout";
import { login, type ApiError } from "@loginapp/api-client";
import { redirectToOauth } from "../../application/auth/auth.service";
import { getApiClient } from "../../application/stores/apiClient";
import { setAuthenticatedId } from "../../application/auth/auth.context";

interface LoginScreenProps {}
interface LoginScreenState {
  email: string;
  password: string;
  loading: boolean;
  errors: { [key: string]: string | undefined };
}

export default class LoginScreen extends React.Component<
  LoginScreenProps,
  LoginScreenState
> {
  state: LoginScreenState = {
    email: "",
    password: "",
    loading: false,
    errors: {},
  };
  inputRef = React.createRef<HTMLInputElement>();
  render() {
    const { email, password, loading, errors } = this.state;
    return (
      <UnauthenticatedLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            <Heading size="sm">Login</Heading>
            <Button onClick={this._startGoogleOauth}>Login with Google</Button>
            <FormField error={errors.email} label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
                autoFocus
              />
            </FormField>
            <FormField error={errors.password} label="Password">
              <Input
                type="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </FormField>
            <Button onClick={this._onLoginClick} loading={loading}>
              Log in
            </Button>
            <HStack alignItems="center" fontSize="sm" justifyContent="center">
              <Link href="/request_password_recovery">Forgot password?</Link>
              <span> - </span>
              <Link href="/request_email_login">Login with email link</Link>
            </HStack>
          </VStack>
        </Card>
        <Box mt="2" textAlign="center" fontSize="sm">
          <Link href="/signup">Don't have an account? Sign up</Link>
        </Box>
      </UnauthenticatedLayout>
    );
  }

  _onLoginClick = async () => {
    const validationErrors = this.getValidationErrors();
    if (validationErrors) {
      this.setState({ errors: validationErrors });
      return;
    }

    this.setState({ loading: true });
    const { email, password } = this.state;
    try {
      const { data } = await login(getApiClient(), email, password);
      setAuthenticatedId(data.authenticatedId);
      getRouter().push("/home");
      this.setState({ loading: false });
    } catch (err) {
      const error = err as ApiError;
      if (error.response?.data?.error === "verification_required") {
        getRouter().push(
          "/verify_email?email=" + encodeURIComponent(this.state.email)
        );
      } else if (error.response?.status === 401) {
        this.setState({
          errors: { email: "Email or password not valid" },
          loading: false,
        });
        this.inputRef.current?.focus();
      } else {
        console.error(err);
        this.setState({ loading: false });
      }
    }
  };

  _startGoogleOauth = async () => {
    redirectToOauth("google");
  };

  getValidationErrors() {
    const { email, password } = this.state;
    if (!email) {
      return { email: "Email is required" };
    }
    if (!password) {
      return { password: "Password is required" };
    }
    if (!isValidEmailAddress(email)) {
      return { email: "Email is not valid" };
    }
  }
}
