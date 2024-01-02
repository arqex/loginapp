import { loginByProvider } from '@loginapp/api-client';
import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationButtonType,
  AppleAuthenticationScope,
  isAvailableAsync,
  signInAsync,
} from 'expo-apple-authentication';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { Button } from 'react-native-paper';
import { onAuthenticate } from '../application/authentication/authentication.service';
import { apiClient } from '../application/stores/apiClient';
import * as Google from 'expo-auth-session/providers/google';

interface SocialLoginButtonProps {
  type: 'login' | 'signup';
  onPress?: () => void;
  onLoadToggle: (isLoading: boolean) => void;
  onError: (error: string) => void;
}

interface SocialLoginButtonState {
  hasGooglePlayServices: boolean;
}

(async function isAppleSignInAvailable() {
  console.log('Is available', await isAvailableAsync());
})();

export default class SocialLoginButton extends React.Component<
  SocialLoginButtonProps,
  SocialLoginButtonState
> {
  state = {
    hasGooglePlayServices: false,
  };
  render() {
    const isDarkMode = useColorScheme() === 'dark';
    const { onLoadToggle, onError, type, onPress } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <AppleAuthenticationButton
          buttonStyle={
            isDarkMode
              ? AppleAuthenticationButtonStyle.WHITE
              : AppleAuthenticationButtonStyle.BLACK
          }
          buttonType={
            type === 'login'
              ? AppleAuthenticationButtonType.SIGN_IN
              : AppleAuthenticationButtonType.SIGN_UP
          }
          cornerRadius={21}
          style={{ alignSelf: 'stretch', height: 42 }}
          onPress={
            type === 'login'
              ? () => appleSignIn(onLoadToggle, onError)
              : () => appleSignUp(onLoadToggle, onError)
          }
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <Button mode="contained" icon="google" onPress={onPress}>
          {type === 'login' ? 'Log in with Google' : 'Sign up with Google'}
        </Button>
      );
    }

    return null;
  }
}

async function appleSignIn(
  onLoadToggle: (isLoading: boolean) => void,
  onError: (error: string) => void,
) {
  onLoadToggle(true);

  try {
    const appleAuth = await signInAsync({
      requestedScopes: [
        AppleAuthenticationScope.FULL_NAME,
        AppleAuthenticationScope.EMAIL,
      ],
    });

    console.log('Apple sign in', appleAuth);
    if (appleAuth.identityToken) {
      try {
        const { data } = await loginByProvider(
          apiClient,
          'apple',
          appleAuth.identityToken,
        );
        const { authenticatedId, token } = data;
        onAuthenticate(authenticatedId, token);
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
