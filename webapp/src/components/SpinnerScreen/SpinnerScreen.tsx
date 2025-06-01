import React from "react";
import ScreenLayout from "../ScreenLayout/ScreenLayout";
import { Flex, Spinner } from "@chakra-ui/react";
import Theme from "../Theme/Theme";

export default function SpinnerScreen() {
  return (
    <Theme>
      <Flex
        w="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        h="100vh"
      >
        <Spinner speed="1.2s" />
      </Flex>
    </Theme>
  );
}
