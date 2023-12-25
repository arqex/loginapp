import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import ScreenLayout from '../../components/ScreenLayout';
import { StoreConnected } from '../../components/StoreConnectedScreen';
import Column from '../../components/Column';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { verifyEmail } from '@loginapp/api-client';
import { apiClient } from '../../application/stores/apiClient';
import { View } from 'react-native';
import { onAuthenticate } from '../../application/authentication/authentication.service';

type VerifyEmailScreenProps = StackScreenProps<ParamListBase, 'VerifyEmail'>;
interface VerifyEmailScreenState {
  isSending: boolean;
  verificationCode: string;
  error?: string;
}

class VerifyEmailScreen extends React.Component<
  VerifyEmailScreenProps,
  VerifyEmailScreenState
> {
  state: VerifyEmailScreenState = {
    isSending: false,
    verificationCode: '',
  };
  render() {
    const { verificationCode, isSending, error } = this.state;
    console.log('VerifyEmailScreen', this.props.route.params);
    return (
      <ScreenLayout>
        <Column gap={10} style={{ minWidth: 260 }}>
          <View>
            <TextInput
              mode="outlined"
              label="Verification code"
              value={verificationCode}
              onChangeText={(verificationCode) =>
                this.setState({ verificationCode })
              }
              autoCapitalize="none"
              error={!!error}
              blurOnSubmit
              autoFocus
            />
            <HelperText type="error" visible={!!error}>
              {error}
            </HelperText>
          </View>
          <Button
            mode="contained"
            onPress={this._go}
            disabled={isSending}
            loading={isSending}
          >
            Verify Account
          </Button>
        </Column>
      </ScreenLayout>
    );
  }

  _go = async () => {
    this.setState({ isSending: true });

    try {
      // @ts-ignore
      const { email } = this.props.route.params;
      const { verificationCode } = this.state;
      const { data, status } = await verifyEmail(
        apiClient,
        verificationCode,
        email,
        false,
      );
      this.setState({ isSending: false });
      if (status === 201) {
        return onAuthenticate(data.authenticatedId, data.token);
      }
    } catch (err: any) {
      console.error(err);
      this.setState({
        isSending: false,
        error: 'The verification code is not correct.',
      });
    }
  };
}

export default StoreConnected<'VerifyEmail'>(VerifyEmailScreen);
