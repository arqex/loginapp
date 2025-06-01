import { Switch as S } from "@chakra-ui/react";
import * as React from "react";
import styles from "./Toggle.module.css";
import classNames from "classnames";

export interface ToggleProps extends S.RootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rootRef?: React.RefObject<HTMLLabelElement | null>;
  position?: "start" | "end";
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  props,
  ref
) {
  const {
    inputProps,
    children,
    rootRef,
    position = "end",
    className,
    ...rest
  } = props;

  const cns = classNames(styles.toggle, className);

  return (
    <S.Root ref={rootRef} className={cns} {...rest}>
      <S.HiddenInput ref={ref} {...inputProps} />
      {position === "end" && children != null && <S.Label>{children}</S.Label>}
      <S.Control />
      {position === "start" && children != null && (
        <S.Label>{children}</S.Label>
      )}
    </S.Root>
  );
});

export default Toggle;
