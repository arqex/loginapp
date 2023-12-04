import React from "react";
import AuthScreenLayout from "../../../components/AuthScreenLayout/AuthScreenLayout";
import { CCard, CCardBody } from "@coreui/react";
import { getAuthRouter } from "../../authRoutes";
import {
  goToAuthenticatedApp,
  loginByOTT,
} from "../../../application/auth/auth.service";
import { isValidEmailAddress } from "../../../application/validation/validation.utils";
import Link from "../../../components/Link/Link";

interface OttLoginScreenProps {}
interface OttLoginScreenState {
  isVerifiying: boolean;
  isSuccess: boolean;
}

export default class OttLoginScreen extends React.Component<
  OttLoginScreenProps,
  OttLoginScreenState
> {
  state: OttLoginScreenState = {
    isVerifiying: this.validateUrlParams(),
    isSuccess: false,
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
    const { isVerifiying, isSuccess } = this.state;
    if (isVerifiying) {
      return (
        <>
          <h4>Verifying...</h4>
        </>
      );
    } else if (isSuccess) {
      return (
        <>
          <h4>Success!</h4>
          <p>Your email has been verified.</p>
          <p>Redirecting...</p>
        </>
      );
    } else {
      return (
        <>
          <h4>Oops!</h4>
          <p>
            Sorry the link you followed is not valid anymore. Try to{" "}
            <Link href="/request_email_login">create a new login link</Link>.
          </p>
        </>
      );
    }
  }

  validateUrlParams() {
    const { ott, email } = getParams();
    return (ott && isValidEmailAddress(email)) || false;
  }

  async componentDidMount() {
    if (this.state.isVerifiying) {
      try {
        const { ott, email } = getParams();
        await loginByOTT(email, ott);
        this.setState({ isVerifiying: false, isSuccess: true });
        goToAuthenticatedApp();
      } catch (err: any) {
        this.setState({ isVerifiying: false, isSuccess: false });
      }
    } else {
      this.setState({ isVerifiying: false, isSuccess: false });
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
    email: typeof query?.email === "string" ? query.email : "",
  };
}
