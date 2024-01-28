import React from "react";
import {
  goToAuthenticatedApp,
  login,
  redirectToOauth,
} from "../../../application/auth/auth.service";
import { ApiError } from "@loginapp/api-client";
import { getAuthRouter } from "../../authRoutes";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import ContentCard from "../../../components/ContentLayout/ContentCard";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { isValidEmailAddress } from "../../../application/utils/validation.utils";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";

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
    console.log("rrors", errors);
    return (
      <AuthScreenLayout>
        <Flex maxW="400px" w="100%" flexDir="column" alignItems="stretch">
          <ContentCard padding="8">
            <VStack alignItems="stretch" spacing="4">
              <Heading size="lg">Login</Heading>
              <Button onClick={this._startGoogleOauth}>
                Login with Google
              </Button>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  autoFocus
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Button onClick={this._onLoginClick} isLoading={loading}>
                Log in
              </Button>
              <HStack alignItems="center" fontSize="sm" justifyContent="center">
                <Link href="/request_password_recovery">Forgot password?</Link>
                <span> - </span>
                <Link href="/request_email_login">Login with email link</Link>
              </HStack>
            </VStack>
          </ContentCard>
          <Box mt="2" textAlign="center" fontSize="sm">
            <Link href="/signup">Don't have an account? Sign up</Link>
          </Box>
        </Flex>
      </AuthScreenLayout>
    );
  }

  _onLoginClick = async () => {
    console.log("login", this.state);
    const validationErrors = this.getValidationErrors();
    if (validationErrors) {
      this.setState({ errors: validationErrors });
      return;
    }

    this.setState({ loading: true });
    try {
      await login(this.state.email, this.state.password);
      this.setState({ loading: false });
      goToAuthenticatedApp();
    } catch (err: any) {
      const error = err as ApiError;
      if (error.response?.data?.error === "verification_required") {
        getAuthRouter()?.push(
          "/verify_email?email=" + encodeURIComponent(this.state.email)
        );
      } else if (error.response?.status === 401) {
        console.log("No authorized");
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
