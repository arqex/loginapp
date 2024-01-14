import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import ScreenLayout from '../../components/ScreenLayout';
import { StoreConnected } from '../../components/StoreConnectedScreen';
import Column from '../../components/Column';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { signup, getAuthenticationToken, ApiError } from '@loginapp/api-client';
import { onAuthenticate } from '../../application/authentication/authentication.service';
import { apiClient } from '../../application/stores/apiClient';
import {
  ValidationErrors,
  isValidEmailAddress,
} from '../../application/utils/validation.utils';
import { View } from 'react-native';

type EmailSignupScreenProps = StackScreenProps<ParamListBase, 'EmailSignup'>;
interface EmailSignupScreenState {
  email: string;
  password: string;
  isSending: boolean;
  errors: ValidationErrors;
}

class EmailSignupScreen extends React.Component<
  EmailSignupScreenProps,
  EmailSignupScreenState
> {
  state: EmailSignupScreenState = {
    email: '',
    password: '',
    isSending: false,
    errors: undefined,
  };
  passwordInputRef = React.createRef<typeof TextInput>();
  render() {
    const { email, password, isSending, errors } = this.state;
    return (
      <ScreenLayout>
        <Column gap={10} style={{ minWidth: 260 }}>
          <View>
            <TextInput
              mode="outlined"
              label="Your email"
              value={email}
              onChangeText={(email) => this.setState({ email })}
              autoComplete="email"
              keyboardType="email-address"
              autoCapitalize="none"
              blurOnSubmit={false}
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInputRef.current?.focus()}
              error={!!errors?.email}
              autoFocus
            />
            <HelperText type="error" visible={!!errors?.email}>
              {errors?.email}
            </HelperText>
          </View>
          <View>
            <TextInput
              mode="outlined"
              ref={this.passwordInputRef}
              label="Choose a password"
              value={password}
              onChangeText={(password) => this.setState({ password })}
              autoComplete="password"
              error={!!errors?.password}
              secureTextEntry
              blurOnSubmit
            />
            <HelperText type="error" visible={!!errors?.password}>
              {errors?.password}
            </HelperText>
          </View>
          <Button
            mode="contained"
            onPress={this._go}
            disabled={isSending}
            loading={isSending}
          >
            Log in
          </Button>
          <Button mode="contained" onPress={this._goToEmailVerification}>
            Verify account
          </Button>
        </Column>
      </ScreenLayout>
    );
  }

  _go = async () => {
    const { email, password } = this.state;
    const errors = this.getValidationErrors(email, password);

    if (errors) {
      return this.setState({ errors });
    }
    this.setState({ isSending: true });

    try {
      const { data, status } = await signup(apiClient, email, password, false);
      console.log('signup', data, status);
      if (status === 201) {
        // @ts-ignore This is a login
        return onAuthenticate(data.authenticatedId, data.token);
      }
      this.setState({ isSending: false });
      this.props.navigation.navigate('VerifyEmail', { email });
    } catch (err) {
      const error = err as ApiError;
      if (error.response?.status === 401) {
        console.log('No authorized');
        this.setState({
          errors: { email: 'Email or password not valid' },
          isSending: false,
        });
      } else {
        this.setState({ isSending: false });
      }
    }
  };

  _goToEmailVerification = () => {
    const { email } = this.state;
    this.props.navigation.navigate('VerifyEmail', { email });
  };

  getValidationErrors(email: string, password: string) {
    const errors: ValidationErrors = {};
    if (!isValidEmailAddress(email)) {
      errors.email = 'The email address is not valid.';
    }
    if (!password) {
      errors.password = 'Need to type a password.';
    }

    if (Object.keys(errors).length > 0) return errors;
  }
}

export default StoreConnected<'EmailSignup'>(EmailSignupScreen);
