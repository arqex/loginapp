import React, { forwardRef } from "react";
import styles from "./Button.module.css";
import { Button as CB, ButtonProps as CBProps } from "@chakra-ui/react";
import { getLinkProps } from "../texts/Link.utils";
import Icon from "../icons/Icon.guide";
import classNames from "classnames";

export interface ButtonProps extends Omit<CBProps, "variant" | "size"> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "transparent" | "text";
  size?: "xs" | "sm" | "md" | "lg";
  buttonRef?: React.Ref<HTMLButtonElement>;
  leftIcon?: React.ReactElement;
  leftIconProps?: any;
  rightIcon?: React.ReactElement;
  rightIconProps?: any;
}

class ButtonBase extends React.Component<ButtonProps> {
  render() {
    const as = this.props.href ? "a" : "button";
    let extraLinkProps: any = {};
    if (as === "a") {
      extraLinkProps = getLinkProps(this.props.href!);
    }

    const {
      buttonRef,
      leftIcon,
      rightIcon,
      children,
      leftIconProps,
      rightIconProps,
      ...props
    } = this.props;

    const { variant = "primary", size = "md" } = this.props;
    const cn = classNames(
      styles.button,
      styles[variant],
      styles[`size_${size}`],
      leftIcon && styles.withLeftIcon,
      rightIcon && styles.withRightIcon
    );

    return (
      <CB as={as} {...props} {...extraLinkProps} className={cn} ref={buttonRef}>
        {this.renderIcon(leftIcon, leftIconProps)}
        {children}
        {this.renderIcon(rightIcon, rightIconProps)}
      </CB>
    );
  }

  renderIcon(icon: React.ReactElement | undefined, props = {}) {
    if (!icon) return null;

    const { size = "md" } = this.props;
    let iconSize = "lg";
    switch (size) {
      case "sm":
        iconSize = "md";
        break;
      case "lg":
        iconSize = "xl";
        break;
    }

    return (
      <Icon {...props} size={iconSize}>
        {icon}
      </Icon>
    );
  }
}

const Button = forwardRef(
  (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => (
    <ButtonBase {...props} buttonRef={ref} />
  )
);

export default Button;
