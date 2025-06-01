import React from "react";
import {
  goToAuthenticatedApp,
  redirectToOauth,
  signup,
} from "../../../application/auth/auth.service";
import { getAuthRouter } from "../../authRoutes";
import {
  ValidationErrors,
  isValidEmailAddress,
} from "../../../application/utils/validation.utils";
import { ApiError } from "../../../application/api-client";
import LoginScreenLayout from "../../components/LoginScreenLayout/LoginScreenLayout";
import {
  FormField,
  Card,
  VStack,
  Heading,
  Input,
  HStack,
  Button,
  Link,
} from "@loginapp/ui";

interface SignupScreenProps {}
interface SignupScreenState {
  email: string;
  password: string;
  isSigningUp: boolean;
  errors: ValidationErrors;
  isSuccess: boolean;
}

export default class SignupScreen extends React.Component<
  SignupScreenProps,
  SignupScreenState
> {
  state: SignupScreenState = {
    email: "",
    password: "",
    isSigningUp: false,
    errors: {},
    isSuccess: false,
  };
  render() {
    const { isSuccess } = this.state;
    return (
      <LoginScreenLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            {isSuccess ? this.renderSuccess() : this.renderForm()}
          </VStack>
        </Card>
      </LoginScreenLayout>
    );
  }

  renderForm() {
    const { email, password, isSigningUp, errors } = this.state;
    return (
      <>
        <Heading size="sm">Sign up</Heading>
        <Button onClick={this._startGoogleOauth}>Sign up with Google</Button>
        <FormField error={errors?.email} label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            autoFocus
            autoComplete="on"
          />
        </FormField>
        <FormField error={errors?.password} label="Choose a password">
          <Input
            type="password"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </FormField>

        <Button onClick={this._onSignupClick} isLoading={isSigningUp}>
          Sign up
        </Button>
        <HStack alignItems="center" fontSize="sm" justifyContent="center">
          <Link href="/login">I already have an account</Link>
        </HStack>
      </>
    );
  }

  renderSuccess() {
    return (
      <>
        <Heading size="md">Check your email</Heading>
        <p>
          We sent you an email with a link to confirm your email address. Please
          check your inbox.
        </p>
      </>
    );
  }

  _onSignupClick = async () => {
    this.setState({ isSigningUp: true });
    const { email, password } = this.state;
    const errors = this.getValidationErrors(email, password);

    if (errors) {
      return this.setState({ errors });
    }

    try {
      const status = await signup(this.state.email, this.state.password);
      if (status === 204) {
        getAuthRouter()?.push(
          "/verify_email?email=" + encodeURIComponent(this.state.email)
        );
      } else {
        // 201, we are logged in
        goToAuthenticatedApp();
      }
    } catch (err: any) {
      const error = err as ApiError;
      if (error.response?.status === 401) {
        console.log("No authorized");
        this.setState({
          errors: { email: "Email or password not valid" },
          isSigningUp: false,
        });
      } else {
        this.setState({ isSigningUp: false });
      }
    }
  };

  _startGoogleOauth = async () => {
    redirectToOauth("google");
  };

  getValidationErrors(email: string, password: string) {
    const errors: ValidationErrors = {};
    if (!isValidEmailAddress(email)) {
      errors.email = "The email address is not valid.";
    }
    if (!password) {
      errors.password = "Need to type a password.";
    }

    if (Object.keys(errors).length > 0) return errors;
  }
}
