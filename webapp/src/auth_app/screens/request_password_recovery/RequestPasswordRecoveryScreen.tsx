import { CCard, CCardBody, CFormInput } from "@coreui/react";
import React from "react";
import { ApiError } from "../../../application/api/ApiError";
import { requestPasswordRecovery } from "../../../application/auth/auth.service";
import { isValidEmailAddress } from "../../../application/validation/validation.utils";
import AuthScreenLayout from "../../../components/AuthScreenLayout/AuthScreenLayout";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";

interface RequestPasswordRecoveryScreenProps {}
interface RequestPasswordRecoveryScreenState {
  email: string;
  loading: boolean;
  errors: { [key: string]: string | undefined };
  isSuccess: boolean;
}

export default class RequestPasswordRecoveryScreen extends React.Component<
  RequestPasswordRecoveryScreenProps,
  RequestPasswordRecoveryScreenState
> {
  state: RequestPasswordRecoveryScreenState = {
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
          <Link href="/login">I already know my password</Link>
        </div>
      </AuthScreenLayout>
    );
  }

  renderForm() {
    const { email, loading, errors } = this.state;
    return (
      <>
        <h4>Password recovery</h4>
        <div className="mb-3">
          <CFormInput
            name="email"
            type="email"
            label="Email:"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && this._onSendLink()}
            invalid={!!errors.email}
            feedbackInvalid={errors.email}
            autoComplete="on"
            autoFocus
          />
        </div>
        <Button loading={loading} onClick={this._onSendLink}>
          Send recovery email
        </Button>
      </>
    );
  }

  renderSuccess() {
    const { email } = this.state;
    return (
      <>
        <h4>Looks good!</h4>
        <p>
          If {email} has an account, we have sent an email there with the
          instructions to recover the password. Please check your inbox.
        </p>
      </>
    );
  }

  _onSendLink = async () => {
    const { email } = this.state;
    if (!isValidEmailAddress(email)) {
      return this.setState({ errors: { email: "Email not valid" } });
    }
    this.setState({ loading: true });
    try {
      await requestPasswordRecovery(email);
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
