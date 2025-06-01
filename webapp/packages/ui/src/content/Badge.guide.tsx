import React from "react";
import styles from "./Badge.module.css";
import Box from "../layout/Box.guide";
import { BoxProps } from "@chakra-ui/react";
import classNames from "classnames";

interface BadgeProps extends BoxProps {
  rounded?: boolean;
}

export default class Badge extends React.Component<BadgeProps> {
  render() {
    const { className, rounded, ...rest } = this.props;
    const classes = classNames(
      styles.badge,
      rounded && styles.rounded,
      className
    );
    return <Box {...rest} className={classes} />;
  }
}
