import React, { PropsWithChildren } from "react";
import { Text as T, TextProps as TProps } from "@chakra-ui/react";
import styles from "./text.module.css";
import classNames from "classnames";

interface MenuHeadingProps
  extends Omit<
    TProps,
    "color" | "fontSize" | "fontWeight" | "textTransform" | "letterSpacing"
  > {
  color?: "inherit" | "action" | "light" | "lighter";
}

export default class MenuHeading extends React.Component<
  PropsWithChildren<MenuHeadingProps>
> {
  render() {
    const { color = "lighter", ...props } = this.props;

    const classes = classNames(styles.base, styles[color]);

    return (
      <T
        {...props}
        className={classes}
        fontSize="xs"
        fontWeight="600"
        textTransform="uppercase"
        letterSpacing="wide"
      />
    );
  }
}
