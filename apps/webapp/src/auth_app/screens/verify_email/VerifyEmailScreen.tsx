import React from "react";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import { getAuthRouter } from "../../authRoutes";
import { isValidEmailAddress } from "../../../application/validation/validation.utils";
import {
  goToAuthenticatedApp,
  verifyEmail,
} from "../../../application/auth/auth.service";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import ContentCard from "../../../components/ContentLayout/ContentCard";
import { showToast } from "../../../application/toaster/toaster.service";

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
      <AuthScreenLayout>
        <Flex maxW="400px" w="100%" flexDir="column" alignItems="stretch">
          <ContentCard padding="8">
            <VStack alignItems="stretch" spacing="4">
              {isSuccess
                ? this.renderSuccess()
                : isEmailOk
                ? this.renderVerificationForm()
                : this.renderInvalidLink()}
            </VStack>
          </ContentCard>
        </Flex>
      </AuthScreenLayout>
    );
  }

  renderSuccess() {
    return (
      <>
        <Heading size="lg">Success!</Heading>
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
          <Heading size="lg">Success!</Heading>
          <p>Your email has been verified.</p>
          <p>Redirecting...</p>
        </div>
      );
    } else if (!isEmailOk) {
      return (
        <div>
          <Heading size="lg">Oops!</Heading>
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
      <VStack alignItems="stretch" spacing="4">
        <Heading size="lg">Verify your account</Heading>
        <p>
          Please type the verification code we've sent to{" "}
          <b>{getParams().email}</b> in the box below.{" "}
        </p>
        <FormControl isInvalid={!!error}>
          <FormLabel>Verification code:</FormLabel>
          <Input
            type="email"
            value={verificationCode}
            onChange={(e) =>
              this.setState({ verificationCode: e.target.value })
            }
            autoFocus
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
        <Button isLoading={isVerifiying} onClick={this._verifyCode}>
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
      showToast("Your email has been validated successfully.", {
        status: "success",
      });
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
