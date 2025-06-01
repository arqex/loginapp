import React, { PropsWithChildren } from "react";
import { NativeSelect, NativeSelectFieldProps } from "@chakra-ui/react";
import styles from "./forms.module.css";

interface SelectProps extends Omit<NativeSelectFieldProps, "size" | "variant"> {
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "plain";
  placeholder?: string;
  innerRef?: React.RefObject<HTMLSelectElement>;
}

export default class Select extends React.Component<
  PropsWithChildren<SelectProps>
> {
  render() {
    const { size = "md", variant = "outline", innerRef, ...props } = this.props;
    return (
      <NativeSelect.Root
        className={styles.select}
        size={size}
        variant={variant}
      >
        <NativeSelect.Field {...props} ref={innerRef}>
          {this.props.children}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    );
  }
}
