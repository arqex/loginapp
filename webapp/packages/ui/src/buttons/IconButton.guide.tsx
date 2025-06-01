import classNames from "classnames";
import React, { PropsWithChildren, forwardRef } from "react";
import styles from "./Button.module.css";
import Icon, { IconSize } from "../icons/Icon.guide";
import Tooltip from "../popovers/Tooltip.guide";
import { getLinkProps } from "../texts/Link.utils";

interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  href?: string;
  size?: "xs" | "sm" | "md" | "lg";
  buttonRef?: React.Ref<HTMLButtonElement> | React.Ref<HTMLAnchorElement>;
  variant?: "transparent" | "primary" | "solid" | "secondary";
  tooltip?: string;
  direction?: "forward" | "down" | "up" | "back";
}
interface IconButtonState {}

class IconButtonBase extends React.Component<
  PropsWithChildren<IconButtonProps>,
  IconButtonState
> {
  state: IconButtonState = {};
  render() {
    const {
      size = "md",
      buttonRef,
      variant,
      tooltip,
      href,
      children: icon,
      direction,
      ...buttonProps
    } = this.props;

    const cn = classNames(
      styles.iconButton,
      href && styles.iconLink,
      styles[size],
      buttonProps.className,
      styles[variant ?? "primary"],
      buttonProps.disabled && styles.disabled
    );

    return (
      <Tooltip content={tooltip}>
        {href ? (
          <a
            {...buttonProps}
            {...getLinkProps(href)}
            className={cn}
            ref={buttonRef as React.Ref<HTMLAnchorElement>}
          >
            <Icon size={this.getIconSize(size)}>{icon}</Icon>
          </a>
        ) : (
          <button
            {...buttonProps}
            className={cn}
            ref={buttonRef as React.Ref<HTMLButtonElement>}
          >
            <Icon size={this.getIconSize(size)} direction={direction}>
              {icon}
            </Icon>
          </button>
        )}
      </Tooltip>
    );
  }

  getIconSize(size: string) {
    let iconSize = "xl";
    switch (size) {
      case "xs":
        iconSize = "sm";
        break;
      case "sm":
        iconSize = "md";
        break;
      case "lg":
        iconSize = "xxl";
        break;
    }
    return iconSize as IconSize;
  }
}

const IconButton = forwardRef(
  (props: IconButtonProps, ref: React.Ref<HTMLButtonElement>) => (
    // @ts-ignore
    <IconButtonBase {...props} buttonRef={ref} />
  )
);

export default IconButton;
