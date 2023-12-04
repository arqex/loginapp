import React from "react";
import { getAuthRouter } from "./authRoutes";

interface AuthAppProps {}
interface AuthAppState {}

export default class AuthApp extends React.Component<
  AuthAppProps,
  AuthAppState
> {
  state: AuthAppState = {};
  render() {
    const router = getAuthRouter();
    const Screen = router?.location.matches[0];
    console.log("NON uthenticated app render", router?.location.pathname);
    if (!Screen) return <div>404</div>;
    return <Screen />;
  }
}
