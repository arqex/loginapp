import React, { PropsWithChildren } from "react";
import { Input as CInput, InputProps as CInputProps } from "@chakra-ui/react";
import { InputGroup } from "../../chakra-snippets/input-group";
import styles from "./forms.module.css";

export interface InputProps extends Omit<CInputProps, "size" | "variant"> {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "unstyled";
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  innerRef?: React.RefObject<HTMLInputElement>;
}

export default class Input extends React.Component<
  PropsWithChildren<InputProps>
> {
  render() {
    const {
      size = "md",
      variant = "outline",
      startElement,
      endElement,
      innerRef,
      ...rest
    } = this.props;

    const renderedInput = (
      <CInput
        className={styles.input}
        size={size === "sm" ? "xs" : size}
        variant={variant}
        ref={innerRef}
        {...rest}
      />
    );
    if (startElement || endElement) {
      return (
        <InputGroup startElement={startElement} endElement={endElement}>
          {renderedInput}
        </InputGroup>
      );
    }

    return renderedInput;
  }
}
