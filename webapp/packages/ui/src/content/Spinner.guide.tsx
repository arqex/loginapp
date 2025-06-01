import React from "react";
import { Spinner as S, SpinnerProps as SProps } from "@chakra-ui/react";

interface SpinnerProps extends SProps {}

export default class Spinner extends React.Component<SpinnerProps> {
  render() {
    return <S {...this.props} />;
  }
}
