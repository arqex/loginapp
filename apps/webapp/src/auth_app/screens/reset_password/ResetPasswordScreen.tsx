import React from "react";
import {
  goToAuthenticatedApp,
  resetPassword,
} from "../../../application/auth/auth.service";
import { isValidEmailAddress } from "../../../application/validation/validation.utils";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
import { getAuthRouter } from "../../authRoutes";
import { showToast } from "../../../application/toaster/toaster.service";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import ContentCard from "../../../components/ContentLayout/ContentCard";

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
      <AuthScreenLayout>
        <Flex maxW="400px" w="100%" flexDir="column" alignItems="stretch">
          <ContentCard padding="8">
            <VStack alignItems="stretch" spacing="4">
              {areParametersOk ? this.renderForm() : this.renderInvalidLink()}
            </VStack>
          </ContentCard>
        </Flex>
        <Box mt="2" textAlign="center" fontSize="sm">
          <Link href="/login">I don't want to reset my password</Link>
        </Box>
      </AuthScreenLayout>
    );
  }

  renderForm() {
    const { password, loading, errors } = this.state;
    return (
      <>
        <Heading size="lg">Reset your password</Heading>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Type a new password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this._onSendClick()}
            autoFocus
          />
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        </FormControl>
        <Button isLoading={loading} onClick={this._onSendClick}>
          Set password
        </Button>
      </>
    );
  }

  renderInvalidLink() {
    return (
      <>
        <Heading size="lg">Oops!</Heading>
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
      showToast("Your new password has been set.", { status: "success" });
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
