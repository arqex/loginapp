import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./forms.module.css";

export interface FakeInputProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  [key: string]: any;
}

export default function FakeInput({
  children,
  size = "md",
  ...props
}: FakeInputProps) {
  const className = classNames(styles.fakeInput, styles[`sizes_${size}`]);
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
