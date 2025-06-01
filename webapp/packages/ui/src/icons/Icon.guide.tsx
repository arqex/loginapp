import React from "react";
import styles from "./Icon.module.css";
import classnames from "classnames";

export type IconSize =
  | "auto"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl";

export interface IconProps {
  /** Overider the color, note by default this is `currentColor` and you should try to set the text color, use this only for edge cases */
  color?: string;
  /** How big should the icon be in px, this sets both the width and height */
  size?: IconSize;
  /** How wide should the icon be in px, use this for non-square logos */
  width?: number | string;
  /** How tall should the icon be in px, use this for non-square logos */
  height?: number | string;
  /** A descriptive title for a screen reader */
  title?: string;
  /** Nudge the icon vertically up or down to fix alignment issues */
  nudge?: number | string;
  /** Make the icon a block item */
  block?: boolean;
  /** Adds a test id */
  ["data-testid"]?: string;
  children: React.ReactNode;
  /** For arrow icons it's possible to make them point to different directions */
  direction?: "up" | "down" | "forward" | "back";
}

const Icon = ({
  color = "currentColor",
  size = "auto",
  width,
  height,
  title,
  nudge,
  "data-testid": testId,
  block = false,
  direction = "forward",
  children,
}: IconProps) => {
  const w = typeof width === "string" ? parseInt(width) : width;
  const h = typeof height === "string" ? parseInt(height) : height;

  const style = {
    width: w ? w : undefined,
    height: h ? h : undefined,
    top: nudge,
    color,
  };
  const cn = classnames([
    styles.icon,
    block && styles.block,
    nudge && styles.nudge,
    styles[`dir_${direction}`],
    styles[size],
  ]);

  return (
    <span className={cn} style={style} title={title} data-testid={testId}>
      {children}
    </span>
  );
};

export default Icon;
