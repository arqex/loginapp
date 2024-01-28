import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarDrawer({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<SidebarDrawerProps>) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        {children}
      </DrawerContent>
    </Drawer>
  );
}
