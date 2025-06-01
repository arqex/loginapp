import React from "react";
import { logout } from "./application/auth/auth.service";
import { getRouter } from "./application/routing/router";

interface AppProps {}
interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
  state: AppState = {};
  render() {
    const router = getRouter();
    const Screen = router?.location?.matches[0];
    console.log();
    if (!Screen) return <div>404</div>;
    return <Screen />;
  }
  _logout = async () => {
    await logout();
  };
}
