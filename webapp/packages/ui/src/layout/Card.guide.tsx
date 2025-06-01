import React from "react";
import { Card as CCard, CardRootProps as CProps } from "@chakra-ui/react";
import classNames from "classnames";
import styles from "./Card.module.css";

export interface CardProps extends Omit<CProps, "border"> {
  bg?: "card" | "surface" | "shaded" | "tinted";
  padding?: "none" | "xs" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  cornerRadius?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
  innerRef?: React.Ref<HTMLDivElement>;
}

export default class Card extends React.Component<CardProps> {
  render() {
    const {
      bg = "card",
      padding = "md",
      shadow = "none",
      border = true,
      cornerRadius = "sm",
      children,
      innerRef,
      className,
      ...props
    } = this.props;

    const cn = classNames(
      styles.card,
      styles[`bg_${bg}`],
      styles[`pd_${padding}`],
      styles[`sh_${shadow}`],
      !border && styles.borderless,
      styles[`rd_${cornerRadius}`],
      className
    );

    return (
      <CCard.Root {...props} className={cn} ref={innerRef}>
        {children}
      </CCard.Root>
    );
  }
}
