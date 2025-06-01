import React from "react";
import { Float as F, FloatProps as FProps } from "@chakra-ui/react";

interface FloatProps extends FProps {}

export default class Float extends React.Component<FloatProps> {
  render() {
    return <F {...this.props} />;
  }
}
