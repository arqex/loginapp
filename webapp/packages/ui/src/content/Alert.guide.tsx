import React, { PropsWithChildren } from "react";
import { Alert as A, Float, IconButton } from "@chakra-ui/react";
import { Info, Error, CheckCircle, Close } from "../icons/svg";
import Icon from "../icons/Icon.guide";

interface AlertProps {
  status: "info" | "success" | "warning" | "error";
  withIcon?: boolean;
  onClose?: () => void;
}

export default class Alert extends React.Component<
  PropsWithChildren<AlertProps>
> {
  render() {
    const { status, children, withIcon = true, onClose, ...props } = this.props;
    return (
      <A.Root {...props} status={status}>
        {withIcon && <A.Indicator>{<Icon>{this.getIcon()}</Icon>}</A.Indicator>}
        <A.Title>{children}</A.Title>
        {onClose && this.renderClose()}
      </A.Root>
    );
  }

  getIcon() {
    switch (this.props.status) {
      case "info":
        return <Info />;
      case "success":
        return <CheckCircle />;
      default:
        return <Error />;
    }
  }

  renderClose() {
    const { onClose } = this.props;
    return (
      <Float position="absolute" top={6} right={6}>
        <IconButton variant="transparent" onClick={onClose}>
          <Close />
        </IconButton>
      </Float>
    );
  }
}
