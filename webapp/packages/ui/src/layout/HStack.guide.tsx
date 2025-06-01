import React from "react";
import { HStack as CHStack, StackProps } from "@chakra-ui/react";

export interface HStackProps extends StackProps {
  innerRef?: React.RefObject<HTMLDivElement>;
}
const HStack = ({ innerRef, ...props }: HStackProps) => {
  return <CHStack alignItems="start" {...props} ref={innerRef} />;
};

export default HStack;
