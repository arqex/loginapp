import React, { PropsWithChildren } from "react";
import { Textarea as T, TextareaProps as TProps } from "@chakra-ui/react";
import styles from "./forms.module.css";
import classNames from "classnames";

interface TextareaProps extends Omit<TProps, "variant"> {
  size?: "sm" | "md" | "lg";
  resizable?: boolean;
  autoresize?: boolean;
  innerRef?: React.RefObject<HTMLTextAreaElement>;
}

export default class Textarea extends React.Component<
  PropsWithChildren<TextareaProps>
> {
  render() {
    const { resizable = true, className, innerRef, ...props } = this.props;
    const cn = classNames(styles.textarea, className);
    return (
      <T
        minHeight="60px"
        className={cn}
        ref={innerRef}
        {...props}
        resize={resizable ? "vertical" : "none"}
      />
    );
  }
}
