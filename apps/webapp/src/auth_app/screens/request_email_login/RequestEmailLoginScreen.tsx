import { CCard, CCardBody, CFormInput } from "@coreui/react";
import React from "react";
import AuthScreenLayout from "../../components/AuthScreenLayout/AuthScreenLayout";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
import { ApiError } from "../../../application/api/ApiError";
import { requestEmailLogin } from "../../../application/auth/auth.service";
import { isValidEmailAddress } from "../../../application/validation/validation.utils";

interface RequestEmailLoginScreenProps {}
interface RequestEmailLoginScreenState {
  email: string;
  loading: boolean;
  errors: { [key: string]: string | undefined };
  isSuccess: boolean;
}

export default class RequestEmailLoginScreen extends React.Component<
  RequestEmailLoginScreenProps,
  RequestEmailLoginScreenState
> {
  state: RequestEmailLoginScreenState = {
    email: "",
    loading: false,
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
        <div className="mt-3">
          <Link href="/signup">Don't have an account? Sign up</Link>
        </div>
      </AuthScreenLayout>
    );
  }

  renderForm() {
    const { email, loading, errors } = this.state;
    return (
      <>
        <h4>Login by email</h4>
        <div className="mb-3">
          <CFormInput
            name="email"
            type="email"
            label="Email:"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this._onSendClick()}
            invalid={!!errors.email}
            feedbackInvalid={errors.email}
            autoComplete="on"
            autoFocus
          />
        </div>
        <Button loading={loading} onClick={this._onSendClick}>
          Send login email
        </Button>
        <div className="fs-sm mt-2 text-center">
          <Link href="/login">Login with password</Link>
        </div>
      </>
    );
  }

  renderSuccess() {
    const { email } = this.state;
    return (
      <>
        <h4>Looks good!</h4>
        <p>
          If {email} has an account, we have sent an email there with a link to
          login. Please check your inbox.
        </p>
      </>
    );
  }

  _onSendClick = async () => {
    const { email } = this.state;
    if (!isValidEmailAddress(email)) {
      return this.setState({ errors: { email: "Email not valid" } });
    }
    this.setState({ loading: true });
    try {
      await requestEmailLogin(email);
      this.setState({ loading: false, isSuccess: true });
    } catch (err: any) {
      const error = err as ApiError;
      if (error.response?.status === 401) {
        console.log("No authorized");
        this.setState({
          errors: { email: "Email or password not valid" },
          loading: false,
        });
      } else {
        this.setState({ loading: false });
      }
    }
  };
}
