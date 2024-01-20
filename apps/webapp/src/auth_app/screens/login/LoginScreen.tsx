import { CCard, CCardBody, CFormInput } from "@coreui/react";
import React from "react";
import Button from "../../../components/Button/Button";
import {
  goToAuthenticatedApp,
  login,
  redirectToOauth,
} from "../../../application/auth/auth.service";
import Link from "../../../components/Link/Link";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import { ApiError } from "@loginapp/api-client";
import { getAuthRouter } from "../../authRoutes";

interface LoginScreenProps {}
interface LoginScreenState {
  email: string;
  password: string;
  loading: boolean;
  errors: { [key: string]: string | undefined };
}

export default class LoginScreen extends React.Component<
  LoginScreenProps,
  LoginScreenState
> {
  state: LoginScreenState = {
    email: "",
    password: "",
    loading: false,
    errors: {},
  };
  inputRef = React.createRef<HTMLInputElement>();
  render() {
    const { email, password, loading, errors } = this.state;
    return (
      <AuthScreenLayout>
        <CCard className="width">
          <CCardBody className="column">
            <h4>Login</h4>
            <div className="mb-3 column">
              <Button onClick={this._startGoogleOauth}>
                Login with Google
              </Button>
            </div>
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
                onKeyDown={(e) => e.key === "Enter" && this._onLoginClick()}
                invalid={!!errors.password}
                ref={this.inputRef}
              />
            </div>
            <Button loading={loading} onClick={this._onLoginClick}>
              Login
            </Button>
            <div className="fs-sm mt-2 text-center">
              <Link href="/request_password_recovery">Forgot password?</Link>
              <span> - </span>
              <Link href="/request_email_login">Login with email link</Link>
            </div>
          </CCardBody>
        </CCard>
        <div className="mt-3">
          <Link href="/signup">Don't have an account? Sign up</Link>
        </div>
      </AuthScreenLayout>
    );
  }

  _onLoginClick = async () => {
    console.log("login", this.state);
    this.setState({ loading: true });
    try {
      await login(this.state.email, this.state.password);
      this.setState({ loading: false });
      goToAuthenticatedApp();
    } catch (err: any) {
      const error = err as ApiError;
      if (error.response?.data?.error === "verification_required") {
        getAuthRouter()?.push(
          "/verify_email?email=" + encodeURIComponent(this.state.email)
        );
      } else if (error.response?.status === 401) {
        console.log("No authorized");
        this.setState({
          errors: { email: "Email or password not valid" },
          loading: false,
        });
        this.inputRef.current?.focus();
      } else {
        console.error(err);
        this.setState({ loading: false });
      }
    }
  };
  _startGoogleOauth = async () => {
    redirectToOauth("google");
  };
}
