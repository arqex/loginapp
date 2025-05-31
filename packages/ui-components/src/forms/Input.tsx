import { Input as ChakraInput } from "@chakra-ui/react";
import React from "react";

interface InputProps {
  size: "xs" | "sm" | "md" | "lg";
}
interface InputState {}

export default class Input extends React.Component<InputProps, InputState> {
  state: InputState = {};
  render() {
    return <ChakraInput size={this.props.size} variant="outline" />;
  }
}
