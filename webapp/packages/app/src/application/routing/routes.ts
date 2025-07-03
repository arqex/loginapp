import type { ReactRoute } from "./router";
import LoginScreen from "../../screens/login/LoginScreen";
import NotFoundScreen from "../../screens/notFound/NotFoundScreen";
import RequestPasswordRecoveryScreen from "../../screens/request_password_recovery/RequestPasswordRecoveryScreen";
import RequestEmailLoginScreen from "../../screens/request_email_login/RequestEmailLoginScreen";
import SignupScreen from "../../screens/signup/SignupScreen";
import VerifyEmailScreen from "../../screens/verify_email/VerifyEmailScreen";
import OttLoginScreen from "../../screens/ott_login/OttLoginScreen";
import ResetPasswordScreen from "../../screens/reset_password/ResetPasswordScreen";
import CreateAccountScreen from "../../screens/create_account/CreateAccountScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import TodoListScreen from "../../screens/todoList/TodoListScreen";
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
  { path: "/create_account", cb: CreateAccountScreen },
  { path: "/invitation_reply", cb: InvitationReplyScreen },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { path: "/home", cb: HomeScreen as any },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { path: "/account", cb: AccountScreen as any },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { path: "/account/invitations", cb: AccountInvitationsScreen as any },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { path: "/invitation/:invitationId", cb: InvitationScreen as any },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { path: "/lists/:id", cb: TodoListScreen as any },
  { path: "/", cb: LoginScreen },
  { path: "/*", cb: NotFoundScreen }, // Page not found?
];
