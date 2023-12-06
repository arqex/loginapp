import { DetailedHTMLProps, AnchorHTMLAttributes } from "react";
import { getRouter } from "../../application/routing/router";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  onClick?: (e: any) => void;
}

export default function Link({
  children,
  ...props
}: DetailedHTMLProps<LinkProps, HTMLAnchorElement>) {
  const extraProps: any = {};
  const router = getRouter();
  let href = props.href || "";
  if (href.startsWith("?")) {
    href = router.location.pathname + href;
  }

  if (href.startsWith("/") || href.startsWith("?")) {
    extraProps.onClick = (e: any) => {
      if (props.onClick) {
        props.onClick(e);
      }
      if (!e.defaultPrevented) {
        e.preventDefault();
        getRouter().push(href);
      }
    };
  } else {
    extraProps.target = "_blank";
    extraProps.rel = "noopener noreferrer";
  }

  return (
    <a {...props} {...extraProps}>
      {children}
    </a>
  );
}
