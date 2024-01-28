import React from "react";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import { getAuthRouter } from "../../authRoutes";
import {
  goToAuthenticatedApp,
  loginByOTT,
} from "../../../application/auth/auth.service";
import Link from "../../../components/Link/Link";
import { Flex, VStack, Heading } from "@chakra-ui/react";
import ContentCard from "../../../components/ContentLayout/ContentCard";

interface OttLoginScreenProps {}
interface OttLoginScreenState {
  isVerifiying: boolean;
}

export default class OttLoginScreen extends React.Component<
  OttLoginScreenProps,
  OttLoginScreenState
> {
  state: OttLoginScreenState = {
    isVerifiying: this.validateUrlParams(),
  };
  render() {
    return (
      <AuthScreenLayout>
        <Flex maxW="400px" w="100%" flexDir="column" alignItems="stretch">
          <ContentCard padding="8">
            <VStack alignItems="stretch" spacing="4">
              {this.renderContent()}
            </VStack>
          </ContentCard>
        </Flex>
      </AuthScreenLayout>
    );
  }

  renderContent() {
    const { isVerifiying } = this.state;
    if (isVerifiying) {
      return (
        <>
          <Heading size="lg">Verifying...</Heading>
        </>
      );
    } else {
      return (
        <>
          <Heading size="lg">Oops!</Heading>
          <p>
            Sorry the link you followed is not valid anymore.{" "}
            {this.renderExtraInstructions()}
          </p>
        </>
      );
    }
  }

  renderExtraInstructions() {
    const { source } = getParams();
    switch (source) {
      case "email":
        return (
          <>
            Try to{" "}
            <Link href="/request_email_login">create a new login link</Link>.
          </>
        );
      case "oauth":
        return (
          <>
            <Link href="/login">Try to login again</Link>.
          </>
        );
      default:
        return null;
    }
  }

  validateUrlParams() {
    const { ott, key } = getParams();
    return !!(ott && key);
  }

  async componentDidMount() {
    if (this.state.isVerifiying) {
      try {
        const { ott, key } = getParams();
        await loginByOTT(key, ott);
        goToAuthenticatedApp();
      } catch (err: any) {
        this.setState({ isVerifiying: false });
      }
    } else {
      this.setState({ isVerifiying: false });
    }
  }

  componentWillUnmount(): void {
    console.log("UNMOUNTED");
  }
}

function getParams() {
  const query = getAuthRouter()?.location?.query;
  return {
    ott: typeof query?.ott === "string" ? query.ott : "",
    key: typeof query?.key === "string" ? query.key : "",
    source: typeof query?.source === "string" ? query.source : "",
  };
}
