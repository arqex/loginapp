import React, { AnchorHTMLAttributes } from "react";
import { getLinkProps } from "./Link.utils";
import classNames from "classnames";
import styles from "./text.module.css";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: "inherit" | "action";
  underline?: boolean;
}

export default class Link extends React.Component<LinkProps> {
  render() {
    const { className, color = "inherit", underline = true } = this.props;
    const extraProps: any = {
      className: classNames(
        styles.link,
        styles[color],
        underline && styles.underline,
        className
      ),
      ...getLinkProps(this.props.href!),
    };

    return (
      <a {...this.props} {...extraProps}>
        {this.props.children}
      </a>
    );
  }
}
