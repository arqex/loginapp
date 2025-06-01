import { ReactRoute, Router } from "../application/routing/router";
import LoginScreen from "./screens/login/LoginScreen";
import NotFoundScreen from "../screens/notFound/NotFoundScreen";
import RequestPasswordRecoveryScreen from "./screens/request_password_recovery/RequestPasswordRecoveryScreen";
import RequestEmailLoginScreen from "./screens/request_email_login/RequestEmailLoginScreen";
import SignupScreen from "./screens/signup/SignupScreen";
import VerifyEmailScreen from "./screens/verify_email/VerifyEmailScreen";
import OttLoginScreen from "./screens/ott_login/OttLoginScreen";
import ResetPasswordScreen from "./screens/reset_password/ResetPasswordScreen";

export const authRoutes: ReactRoute[] = [
  { path: "/login", cb: LoginScreen },
  { path: "/request_password_recovery", cb: RequestPasswordRecoveryScreen },
  { path: "/request_email_login", cb: RequestEmailLoginScreen },
  { path: "/signup", cb: SignupScreen },
  { path: "/verify_email", cb: VerifyEmailScreen },
  { path: "/ott_login", cb: OttLoginScreen },
  { path: "/reset_password", cb: ResetPasswordScreen },
  { path: "/", cb: LoginScreen },
  { path: "/*", cb: NotFoundScreen }, // Page not found?
];

let authRouter: Router | undefined;
export function getAuthRouter() {
  return authRouter;
}
export function setAuthRouter(router: Router) {
  authRouter = router;
}
