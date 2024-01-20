import { CCard, CCardBody, CFormInput } from "@coreui/react";
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
import { getRouter } from "../../../application/routing/router";
import { showToast } from "../../../application/toaster/toaster.service";

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
        <CCard>
          <CCardBody className="column">
            {areParametersOk ? this.renderForm() : this.renderInvalidLink()}
          </CCardBody>
        </CCard>
        <div className="mt-3">
          <Link href="/login">I don't want to reset my password</Link>
        </div>
      </AuthScreenLayout>
    );
  }

  renderForm() {
    const { password, loading, errors } = this.state;
    return (
      <>
        <h4>Reset your password</h4>
        <div className="mb-3">
          <CFormInput
            name="password"
            type="password"
            label="Type a new password:"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this._onSendClick()}
            invalid={!!errors.password}
            feedbackInvalid={errors.password}
            autoFocus
          />
        </div>
        <Button loading={loading} onClick={this._onSendClick}>
          Set password
        </Button>
      </>
    );
  }

  renderInvalidLink() {
    return (
      <>
        <h4>Oops!</h4>
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
      showToast({ content: "Your new password has been set. Redirecting" });
      setTimeout(() => {
        goToAuthenticatedApp();
      }, 2000);
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
  const query = getAuthRouter()?.location.query;
  return {
    ott: typeof query?.ott === "string" ? query.ott : "",
    email: typeof query?.email === "string" ? query.email : "",
  };
}
