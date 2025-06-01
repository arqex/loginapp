import React from 'react';
import ScreenLayout from '../../components/ScreenLayout';
import { Button, Text } from 'react-native-paper';
import Column from '../../components/Column';
import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import SocialLoginButton from '../../components/SocialLoginButton';

type SignupScreenProps = StackScreenProps<ParamListBase, 'SignUp'>;
interface SignupScreenState {
  isAuthenticating: boolean;
  authenticationError: string;
}

export default class SignupScreen extends React.Component<
  SignupScreenProps,
  SignupScreenState
> {
  state: SignupScreenState = {
    isAuthenticating: false,
    authenticationError: '',
  };
  render() {
    return (
      <ScreenLayout>
        <Column gap={10} style={{ minWidth: 260 }}>
          <SocialLoginButton
            type="signup"
            onLoadToggle={this._onProviderLoading}
            onError={this._onProviderError}
          />
          <Button mode="contained" icon="at" onPress={this._goToEmailLogin}>
            Sign up with Email
          </Button>
          <Button
            onPress={this._goToLogin}
            labelStyle={{ textDecorationLine: 'underline' }}
          >
            Already have an account? Log in
          </Button>
        </Column>
      </ScreenLayout>
    );
  }

  _goToLogin = () => {
    this.props.navigation.navigate('LogIn');
  };

  _goToEmailLogin = () => {
    this.props.navigation.navigate('EmailSignup');
  };

  _onProviderError = (error: string) => {
    console.log('Received error', error);
    this.setState({ authenticationError: error });
  };

  _onProviderLoading = (isLoading: boolean) => {
    this.setState({ isAuthenticating: isLoading });
  };
}
