import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import ScreenLayout from "../../components/ScreenLayout";
import { Button, Text } from "react-native-paper";
import { logout } from "@loginapp/api-client";
import { onLogout } from "../../application/authentication/authentication.service";

import { apiClient } from "../../application/stores/apiClient";

type HomeScreenProps = StackScreenProps<ParamListBase, "HomeScreen">;
interface HomeScreenState {
  isLogginOut: boolean;
}

export default class HomeScreen extends React.Component<
  HomeScreenProps,
  HomeScreenState
> {
  state: HomeScreenState = {};
  render() {
    return (
      <ScreenLayout>
        <Text>Home screen</Text>
        <Button
          mode="contained"
          onPress={this._logout}
          loading={this.state.isLogginOut}
        >
          Logout
        </Button>
      </ScreenLayout>
    );
  }

  _logout = async () => {
    this.setState({ isLogginOut: true });
    logout(apiClient)
      .then(() => {
        onLogout();
      })
      .finally(() => this.setState({ isLogginOut: false }));
  };
}
