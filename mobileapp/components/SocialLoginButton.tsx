import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import React from 'react';
import { Platform, Appearance } from 'react-native';
import { Button } from 'react-native-paper';
import {
  loginByProvider,
  signupByProvider,
} from '../application/authentication/authentication.service';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '423004890114-acopap91vmqv3ontegdb7n8qe6gj90uc.apps.googleusercontent.com',
});

interface SocialLoginButtonProps {
  type: 'login' | 'signup';
  onPress?: () => void;
  onLoadToggle: (isLoading: boolean) => void;
  onError: (error: string) => void;
}

interface SocialLoginButtonState {
  hasGooglePlayServices: boolean;
  isLoading: boolean;
}

export default class SocialLoginButton extends React.Component<
  SocialLoginButtonProps,
  SocialLoginButtonState
> {
  state = {
    hasGooglePlayServices: false,
    isLoading: false,
  };
  render() {
    const isDarkMode = Appearance.getColorScheme() === 'dark';
    const { onLoadToggle, onError, type, onPress } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <AppleButton
          buttonStyle={
            isDarkMode ? AppleButton.Style.WHITE : AppleButton.Style.BLACK
          }
          buttonType={
            type === 'login'
              ? AppleButton.Type.SIGN_IN
              : AppleButton.Type.SIGN_UP
          }
          cornerRadius={22}
          style={{
            alignSelf: 'stretch', // You must specify a width
            height: 42, // You must specify a height
          }}
          onPress={
            type === 'login'
              ? () => appleSignIn(onLoadToggle, onError)
              : () => appleSignUp(onLoadToggle, onError)
          }
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <Button
          mode="contained"
          icon="google"
          onPress={this._signIn}
          loading={this.state.isLoading}
        >
          {type === 'login' ? 'Log in with Google' : 'Sign up with Google'}
        </Button>
      );
    }

    return null;
  }

  _signIn = async () => {
    this.setState({ isLoading: true });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { type } = this.props;
      if (type === 'signup') {
        await signupByProvider('google', userInfo.idToken!);
      } else {
        await loginByProvider('google', userInfo.idToken!);
      }
    } catch (error: any) {
      console.log('Google sign in error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };
}

async function appleSignIn(
  onLoadToggle: (isLoading: boolean) => void,
  onError: (error: string) => void,
) {
  onLoadToggle(true);

  try {
    const appleResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.EMAIL],
    });

    console.log('Apple response', appleResponse);

    if (appleResponse.identityToken) {
      try {
        await loginByProvider('apple', appleResponse.identityToken);
      } catch (err: any) {
        console.log('Error', err.response);
        onError('unauthorized');
      } finally {
        onLoadToggle(false);
      }
    } else {
      onLoadToggle(false);
    }
  } catch (err) {
    console.log(err);
    onLoadToggle(false);
  }
}

async function appleSignUp(
  onLoadToggle: (isLoading: boolean) => void,
  onError: (error: string) => void,
) {
  console.log('Apple sign up');
}
