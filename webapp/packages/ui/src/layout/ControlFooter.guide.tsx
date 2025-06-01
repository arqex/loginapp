import { Stack } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./ControlFooter.module.css";

interface ControlFooterProps {
  align?: "stack" | "stretch" | "start" | "center" | "end";
  sticky?: boolean;
  children: React.ReactNode;
}

export default class ControlFooter extends React.Component<
  PropsWithChildren<ControlFooterProps>
> {
  render() {
    const { align = "start", sticky = false, children } = this.props;
    const direction =
      align === "stack" || align === "stretch" ? "column" : "row";

    const classes = classNames(styles[align], sticky && styles.sticky);
    return (
      <Stack direction={direction} className={classes}>
        {children}
      </Stack>
    );
  }
}
