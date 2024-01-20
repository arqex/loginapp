import React from "react";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import { CCard, CCardBody, CFormInput } from "@coreui/react";
import { getAuthRouter } from "../../authRoutes";
import { isValidEmailAddress } from "../../../application/validation/validation.utils";
import {
  goToAuthenticatedApp,
  verifyEmail,
} from "../../../application/auth/auth.service";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";

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
    return (
      <AuthScreenLayout>
        <CCard style={{ maxWidth: "var(--cui-breakpoint-sm)" }}>
          <CCardBody className="column">{this.renderContent()}</CCardBody>
        </CCard>
      </AuthScreenLayout>
    );
  }

  renderContent() {
    const { isSuccess, isEmailOk } = this.state;
    if (isSuccess) {
      return (
        <div>
          <h4>Success!</h4>
          <p>Your email has been verified.</p>
          <p>Redirecting...</p>
        </div>
      );
    } else if (!isEmailOk) {
      return (
        <div>
          <h4>Oops!</h4>
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
      <div>
        <h4>Verify your account</h4>
        <p>
          Please type the verification code we've sent to{" "}
          <b>{getParams().email}</b> in the box below.{" "}
        </p>
        <div className="mb-3">
          <CFormInput
            name="vc"
            type="text"
            label="Verification code:"
            value={verificationCode}
            onChange={(e) =>
              this.setState({ verificationCode: e.target.value })
            }
            invalid={!!error}
            feedbackInvalid={error}
            autoFocus
          />
        </div>
        <Button loading={isVerifiying} onClick={this._verifyCode}>
          Verify account
        </Button>
      </div>
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
      setTimeout(goToAuthenticatedApp, 3000);
    } catch (err: any) {
      this.setState({
        isVerifiying: false,
        error: "The verification code is not correct.",
      });
    }
  };
}

function getParams() {
  const query = getAuthRouter()?.location.query;
  return {
    vc: typeof query?.vc === "string" ? query.vc : "",
    email: typeof query?.email === "string" ? query.email : "",
  };
}
