import React from "react";
import Button from "../../components/Button/Button";
import { logout } from "../../application/auth/auth.service";

interface HomeScreenProps {}
interface HomeScreenState {}

export default class HomeScreen extends React.Component<
  HomeScreenProps,
  HomeScreenState
> {
  state: HomeScreenState = {};
  render() {
    return (
      <div>
        <h1>Home screen! You are authenticated</h1>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  }
}
