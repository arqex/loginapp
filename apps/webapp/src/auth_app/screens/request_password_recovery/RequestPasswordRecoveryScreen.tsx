import React from "react";
import { requestPasswordRecovery } from "../../../application/auth/auth.service";
import { isValidEmailAddress } from "../../../application/validation/validation.utils";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
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
import ContentCard from "../../../components/ContentLayout/ContentCard";
import { ApiError } from "@loginapp/api-client";

interface RequestPasswordRecoveryScreenProps {}
interface RequestPasswordRecoveryScreenState {
  email: string;
  loading: boolean;
  errors: { [key: string]: string | undefined };
  isSuccess: boolean;
}

export default class RequestPasswordRecoveryScreen extends React.Component<
  RequestPasswordRecoveryScreenProps,
  RequestPasswordRecoveryScreenState
> {
  state: RequestPasswordRecoveryScreenState = {
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
            onKeyDown={(e) => e.key === "Enter" && this._onSendLink()}
            autoFocus
            autoComplete="on"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <Button isLoading={loading} onClick={this._onSendLink}>
          Send recovery email
        </Button>

        <HStack alignItems="center" fontSize="sm" justifyContent="center">
          <Link href="/login">I already know my password</Link>
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
          If {email} has an account, we have sent an email there with the
          instructions to recover the password. Please check your inbox.
        </p>
      </>
    );
  }

  _onSendLink = async () => {
    const { email } = this.state;
    if (!isValidEmailAddress(email)) {
      return this.setState({ errors: { email: "Email not valid" } });
    }
    this.setState({ loading: true });
    try {
      await requestPasswordRecovery(email);
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
