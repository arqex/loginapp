import React from "react";
import { getRouter } from "../../application/routing/router";
import {
  Button,
  Card,
  FormField,
  Heading,
  Input,
  Link,
  VStack,
  Text,
  toaster,
} from "@loginapp/ui";
import { isValidEmailAddress } from "../../application/utils/validation.utils";
import UnauthenticatedLayout from "../../components/UnauthenticatedLayout/UnauthenticatedLayout";
import { getApiClient } from "../../application/stores/apiClient";
import { verifyEmail } from "@loginapp/api-client";
import { setAuthenticatedId } from "../../application/auth/auth.context";

interface VerifyEmailScreenState {
  isEmailOk: boolean;
  isVerifiying: boolean;
  isSuccess: boolean;
  verificationCode: string;
  error: string | null;
}

export default class VerifyEmailScreen extends React.Component<
  void,
  VerifyEmailScreenState
> {
  state: VerifyEmailScreenState = {
    isEmailOk: this.validateUrlParams(),
    isVerifiying: false,
    isSuccess: false,
    verificationCode: "",
    error: null,
  };
  render() {
    const { isSuccess, isEmailOk } = this.state;
    return (
      <UnauthenticatedLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            {isSuccess
              ? this.renderSuccess()
              : isEmailOk
                ? this.renderVerificationForm()
                : this.renderInvalidLink()}
          </VStack>
        </Card>
      </UnauthenticatedLayout>
    );
  }

  renderSuccess() {
    return (
      <>
        <Heading size="md">Success!</Heading>
        <p>Your email has been verified.</p>
        <p>Redirecting...</p>
      </>
    );
  }

  renderContent() {
    const { isSuccess, isEmailOk } = this.state;
    if (isSuccess) {
      return (
        <div>
          <Heading size="md">Success!</Heading>
          <p>Your email has been verified.</p>
          <p>Redirecting...</p>
        </div>
      );
    } else if (!isEmailOk) {
      return (
        <div>
          <Heading size="md">Oops!</Heading>
          <p>
            Seems that the link you follow is not ok. If you need a new
            verification code just <Link href="/signup">sign up again</Link>.
          </p>
        </div>
      );
    } else {
      return this.renderVerificationForm();
    }
  }

  renderVerificationForm() {
    const { verificationCode, error, isVerifiying } = this.state;
    return (
      <VStack alignItems="stretch" gap="4">
        <Heading size="sm">Verify your account</Heading>
        <Text block mb="4">
          Please type the verification code we've sent to{" "}
          <b>{getParams().email}</b> in the box below.{" "}
        </Text>
        <FormField error={error} label="Verification code">
          <Input
            type="email"
            value={verificationCode}
            onChange={(e) =>
              this.setState({ verificationCode: e.target.value })
            }
            autoFocus
          />
        </FormField>
        <Button loading={isVerifiying} onClick={this._verifyCode}>
          Verify account
        </Button>
      </VStack>
    );
  }

  renderInvalidLink() {
    return (
      <>
        <Heading size="lg">Oops!</Heading>
        <p>
          Seems that the link you follow is not ok. If you need a new
          verification code just <Link href="/signup">sign up again</Link>.
        </p>
      </>
    );
  }

  validateUrlParams() {
    const { email } = getParams();
    return isValidEmailAddress(email) || false;
  }

  _verifyCode = async () => {
    try {
      const { email } = getParams();
      const { verificationCode } = this.state;

      this.setState({ isVerifiying: true, error: null });

      // Verify the email and get the authenticated user ID
      const { data } = await verifyEmail(
        getApiClient(),
        verificationCode,
        email
      );
      const authenticatedId = data.authenticatedId;

      // Set the authenticated user in context
      setAuthenticatedId(authenticatedId);

      this.setState({ isVerifiying: false, isSuccess: true });
      toaster.success("Your email has been validated successfully!");

      // Redirect to home after a short delay - withAuth HOC will handle account creation if needed
      setTimeout(() => {
        getRouter().push("/home");
      }, 2000);
    } catch (error) {
      console.error("Email verification error:", error);
      this.setState({
        isVerifiying: false,
        error: "The verification code is not correct.",
      });
    }
  };
}

function getParams() {
  const query = getRouter()?.location?.query;
  return {
    vc: typeof query?.vc === "string" ? query.vc : "",
    email: typeof query?.email === "string" ? query.email : "",
  };
}
