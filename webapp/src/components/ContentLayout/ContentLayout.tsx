import { Box, HStack, VStack } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

interface ContentLayoutProps {
  titleBar?: React.ReactNode;
  sideBar?: React.ReactNode;
  children?: React.ReactNode;
}
interface ContentLayoutState {}

export default class ContentLayout extends React.Component<
  PropsWithChildren<ContentLayoutProps>,
  ContentLayoutState
> {
  state: ContentLayoutState = {};
  render() {
    const { titleBar, sideBar, children } = this.props;
    return (
      <VStack mt="48px" alignItems="stretch">
        <HStack>{titleBar}</HStack>
        <HStack spacing="24px">
          <Box flexGrow="1">{children}</Box>
          {sideBar && <Box w="320px">{sideBar}</Box>}
        </HStack>
      </VStack>
    );
  }
}
