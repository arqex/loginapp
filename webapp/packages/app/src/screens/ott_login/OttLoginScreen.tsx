import React from "react";
import { getRouter } from "../../application/routing/router";
import { Card, Heading, Link, VStack } from "@loginapp/ui";
import UnauthenticatedLayout from "../../components/UnauthenticatedLayout/UnauthenticatedLayout";
import { getApiClient } from "../../application/stores/apiClient";
import { loginByOTT } from "@loginapp/api-client";

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
      <UnauthenticatedLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            {this.renderContent()}
          </VStack>
        </Card>
      </UnauthenticatedLayout>
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
        await loginByOTT(getApiClient(), key, ott);
      } catch (err) {
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
  const query = getRouter()?.location?.query;
  return {
    ott: typeof query?.ott === "string" ? query.ott : "",
    key: typeof query?.key === "string" ? query.key : "",
    source: typeof query?.source === "string" ? query.source : "",
  };
}
