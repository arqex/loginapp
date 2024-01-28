import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import styles from "./Button.module.css";
import Icon from "../Icon/Icon";

interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: "menu" | "moon" | "sun" | "close";
}
interface IconButtonState {}

export default class IconButton extends React.Component<
  PropsWithChildren<IconButtonProps>,
  IconButtonState
> {
  state: IconButtonState = {};
  render() {
    const { icon, ...buttonProps } = this.props;

    return (
      <button
        {...buttonProps}
        className={classNames(styles.iconButton, buttonProps.className)}
      >
        <Icon name={icon} />
      </button>
    );
  }
}
