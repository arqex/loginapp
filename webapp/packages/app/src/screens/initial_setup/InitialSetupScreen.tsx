import React from "react";
import { Card, VStack } from "@loginapp/ui";
import UnauthenticatedLayout from "../../components/UnauthenticatedLayout/UnauthenticatedLayout";
import withAuth, {
  type WithAuthProps,
} from "../../application/auth/withAuth.hoc";
import { UserNameStep, AccountNameStep, CompletedStep } from "./steps";

type InitialSetupScreenProps = WithAuthProps<void>;

interface InitialSetupScreenState {
  currentStep: number;
}

class InitialSetupScreen extends React.Component<
  InitialSetupScreenProps,
  InitialSetupScreenState
> {
  state: InitialSetupScreenState = {
    currentStep: 1,
  };

  render() {
    const { currentStep } = this.state;
    const { user, account } = this.props.authContext;
    const finalStep = currentStep !== 1 && currentStep !== 2;

    return (
      <UnauthenticatedLayout>
        <Card padding="md" width="100%" maxW="400px">
          <VStack alignItems="stretch" gap="4">
            {currentStep === 1 && (
              <UserNameStep user={user} onGoNext={this._goNextStep} />
            )}
            {currentStep === 2 && (
              <AccountNameStep
                user={user}
                account={account}
                onGoNext={this._goNextStep}
              />
            )}
            {finalStep && <CompletedStep userId={user.id} />}
          </VStack>
        </Card>
      </UnauthenticatedLayout>
    );
  }

  _goNextStep = () => {
    let nextStep = this.state.currentStep + 1;
    const { account } = this.props.authContext;
    if (nextStep === 2 && account?.name) {
      // if the account has name, skip to the completed step
      nextStep = 3;
    }

    this.setState({ currentStep: nextStep });
  };
}

const InitialSetupScreenWithAuth = withAuth(InitialSetupScreen, {
  skipIntercept: true,
});
export default InitialSetupScreenWithAuth;
