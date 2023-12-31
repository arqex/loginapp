import React from "react";
import Button from "../../components/Button/Button";
import { logout } from "../../application/auth/auth.service";
import { getAuthenticatedId } from "../../application/auth/auth.selector";
import { apiClient } from "../../application/stores/apiClient";
import { userLoader } from "../../business/user/user.loaders";

interface HomeScreenProps {}
interface HomeScreenState {}

export default class HomeScreen extends React.Component<
  HomeScreenProps,
  HomeScreenState
> {
  state: HomeScreenState = {};
  render() {
    const { data } = userLoader(apiClient, getAuthenticatedId()!);
    console.log("USER", data);
    return (
      <div>
        <h1>Home screen! You are authenticated</h1>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  }
}
