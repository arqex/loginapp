import React from "react";
import {
  Tooltip as CTooltip,
  TooltipProps as CTooltipProps,
} from "../../chakra-snippets/tooltip";

interface TooltipProps extends CTooltipProps {
  content?: string;
}

export default class Tooltip extends React.Component<TooltipProps> {
  render() {
    if (!this.props.content) return this.props.children;

    const {
      showArrow = true,
      positioning = { placement: "top" },
      openDelay = 400,
      size = "sm",
      borderRadius = 4,
    } = this.props;
    return (
      <CTooltip
        showArrow={showArrow}
        aria-label={this.props["aria-label"] || this.props.content}
        positioning={positioning}
        openDelay={openDelay}
        closeDelay={100}
        size={size}
        borderRadius={borderRadius}
        {...this.props}
      />
    );
  }
}
