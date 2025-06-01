import React from "react";
import { Circle as C, CircleProps as CProps } from "@chakra-ui/react";

interface CircleProps extends CProps {}

export default class Circle extends React.Component<CircleProps> {
  render() {
    return <C {...this.props} />;
  }
}
