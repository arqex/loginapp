import React from "react";
import { Dialog, DialogRootProps, Float, Portal } from "@chakra-ui/react";
import IconButton from "../buttons/IconButton.guide";
import { Close } from "../icons/svg";
import styles from "./Modal.module.css";
import classNames from "classnames";

interface ModalProps extends Omit<DialogRootProps, "onOpenChange"> {
  onClose?: () => void;
  closeable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  size?: "sm" | "md" | "lg" | "cover" | "full";
}

export default class Modal extends React.Component<ModalProps> {
  render() {
    const {
      children,
      onClose,
      closeable = true,
      padding = "md",
      ...props
    } = this.props;

    const classes = classNames(styles.content, styles[`pd_${padding}`]);
    return (
      <Dialog.Root
        lazyMount
        unmountOnExit
        placement="center"
        closeOnEscape={closeable}
        closeOnInteractOutside={closeable}
        scrollBehavior="outside"
        onOpenChange={onClose}
        {...props}
      >
        <Portal>
          <Dialog.Positioner>
            <Dialog.Backdrop />
            <Dialog.Content className={classes}>
              {children}
              <Float position="absolute" top={6} right={6}>
                <IconButton size="sm" variant="transparent" onClick={onClose}>
                  <Close />
                </IconButton>
              </Float>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  }
}

interface ChildrenProps {
  children: React.ReactNode;
}
