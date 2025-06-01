import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import cardStyles from "../layout/Card.module.css";
import { getLinkProps } from "../texts/Link.utils";

interface ButtonWrapperProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "transparent"
    | "card"
    | "card_surface"
    | "card_shaded"
    | "card_tinted";
  radius?: "none" | "sm" | "md" | "lg";
  padding?: "none" | "xs" | "sm" | "md" | "lg";
  href?: string;
}

export default class ButtonWrapper extends React.Component<ButtonWrapperProps> {
  render() {
    const {
      className,
      variant = "transparent",
      radius = "sm",
      padding = "sm",
      href,
      ...props
    } = this.props;

    const classes = classNames(
      styles.buttonWrapper,
      variant !== "transparent" && cardStyles.card,
      variant == "card" && cardStyles.bg_card,
      variant === "card_surface" && cardStyles.bg_surface,
      variant === "card_shaded" && cardStyles.bg_shaded,
      variant === "card_shaded" && styles.bg_shaded,
      variant === "card_tinted" && cardStyles.bg_tinted,
      cardStyles[`pd_${padding}`],
      cardStyles[`rd_${radius}`],
      className
    );

    if (href) {
      const linkProps = getLinkProps(href);
      return <a {...linkProps} {...props} className={classes} />;
    } else {
      return <button {...props} className={classes} />;
    }
  }
}
