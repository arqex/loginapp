import { ReactRoute, UrlhubRoute } from "urlhub";
import { Router } from "../application/routing/router";
import LoginScreen from "./screens/login/LoginScreen";
import SignupScreen from "./screens/signup/SignupScreen";
import VerifyEmailScreen from "./screens/verify_email/VerifyEmailScreen";
import RequestEmailLoginScreen from "./screens/request_email_login/RequestEmailLoginScreen";
import NotFoundScreen from "../screens/notFound/NotFoundScreen";
import OttLoginScreen from "./screens/ott_login/OttLoginScreen";
import RequestPasswordRecoveryScreen from "./screens/request_password_recovery/RequestPasswordRecoveryScreen";
import ResetPasswordScreen from "./screens/reset_password/ResetPasswordScreen";

export const authRoutes: UrlhubRoute<ReactRoute>[] = [
  { path: "/login", cb: LoginScreen },
  { path: "/signup", cb: SignupScreen },
  { path: "/verify_email", cb: VerifyEmailScreen },
  { path: "/request_email_login", cb: RequestEmailLoginScreen },
  { path: "/request_password_recovery", cb: RequestPasswordRecoveryScreen },
  { path: "/ott_login", cb: OttLoginScreen },
  { path: "/reset_password", cb: ResetPasswordScreen },
  { path: "/", cb: LoginScreen },
  { path: "*", cb: NotFoundScreen }, // Page not found?
];

let authRouter: Router | undefined;
export function getAuthRouter() {
  return authRouter;
}
export function setAuthRouter(router: Router) {
  authRouter = router;
}
