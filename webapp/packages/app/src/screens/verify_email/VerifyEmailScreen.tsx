import React from "react";
import { getAuthRouter } from "../../authRoutes";
import {
  goToAuthenticatedApp,
  verifyEmail,
} from "../../../application/auth/auth.service";
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
import LoginScreenLayout from "../../components/LoginScreenLayout/LoginScreenLayout";
import { isValidEmailAddress } from "../../../application/utils/validation.utils";

interface VerifyEmailScreenProps {}
interface VerifyEmailScreenState {
  isEmailOk: boolean;
  isVerifiying: boolean;
  isSuccess: boolean;
  verificationCode: string;
  error: string | null;
}

export default class VerifyEmailScreen extends React.Component<
  VerifyEmailScreenProps,
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
      <LoginScreenLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            {isSuccess
              ? this.renderSuccess()
              : isEmailOk
                ? this.renderVerificationForm()
                : this.renderInvalidLink()}
          </VStack>
        </Card>
      </LoginScreenLayout>
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
      await verifyEmail(verificationCode, email);
      this.setState({ isVerifiying: false, isSuccess: true });
      toaster.success("Your email has been validated successfully.");
      goToAuthenticatedApp();
    } catch (err: any) {
      this.setState({
        isVerifiying: false,
        error: "The verification code is not correct.",
      });
    }
  };
}

function getParams() {
  const query = getAuthRouter()?.location?.query;
  return {
    vc: typeof query?.vc === "string" ? query.vc : "",
    email: typeof query?.email === "string" ? query.email : "",
  };
}
