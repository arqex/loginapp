import React from "react";
import ScreenLayout from "../../components/ScreenLayout";
import { Button, Text, TextInput } from "react-native-paper";
import Column from "../../components/Column";
import { ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

type EmailLoginScreenProps = StackScreenProps<ParamListBase, "EmailLogin">;
interface EmailLoginScreenState {
  email: string;
  password: string;
  isSending: boolean;
}

export default class EmailLoginScreen extends React.Component<
  EmailLoginScreenProps,
  EmailLoginScreenState
> {
  state: EmailLoginScreenState = {
    email: "",
    password: "",
    isSending: false,
  };
  passwordInputRef = React.createRef<TextInput>();
  render() {
    const { email, password, isSending } = this.state;
    return (
      <ScreenLayout>
        <Column gap={10} style={{ minWidth: 260 }}>
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(email) => this.setState({ email })}
            autoComplete="email"
            keyboardType="email-address"
            autoCapitalize="none"
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInputRef.current?.focus()}
          />
          <TextInput
            mode="outlined"
            ref={this.passwordInputRef}
            label="Password"
            value={password}
            onChangeText={(password) => this.setState({ password })}
            autoComplete="password"
            secureTextEntry
            blurOnSubmit
          />
          <Button
            mode="contained"
            onPress={this._go}
            disabled={isSending}
            loading={isSending}
          >
            Log in
          </Button>
        </Column>
      </ScreenLayout>
    );
  }

  _go = () => {
    this.setState({ isSending: true });
    console.log("TODO: implement login", this.state);
    setTimeout(() => {
      this.setState({ isSending: false });
    }, 3000);
  };
}
