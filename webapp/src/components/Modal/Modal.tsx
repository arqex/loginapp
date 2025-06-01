import {
  Modal as M,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  isCloseable?: boolean;
}
interface ModalState {}

export default class Modal extends React.Component<
  PropsWithChildren<ModalProps>,
  ModalState
> {
  state: ModalState = {};
  render() {
    const { title, isOpen, onClose, children, isCloseable = true } = this.props;

    return (
      <M
        isOpen={isOpen}
        onClose={onClose}
        colorScheme="cyan"
        isCentered
        closeOnEsc={isCloseable}
        closeOnOverlayClick={isCloseable}
      >
        <ModalOverlay />
        <ModalContent>
          {title && <ModalHeader>{title}</ModalHeader>}
          {isCloseable && <ModalCloseButton />}
          {children}
        </ModalContent>
      </M>
    );
  }
}
