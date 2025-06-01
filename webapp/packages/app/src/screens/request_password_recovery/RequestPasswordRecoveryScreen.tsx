import React from "react";
import { requestPasswordRecovery } from "../../../application/auth/auth.service";
import {
  Button,
  Card,
  FormField,
  HStack,
  Heading,
  Input,
  Link,
  VStack,
} from "@loginapp/ui";
import { ApiError } from "../../../application/api-client";
import LoginScreenLayout from "../../components/LoginScreenLayout/LoginScreenLayout";
import { isValidEmailAddress } from "../../../application/utils/validation.utils";

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
        <Heading size="sm">Password recovery</Heading>
        <FormField error={errors.email} label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this._onSendLink()}
            autoFocus
            autoComplete="on"
          />
        </FormField>
        <Button loading={loading} onClick={this._onSendLink}>
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
        <Heading size="md">Looks good!</Heading>
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
