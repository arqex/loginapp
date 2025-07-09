import type { ReactRoute } from "./router";
import LoginScreen from "../../screens/auth_screens/login/LoginScreen";
import NotFoundScreen from "../../screens/notFound/NotFoundScreen";
import RequestPasswordRecoveryScreen from "../../screens/auth_screens/request_password_recovery/RequestPasswordRecoveryScreen";
import RequestEmailLoginScreen from "../../screens/auth_screens/request_email_login/RequestEmailLoginScreen";
import SignupScreen from "../../screens/auth_screens/signup/SignupScreen";
import VerifyEmailScreen from "../../screens/auth_screens/verify_email/VerifyEmailScreen";
import OttLoginScreen from "../../screens/auth_screens/ott_login/OttLoginScreen";
import ResetPasswordScreen from "../../screens/auth_screens/reset_password/ResetPasswordScreen";
import SetPasswordScreen from "../../screens/setup_screens/set_password/SetPasswordScreen";
import InitialSetupScreen from "../../screens/setup_screens/initial_setup/InitialSetupScreen";
import CreateAccountScreen from "../../screens/setup_screens/create_account/CreateAccountScreen";
import HomeScreen from "../../screens/home/HomeScreen";
import AccountScreen from "../../screens/account/AccountScreen";
import AccountInvitationsScreen from "../../screens/account_invitations/AccountInvitationsScreen";
import InvitationReplyScreen from "../../screens/setup_screens/invitation_reply/InvitationReplyScreen";

// Delete imports below when cleaning up the test application
import TodoListScreen from "../../screens/todo_screens/todoList/TodoListScreen";

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
  { path: "/home", cb: HomeScreen },
  { path: "/account", cb: AccountScreen },
  { path: "/account/invitations", cb: AccountInvitationsScreen },
  // Delete line below when cleaning up the test application
  { path: "/lists/:id", cb: TodoListScreen },
  { path: "/", cb: LoginScreen },
  { path: "/*", cb: NotFoundScreen }, // Page not found?
];
