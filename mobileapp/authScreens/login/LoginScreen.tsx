import React from 'react';
import ScreenLayout from '../../components/ScreenLayout';
import { Button } from 'react-native-paper';
import Column from '../../components/Column';
import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import SocialLoginButton from '../../components/SocialLoginButton';

type LoginScreenProps = StackScreenProps<ParamListBase, 'LogIn'>;
interface LoginScreenState {
  isAuthenticating: boolean;
  authenticationError: string;
}

export default class LoginScreen extends React.Component<
  LoginScreenProps,
  LoginScreenState
> {
  state: LoginScreenState = {
    isAuthenticating: false,
    authenticationError: '',
  };
  render() {
    return (
      <ScreenLayout>
        <Column gap={10} style={{ minWidth: 260 }}>
          {this.renderProviderError()}
          <SocialLoginButton
            type="login"
            onLoadToggle={this._onProviderLoading}
            onError={this._onProviderError}
          />
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

  renderProviderError() {
    const { authenticationError } = this.state;
    if (!authenticationError) return null;

    console.log('Authentication ERROR:', authenticationError);
    return null;
  }

  _onProviderLoading = (isLoading: boolean) => {
    this.setState({ isAuthenticating: isLoading });
  };

  _onProviderError = (error: string) => {
    console.log('Received error', error);
    this.setState({ authenticationError: error });
  };

  _goToSignup = () => {
    this.props.navigation.navigate('SignUp');
  };

  _goToEmailLogin = () => {
    this.props.navigation.navigate('EmailLogin');
  };
}
