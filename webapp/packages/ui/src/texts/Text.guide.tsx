import React, { PropsWithChildren } from "react";
import { Text as T, TextProps as TProps } from "@chakra-ui/react";
import styles from "./text.module.css";
import classNames from "classnames";

interface TextProps extends Omit<TProps, "color"> {
  color?: "inherit" | "action" | "light" | "lighter";
  size?: "md" | "sm" | "xs";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  block?: boolean;
}

export default class Text extends React.Component<
  PropsWithChildren<TextProps>
> {
  render() {
    const {
      color = "inherit",
      size = "md",
      bold,
      italic,
      underline,
      block,
      ...props
    } = this.props;

    const classes = classNames(
      styles.base,
      styles[color],
      block && styles.block
    );
    return (
      <T
        {...props}
        className={classes}
        color={color}
        fontSize={size}
        fontWeight={bold ? 600 : 400}
        fontVariant={
          italic === undefined ? "inherit" : italic ? "italic" : "normal"
        }
        textDecoration={
          underline === undefined ? "inherit" : underline ? "underline" : "none"
        }
      />
    );
  }
}
