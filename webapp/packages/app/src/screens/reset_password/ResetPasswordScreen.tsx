import React from "react";
import {
  goToAuthenticatedApp,
  resetPassword,
} from "../../../application/auth/auth.service";
import { getAuthRouter } from "../../authRoutes";
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
import LoginScreenLayout from "../../components/LoginScreenLayout/LoginScreenLayout";
import { isValidEmailAddress } from "../../../application/utils/validation.utils";

interface ResetPasswordScreenProps {}
interface ResetPasswordScreenState {
  areParametersOk: boolean;
  password: string;
  loading: boolean;
  errors: { [key: string]: string | undefined };
}

export default class ResetPasswordScreen extends React.Component<
  ResetPasswordScreenProps,
  ResetPasswordScreenState
> {
  state: ResetPasswordScreenState = {
    areParametersOk: this.validateUrlParams(),
    password: "",
    loading: false,
    errors: {},
  };

  render() {
    const { areParametersOk } = this.state;
    return (
      <LoginScreenLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            {areParametersOk ? this.renderForm() : this.renderInvalidLink()}
          </VStack>
        </Card>
        <Box mt="2" textAlign="center" fontSize="sm">
          <Link href="/login">I don't want to reset my password</Link>
        </Box>
      </LoginScreenLayout>
    );
  }

  renderForm() {
    const { password, loading, errors } = this.state;
    return (
      <>
        <Heading size="sm">Reset your password</Heading>
        <FormField error={errors.password} label="Type a new password">
          <Input
            type="password"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this._onSendClick()}
            autoFocus
          />
        </FormField>
        <Button loading={loading} onClick={this._onSendClick}>
          Set password
        </Button>
      </>
    );
  }

  renderInvalidLink() {
    return (
      <>
        <Heading size="md">Oops!</Heading>
        <p>
          Sorry the link you followed is not valid anymore. Try to{" "}
          <Link href="/request_password_recovery">
            create a new password recovery link
          </Link>
          .
        </p>
      </>
    );
  }

  _onSendClick = async () => {
    const { password } = this.state;
    const { ott, email } = getParams();
    if (!password) {
      return this.setState({
        errors: { password: "Please type a new password" },
      });
    }
    this.setState({ loading: true });
    try {
      await resetPassword(email, password, ott);
      // If password is reset ok, the user is logged in
      toaster.success("Password reset successfully");
      goToAuthenticatedApp();
    } catch (err: any) {
      this.setState({ loading: false, areParametersOk: false });
    }
  };

  validateUrlParams() {
    const { ott, email } = getParams();
    return (ott && isValidEmailAddress(email)) || false;
  }
}

function getParams() {
  const query = getAuthRouter()?.location?.query;
  return {
    ott: typeof query?.ott === "string" ? query.ott : "",
    email: typeof query?.email === "string" ? query.email : "",
  };
}
