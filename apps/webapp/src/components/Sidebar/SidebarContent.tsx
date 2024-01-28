import { VStack, Box, Flex, Text } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import styles from "./Sidebar.module.css";
import SidebarNavigation from "./navigation/SidebarNavigation";

interface SidebarContentProps {}
interface SidebarContentState {}

export default class SidebarContent extends React.Component<
  PropsWithChildren<SidebarContentProps>,
  SidebarContentState
> {
  state: SidebarContentState = {};
  render() {
    return (
      <VStack w="100%" alignItems="stretch">
        <Box className={styles.appTitle}>Login app</Box>
        <Box flexGrow={1}>
          <SidebarNavigation />
        </Box>
        <Flex alignItems="center" justifyContent="center" p="16px">
          <Text fontSize="sm">© Loginapp 2024</Text>
        </Flex>
      </VStack>
    );
  }
}
