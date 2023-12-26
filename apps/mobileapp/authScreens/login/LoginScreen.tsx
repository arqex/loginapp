import React from 'react';
import ScreenLayout from '../../components/ScreenLayout';
import { Button } from 'react-native-paper';
import Column from '../../components/Column';
import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import SocialLoginButton from '../../components/SocialLoginButton';

type LoginScreenProps = StackScreenProps<ParamListBase, 'LogIn'>;
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
          <SocialLoginButton type="login" />
          <Button mode="contained" icon="at" onPress={this._goToEmailLogin}>
            Log in with Email
          </Button>
          <Button
            labelStyle={{ textDecorationLine: 'underline' }}
            onPress={this._goToSignup}
          >
            Don't have an account? Sign up
          </Button>
        </Column>
      </ScreenLayout>
    );
  }

  _goToSignup = () => {
    this.props.navigation.navigate('SignUp');
  };

  _goToEmailLogin = () => {
    this.props.navigation.navigate('EmailLogin');
  };
}
