import React from "react";
import Button from "../../components/Button/Button";
import { logout } from "../../application/auth/auth.service";
import { userLoader } from "@loginapp/api-cacher";
import { getApiCacher } from "../../application/stores/apiCacher";
import { getAuthenticatedId } from "../../application/auth/auth.selector";

interface HomeScreenProps {}
interface HomeScreenState {}

export default class HomeScreen extends React.Component<
  HomeScreenProps,
  HomeScreenState
> {
  state: HomeScreenState = {};
  render() {
    const { data } = userLoader(getApiCacher(), getAuthenticatedId()!);
    console.log("USER", data);
    return (
      <div>
        <h1>Home screen! You are authenticated</h1>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    );
  }
}
