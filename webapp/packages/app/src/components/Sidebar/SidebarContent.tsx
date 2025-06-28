import React from "react";
import styles from "./Sidebar.module.css";
import SidebarNavigation from "./navigation/SidebarNavigation";
import { VStack, Box } from "@loginapp/ui";

interface SidebarContentProps {
  children?: React.ReactNode;
}

export default class SidebarContent extends React.Component<SidebarContentProps> {
  render() {
    return (
      <VStack w="100%" alignItems="stretch">
        <Box flexGrow={1} paddingTop="10px">
          <Box className={styles.sidebarContent}>
            {this.props.children || <SidebarNavigation />}
          </Box>
        </Box>
      </VStack>
    );
  }
}
