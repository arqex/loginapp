import type { ReactRoute } from "./router";
import LoginScreen from "../../screens/auth/login/LoginScreen";
import NotFoundScreen from "../../screens/notFound/NotFoundScreen";
import RequestPasswordRecoveryScreen from "../../screens/auth/request_password_recovery/RequestPasswordRecoveryScreen";
import RequestEmailLoginScreen from "../../screens/auth/request_email_login/RequestEmailLoginScreen";
import SignupScreen from "../../screens/auth/signup/SignupScreen";
import VerifyEmailScreen from "../../screens/auth/verify_email/VerifyEmailScreen";
import OttLoginScreen from "../../screens/auth/ott_login/OttLoginScreen";
import ResetPasswordScreen from "../../screens/auth/reset_password/ResetPasswordScreen";
import SetPasswordScreen from "../../screens/set_password/SetPasswordScreen";
import InitialSetupScreen from "../../screens/initial_setup/InitialSetupScreen";
import CreateAccountScreen from "../../screens/create_account/CreateAccountScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import TodoListScreen from "../../screens/todo/todoList/TodoListScreen";
import AccountScreen from "../../screens/account/AccountScreen";
import AccountInvitationsScreen from "../../screens/account_invitations/AccountInvitationsScreen";
import InvitationScreen from "../../screens/invitation/InvitationScreen";
import InvitationReplyScreen from "../../screens/invitation_reply/InvitationReplyScreen";

export const routes: ReactRoute[] = [
  { path: "/login", cb: LoginScreen },
  { path: "/request_password_recovery", cb: RequestPasswordRecoveryScreen },
  { path: "/request_email_login", cb: RequestEmailLoginScreen },
  { path: "/signup", cb: SignupScreen },
  { path: "/verify_email", cb: VerifyEmailScreen },
  { path: "/ott_login", cb: OttLoginScreen },
  { path: "/reset_password", cb: ResetPasswordScreen },
  { path: "/set_password", cb: SetPasswordScreen },
  { path: "/initial_setup", cb: InitialSetupScreen },
  { path: "/create_account", cb: CreateAccountScreen },
  { path: "/invitation_reply", cb: InvitationReplyScreen },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { path: "/home", cb: HomeScreen },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { path: "/account", cb: AccountScreen },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { path: "/account/invitations", cb: AccountInvitationsScreen },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { path: "/lists/:id", cb: TodoListScreen },
  { path: "/", cb: LoginScreen },
  { path: "/*", cb: NotFoundScreen }, // Page not found?
];
