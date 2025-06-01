import React from "react";
import { requestEmailLogin } from "../../../application/auth/auth.service";
import { ApiError } from "../../../application/api-client";
import {
  Button,
  Card,
  FormField,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
} from "@loginapp/ui";
import LoginScreenLayout from "../../components/LoginScreenLayout/LoginScreenLayout";
import { isValidEmailAddress } from "../../../application/utils/validation.utils";

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
    const { email, loading, errors } = this.state;

    return (
      <>
        <Heading size="sm">Login by email</Heading>
        <FormField error={errors.email} label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this._onSendClick()}
            autoFocus
            autoComplete="on"
          />
        </FormField>
        <Button loading={loading} onClick={this._onSendClick}>
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
        <Heading size="md">Looks good!</Heading>
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
