import React from "react";
import Button from "../../components/Button/Button";
import { logout } from "../../application/auth/auth.service";
import { getAuthenticatedId } from "../../application/auth/auth.selector";
import { apiClient } from "../../application/stores/apiClient";
import { userLoader } from "../../business/user/user.loaders";
import ScreenLayout from "../../components/ScreenLayout/ScreenLayout";
import { Heading, ModalBody, ModalFooter, VStack } from "@chakra-ui/react";
import ContentLayout from "../../components/ContentLayout/ContentLayout";
import { showToast } from "../../application/toaster/toaster.service";
import Modal from "../../components/Modal/Modal";

interface HomeScreenProps {}
interface HomeScreenState {
  isModalOpen: boolean;
}

export default class HomeScreen extends React.Component<
  HomeScreenProps,
  HomeScreenState
> {
  state: HomeScreenState = {
    isModalOpen: false,
  };

  render() {
    const { data } = userLoader(apiClient, getAuthenticatedId()!);
    return (
      <ScreenLayout>
        <ContentLayout titleBar={<Heading>You are authenticated!</Heading>}>
          <VStack spacing="4">
            <Button onClick={logout}>Logout</Button>
            <Button onClick={() => showToast("This is the toast")}>
              Show toast
            </Button>
            <Button onClick={() => this.setState({ isModalOpen: true })}>
              Open modal
            </Button>
          </VStack>
          <Modal
            isOpen={this.state.isModalOpen}
            onClose={() => this.setState({ isModalOpen: false })}
            title="This is a modal test"
          >
            <ModalBody>
              <p>This is the modal body</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => this.setState({ isModalOpen: false })}>
                Close modal
              </Button>
            </ModalFooter>
          </Modal>
        </ContentLayout>
      </ScreenLayout>
    );
  }
}
