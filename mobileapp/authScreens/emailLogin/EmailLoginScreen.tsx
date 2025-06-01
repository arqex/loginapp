import React from 'react';
import ScreenLayout from '../../components/ScreenLayout';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Column from '../../components/Column';
import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { apiClient } from '../../application/stores/apiClient';
import { getAuthenticationToken, signup } from '@loginapp/api-client';
import { onAuthenticate } from '../../application/authentication/authentication.service';
import {
  isValidEmailAddress,
  ValidationErrors,
} from '../../application/utils/validation.utils';
import { View } from 'react-native';

type EmailLoginScreenProps = StackScreenProps<ParamListBase, 'EmailLogin'>;
interface EmailLoginScreenState {
  email: string;
  password: string;
  isSending: boolean;
  errors: ValidationErrors;
}

export default class EmailLoginScreen extends React.Component<
  EmailLoginScreenProps,
  EmailLoginScreenState
> {
  state: EmailLoginScreenState = {
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
              label="Email"
              value={email}
              onChangeText={(email) => this.setState({ email })}
              autoComplete="email"
              keyboardType="email-address"
              autoCapitalize="none"
              blurOnSubmit={false}
              returnKeyType="next"
              error={!!errors?.email}
              onSubmitEditing={() => this.passwordInputRef.current?.focus()}
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
              label="Password"
              value={password}
              onChangeText={(password) => this.setState({ password })}
              autoComplete="password"
              secureTextEntry
              blurOnSubmit
              error={!!errors?.password}
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
            Login
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

    getAuthenticationToken(apiClient, email, password)
      .then(({ data }) => {
        const { authenticatedId, token } = data;
        onAuthenticate(authenticatedId, token);
      })
      .catch((error) => {
        console.error('error', error);
      });
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
