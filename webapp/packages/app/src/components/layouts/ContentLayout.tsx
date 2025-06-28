import React from "react";
import styles from "./ContentLayout.module.css";
import { VStack, HStack, Box } from "@loginapp/ui";

interface ContentLayoutProps {
  titleBar?: React.ReactNode;
  sideBar?: React.ReactNode;
  children?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export default class ContentLayout extends React.Component<ContentLayoutProps> {
  render() {
    const { titleBar, sideBar, children, breadcrumb } = this.props;
    return (
      <VStack mt="32px" alignItems="stretch">
        {breadcrumb}
        <HStack className={styles.titleBar}>{titleBar}</HStack>
        <HStack gap="24px">
          <Box flexGrow="1">{children}</Box>
          {sideBar && <Box w="320px">{sideBar}</Box>}
        </HStack>
      </VStack>
    );
  }
}
