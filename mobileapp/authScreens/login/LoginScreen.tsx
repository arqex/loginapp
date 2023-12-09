import React from "react";
import ScreenLayout from "../../components/ScreenLayout";
import { Button, Text } from "react-native-paper";
import Column from "../../components/Column";
import { ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

type LoginScreenProps = StackScreenProps<ParamListBase, "LogIn">;
interface LoginScreenState {}

export default class LoginScreen extends React.Component<
  LoginScreenProps,
  LoginScreenState
> {
  state: LoginScreenState = {};
  render() {
    return (
      <ScreenLayout>
        <Column gap={10} style={{ minWidth: 260 }}>
          <Button mode="contained" icon="google">
            Log in with Google
          </Button>
          <Button mode="contained" icon="at" onPress={this._goToEmailLogin}>
            Log in with Email
          </Button>
          <Button onPress={this._goToSignup}>
            Don't have an account?{" "}
            <Text style={{ textDecorationLine: "underline", color: "inherit" }}>
              Sign up
            </Text>
          </Button>
        </Column>
      </ScreenLayout>
    );
  }

  _goToSignup = () => {
    this.props.navigation.navigate("SignUp");
  };

  _goToEmailLogin = () => {
    this.props.navigation.navigate("EmailLogin");
  };
}
