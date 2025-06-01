import React from "react";
import { Tag as T, TagRootProps } from "@chakra-ui/react";
import { Close } from "../icons/svg";
import Spinner from "./Spinner.guide";
import classNames from "classnames";
import styles from "./Tag.module.css";
import IconButton from "../buttons/IconButton.guide";

interface TagProps extends Omit<TagRootProps, "onClick"> {
  id?: string;
  isLoading?: boolean;
  color?: string;
  onRemove?: (id: string | undefined) => void;
  onClick?: (id: string | undefined) => void;
  children: React.ReactNode;
  size?: "sm" | "md";
  variant?: "outline" | "solid";
}

export default class Tag extends React.Component<TagProps> {
  render() {
    const {
      isLoading,
      onRemove,
      children,
      onClick,
      color = "#eee",
      size = "md",
      variant = "solid",
      ...props
    } = this.props;

    const style =
      variant === "solid"
        ? {
            backgroundColor: getBGColor(color),
            color: getFGColor(),
          }
        : {
            backgroundColor: "var(--card)",
            color: color,
            border: `1px solid ${color}`,
          };
    const cn = classNames(
      styles.tag,
      isLoading && styles.loading,
      onClick && styles.clickable,
      styles[`size_${size}`],
      props.className
    );

    return (
      <T.Root
        {...props}
        className={cn}
        variant="solid"
        onClick={this._onClick}
        style={style}
      >
        <span>{children}</span>
        {isLoading && (
          <T.EndElement className={styles.spinner}>
            <Spinner size="xs" />
          </T.EndElement>
        )}
        {!isLoading && onRemove && (
          <T.EndElement className={styles.removeButton}>
            <IconButton
              size="xs"
              onClick={this._onRemove}
              variant="transparent"
            >
              <Close />
            </IconButton>
          </T.EndElement>
        )}
      </T.Root>
    );
  }

  _onClick = () => {
    const { onClick, id, isLoading } = this.props;
    !isLoading && onClick && onClick(id);
  };

  _onRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    this.props.onRemove?.(this.props.id);
  };
}

function getBGColor(baseColor: string) {
  const isDark = false;
  if (isDark) {
    const r = Math.floor(hexToDecimal(baseColor.slice(1, 3)) * 0.4);
    const g = Math.floor(hexToDecimal(baseColor.slice(3, 5)) * 0.4);
    const b = Math.floor(hexToDecimal(baseColor.slice(5, 7)) * 0.4);
    return `rgb(${r},${g},${b})`;
  }
  return baseColor;
}

function getFGColor() {
  const isDark = false;
  return isDark ? "#ffffffdd" : "#000000dd";
}

function hexToDecimal(hex: string) {
  return parseInt(hex, 16);
}
