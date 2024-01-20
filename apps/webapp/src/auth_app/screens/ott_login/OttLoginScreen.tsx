import React from "react";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import { CCard, CCardBody } from "@coreui/react";
import { getAuthRouter } from "../../authRoutes";
import {
  goToAuthenticatedApp,
  loginByOTT,
} from "../../../application/auth/auth.service";
import Link from "../../../components/Link/Link";

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
        <CCard style={{ maxWidth: "var(--cui-breakpoint-sm)" }}>
          <CCardBody className="column">{this.renderContent()}</CCardBody>
        </CCard>
      </AuthScreenLayout>
    );
  }

  renderContent() {
    const { isVerifiying } = this.state;
    if (isVerifiying) {
      return (
        <>
          <h4>Verifying...</h4>
        </>
      );
    } else {
      return (
        <>
          <h4>Oops!</h4>
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
  const query = getAuthRouter()?.location.query;
  return {
    ott: typeof query?.ott === "string" ? query.ott : "",
    key: typeof query?.key === "string" ? query.key : "",
    source: typeof query?.source === "string" ? query.source : "",
  };
}
