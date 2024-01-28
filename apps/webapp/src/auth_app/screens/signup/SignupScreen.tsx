import React from "react";
import Button from "../../../components/Button/Button";
import {
  goToAuthenticatedApp,
  redirectToOauth,
  signup,
} from "../../../application/auth/auth.service";
import Link from "../../../components/Link/Link";
import { getAuthRouter } from "../../authRoutes";
import { ApiError } from "@loginapp/api-client";
import {
  ValidationErrors,
  isValidEmailAddress,
} from "../../../application/utils/validation.utils";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import ContentCard from "../../../components/ContentLayout/ContentCard";

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
      <AuthScreenLayout>
        <Flex maxW="400px" w="100%" flexDir="column" alignItems="stretch">
          <ContentCard padding="8">
            <VStack alignItems="stretch" spacing="4">
              {isSuccess ? this.renderSuccess() : this.renderForm()}
            </VStack>
          </ContentCard>
        </Flex>
      </AuthScreenLayout>
    );
  }

  renderForm() {
    const { email, password, isSigningUp, errors } = this.state;
    return (
      <>
        <Heading size="lg">Sign up</Heading>
        <Button onClick={this._startGoogleOauth}>Sign up with Google</Button>
        <FormControl isInvalid={!!errors?.email}>
          <FormLabel>Your email:</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            autoFocus
            autoComplete="on"
          />
          <FormErrorMessage>{errors?.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.password}>
          <FormLabel>Choose a password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <FormErrorMessage>{errors?.password}</FormErrorMessage>
        </FormControl>

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
        <h4>Check your email</h4>
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
