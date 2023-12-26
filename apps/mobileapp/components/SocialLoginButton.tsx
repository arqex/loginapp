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

interface SocialLoginButtonProps {
  type: 'login' | 'signup';
  onPress?: () => void;
}

(async function isAppleSignInAvailable() {
  console.log('Is available', await isAvailableAsync());
})();

export default function SocialLoginButton(props: SocialLoginButtonProps) {
  const isDarkMode = useColorScheme() === 'dark';
  if (Platform.OS === 'ios') {
    return (
      <AppleAuthenticationButton
        buttonStyle={
          isDarkMode
            ? AppleAuthenticationButtonStyle.WHITE
            : AppleAuthenticationButtonStyle.BLACK
        }
        buttonType={
          props.type === 'login'
            ? AppleAuthenticationButtonType.SIGN_IN
            : AppleAuthenticationButtonType.SIGN_UP
        }
        cornerRadius={21}
        style={{ alignSelf: 'stretch', height: 42 }}
        onPress={props.type === 'login' ? appleSignIn : appleSignUp}
      />
    );
  } else if (Platform.OS === 'android') {
    return (
      <Button mode="contained" icon="google" onPress={props.onPress}>
        {props.type === 'login' ? 'Log in with Google' : 'Sign up with Google'}
      </Button>
    );
  }

  return null;
}

async function appleSignIn() {
  const res = await signInAsync({
    requestedScopes: [
      AppleAuthenticationScope.FULL_NAME,
      AppleAuthenticationScope.EMAIL,
    ],
  });
  console.log('Apple sign in', res);
}

async function appleSignUp() {
  console.log('Apple sign up');
}
