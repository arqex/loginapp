import React from "react";
import styles from "./Menu.module.css";
import { HStack, VStack } from "@chakra-ui/react";
import Icon from "../../icons/Icon.guide";
import { getLinkProps } from "../../texts/Link.utils";
import MenuTitle from "./MenuTitle";
import classNames from "classnames";

interface MenuItemProps {
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  href?: string;
  size?: "sm" | "md" | "lg";
}

export default class MenuItem extends React.Component<MenuItemProps> {
  render() {
    const { href, onClick, selected, size = "md" } = this.props;
    const linkProps = href ? getLinkProps(href) : {};
    const classes = classNames(
      styles.item,
      selected && styles.selected,
      styles[`size_${size}`]
    );
    return (
      <HStack
        as={href ? "a" : "div"}
        className={classes}
        onClick={onClick}
        {...linkProps}
      >
        {this.renderStartElement()}
        <VStack className={styles.content} gap={0}>
          {this.renderContent()}
        </VStack>
        {this.renderEndElement()}
      </HStack>
    );
  }

  renderContent() {
    const { children, selected } = this.props;
    if (typeof children === "string") {
      return <MenuTitle bold={selected}>{children}</MenuTitle>;
    }
    return children;
  }

  renderStartElement() {
    const { startElement, startIcon } = this.props;
    if (!startElement && !startIcon) return null;

    return (
      <div className={styles.startElement}>
        {startIcon ? <Icon size="lg">{startIcon}</Icon> : startElement}
      </div>
    );
  }

  renderEndElement() {
    const { endElement, endIcon } = this.props;
    if (!endElement && !endIcon) return null;

    return (
      <div className={styles.endElement}>
        {endIcon ? <Icon size="lg">{endIcon}</Icon> : endElement}
      </div>
    );
  }
}
