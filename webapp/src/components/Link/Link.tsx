import { DetailedHTMLProps, AnchorHTMLAttributes } from "react";
import styles from "./Link.module.css";
import classNames from "classnames";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "underlined" | "inherit";
}

export default function Link({
  children,
  className,
  variant = "underlined",
  ...props
}: DetailedHTMLProps<LinkProps, HTMLAnchorElement>) {
  const extraProps: any = {
    className: classNames(styles[variant], className),
    onClick: (e: any) => {
      if (href?.startsWith("#")) {
        e.preventDefault();
      }
      props.onClick?.(e);
    },
  };

  const href = props.href;
  if (href !== undefined) {
    if (href.startsWith("/")) {
      extraProps.href = `/#${href}`;
    } else {
      extraProps.target = "_blank";
      extraProps.rel = "noopener noreferrer";
    }
  }

  return (
    <a {...props} {...extraProps}>
      {children}
    </a>
  );
}
