import React, { useCallback, useRef, useState } from "react";
import { Popover } from "../popovers";
import styles from "./forms.module.css";

interface InputWithPopupProps {
  children: [React.ReactNode, React.ReactNode];
}

const InputWithPopup: React.FC<InputWithPopupProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const onFocus = useCallback(
    (e: FocusEvent) => {
      if (!open && !e.target?.id?.includes("trigger")) {
        setOpen(true);
      }
    },
    [open]
  );

  const onBlur = useCallback(
    (e: FocusEvent) => {
      setTimeout(() => {
        if (open) {
          const focusInContainer = containerRef.current?.contains(
            document.activeElement
          );
          if (!focusInContainer && !e.target?.id?.includes("trigger")) {
            setOpen(false);
          }
        }
      });
    },
    [open]
  );

  return (
    <div
      ref={containerRef}
      onFocus={onFocus}
      onBlur={onBlur}
      className={styles.popupContainer}
    >
      <Popover
        open={open}
        triggerProps={{
          tabIndex: -1,
          disabled: true,
          className: styles.popupPlaceholder,
        }}
        autoFocus={false}
        portalled={false}
        closeOnInteractOutside={false}
      >
        <div />
        {children[1]}
      </Popover>
      {children[0]}
    </div>
  );
};

export default InputWithPopup;
