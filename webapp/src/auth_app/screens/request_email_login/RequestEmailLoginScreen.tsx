import React from "react";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
import { requestEmailLogin } from "../../../application/auth/auth.service";
import { isValidEmailAddress } from "../../../application/validation/validation.utils";
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
import { ApiError } from "@loginapp/api-client";
import ContentCard from "../../../components/ContentLayout/ContentCard";

interface RequestEmailLoginScreenProps {}
interface RequestEmailLoginScreenState {
  email: string;
  loading: boolean;
  errors: { [key: string]: string | undefined };
  isSuccess: boolean;
}

export default class RequestEmailLoginScreen extends React.Component<
  RequestEmailLoginScreenProps,
  RequestEmailLoginScreenState
> {
  state: RequestEmailLoginScreenState = {
    email: "",
    loading: false,
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
    const { email, loading, errors } = this.state;

    return (
      <>
        <Heading size="lg">Password recovery</Heading>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this._onSendClick()}
            autoFocus
            autoComplete="on"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <Button isLoading={loading} onClick={this._onSendClick}>
          Send login email
        </Button>

        <HStack alignItems="center" fontSize="sm" justifyContent="center">
          <Link href="/login">Login with password</Link>
        </HStack>
      </>
    );
  }

  renderSuccess() {
    const { email } = this.state;
    return (
      <>
        <Heading size="lg">Looks good!</Heading>
        <p>
          If {email} has an account, we have sent an email there with a link to
          login. Please check your inbox.
        </p>
      </>
    );
  }

  _onSendClick = async () => {
    const { email } = this.state;
    if (!isValidEmailAddress(email)) {
      return this.setState({ errors: { email: "Email not valid" } });
    }
    this.setState({ loading: true });
    try {
      await requestEmailLogin(email);
      this.setState({ loading: false, isSuccess: true });
    } catch (err: any) {
      const error = err as ApiError;
      if (error.response?.status === 401) {
        console.log("No authorized");
        this.setState({
          errors: { email: "Email or password not valid" },
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    }
  };
}
