import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import ScreenLayout from "../../components/ScreenLayout";
import { Button, Text } from "react-native-paper";
import { logout } from "@loginapp/api-client";
import { onLogout } from "../../application/authentication/authentication.service";

import { apiClient } from "../../application/stores/apiClient";
import { userLoader } from "@loginapp/api-cacher/src/loaders/user.loaders";
import { getApiCacher } from "../../application/stores/apiCacher";
import { getAuthenticatedId } from "../../application/authentication/authentication.accessors";
import { StoreConnected } from "../../components/StoreConnectedScreen";

type HomeScreenProps = StackScreenProps<ParamListBase, "Home">;
interface HomeScreenState {
  isLogginOut: boolean;
}

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  state: HomeScreenState = {
    isLogginOut: false,
  };
  render() {
    const { data: user } = userLoader(getApiCacher(), getAuthenticatedId()!);
    console.log("USER", user);
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

export default StoreConnected<"Home">(HomeScreen);
