import React from "react";
import AuthScreenLayout from "../../../components/AuthScreenLayout/AuthScreenLayout";
import { CCard, CCardBody } from "@coreui/react";
import { getAuthRouter } from "../../authRoutes";
import { isValidEmailAddress } from "../../../application/validation/validation.utils";
import { verifyEmail } from "../../../application/auth/auth.service";

interface VerifyEmailScreenProps {}
interface VerifyEmailScreenState {
  isVerifiying: boolean;
  isSuccess: boolean;
}

export default class VerifyEmailScreen extends React.Component<
  VerifyEmailScreenProps,
  VerifyEmailScreenState
> {
  state: VerifyEmailScreenState = {
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
        <div>
          <h4>Verifying...</h4>
        </div>
      );
    } else if (isSuccess) {
      return (
        <div>
          <h4>Success!</h4>
          <p>Your email has been verified.</p>
          <p>Redirecting...</p>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Ooops!</h4>
          <p>
            Sorry your email address can't be verified. Maybe the link you
            followed is not valid anymore or you are already a verified user.
          </p>
          <p>
            Login and request another verification email if it's not the case.
          </p>
        </div>
      );
    }
  }

  validateUrlParams() {
    const { vc, email } = getParams();
    return (vc && isValidEmailAddress(email)) || false;
  }

  async componentDidMount() {
    console.log("MOUNTED");
    if (this.state.isVerifiying) {
      try {
        const { vc, email } = getParams();
        await verifyEmail(vc, email);
        this.setState({ isVerifiying: false, isSuccess: true });
        setTimeout(() => getAuthRouter()?.push("/"), 3000);
      } catch (err: any) {
        this.setState({ isVerifiying: false, isSuccess: false });
      }
    }
  }

  componentWillUnmount(): void {
    console.log("UNMOUNTED");
  }
}

function getParams() {
  const query = getAuthRouter()?.location.query;
  return {
    vc: typeof query?.vc === "string" ? query.vc : "",
    email: typeof query?.email === "string" ? query.email : "",
  };
}
