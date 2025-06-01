import React from "react";
import { Box as CBox, BoxProps as CBoxProps } from "@chakra-ui/react";

interface BoxProps extends CBoxProps {}

export default class Box extends React.Component<BoxProps> {
  render() {
    return <CBox {...this.props} />;
  }
}
