import React from "react";
import { VStack as CVStack, StackProps } from "@chakra-ui/react";

const VStack = (props: StackProps) => {
  return <CVStack alignItems="stretch" {...props} />;
};

export default VStack;
