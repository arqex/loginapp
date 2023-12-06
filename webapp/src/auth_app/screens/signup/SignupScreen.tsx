import { CCard, CCardBody, CFormInput } from "@coreui/react";
import React from "react";
import Button from "../../../components/Button/Button";
import {
  goToAuthenticatedApp,
  signup,
} from "../../../application/auth/auth.service";
import { ApiError } from "../../../application/api/ApiError";
import Link from "../../../components/Link/Link";
import AuthScreenLayout from "../../../components/AuthScreenLayout/AuthScreenLayout";

interface SignupScreenProps {}
interface SignupScreenState {
  email: string;
  password: string;
  isSigningUp: boolean;
  errors: { [key: string]: string | undefined };
  isSuccess: boolean;
}

export default class SignupScreen extends React.Component<
  SignupScreenProps,
  SignupScreenState
> {
  state: SignupScreenState = {
    email: "",
    password: "",
    isSigningUp: false,
    errors: {},
    isSuccess: false,
  };
  render() {
    const { isSuccess } = this.state;
    return (
      <AuthScreenLayout>
        <CCard style={{ maxWidth: "var(--cui-breakpoint-sm)" }}>
          <CCardBody className="column">
            {isSuccess ? this.renderSuccess() : this.renderForm()}
          </CCardBody>
        </CCard>
      </AuthScreenLayout>
    );
  }

  renderForm() {
    const { email, password, isSigningUp, errors } = this.state;
    return (
      <>
        <h4>Signup</h4>
        <div className="mb-3">
          <CFormInput
            name="email"
            type="email"
            label="Email:"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            invalid={!!errors.email}
            feedbackInvalid={errors.email}
            autoComplete="on"
            autoFocus
          />
        </div>
        <div className="mb-3">
          <CFormInput
            name="password"
            type="password"
            label="Password:"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this._onSignupClick()}
            invalid={!!errors.password}
          />
        </div>
        <Button loading={isSigningUp} onClick={this._onSignupClick}>
          Signup
        </Button>
        <div className="mt-2 fs-sm text-center">
          <Link href="/login">I already have an account</Link>
        </div>
      </>
    );
  }

  renderSuccess() {
    return (
      <>
        <h4>Check your email</h4>
        <p>
          We sent you an email with a link to confirm your email address. Please
          check your inbox.
        </p>
      </>
    );
  }

  _onSignupClick = async () => {
    this.setState({ isSigningUp: true });
    try {
      const status = await signup(this.state.email, this.state.password);
      if (status === 204) {
        this.setState({ isSigningUp: false, isSuccess: true });
      } else {
        // 201, we are logged in
        goToAuthenticatedApp();
      }
    } catch (err: any) {
      const error = err as ApiError;
      if (error.response?.status === 401) {
        console.log("No authorized");
        this.setState({
          errors: { email: "Email or password not valid" },
          isSigningUp: false,
        });
      } else {
        this.setState({ isSigningUp: false });
      }
    }
  };
}
