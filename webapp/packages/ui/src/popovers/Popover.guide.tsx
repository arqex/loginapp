import React from "react";
import {
  Popover as P,
  PopoverContentProps,
  PopoverRootProps,
  PopoverTriggerProps,
  Portal,
} from "@chakra-ui/react";
import styles from "./Popover.module.css";

interface PopoverProps extends Omit<PopoverRootProps, "onOpenChange"> {
  children: [React.ReactNode, React.ReactNode];
  position?: "start" | "end" | "cover";
  offset?: number;
  onOpenChange?: (isOpen: boolean) => void;
  contentWrapperProps?: PopoverContentProps;
  triggerProps?: PopoverTriggerProps;
}

export default class Popover extends React.Component<PopoverProps> {
  triggerRef = React.createRef<HTMLButtonElement>();

  render() {
    const {
      position = "start",
      children,
      contentWrapperProps = {},
      triggerProps = {},
      ...props
    } = this.props;
    const [trigger, content] = React.Children.toArray(children);
    return (
      <P.Root
        lazyMount
        unmountOnExit
        portal
        {...props}
        onOpenChange={this._onOpenChange}
        positioning={getPositioning(position, this.triggerRef)}
      >
        <P.Trigger
          cursor="pointer"
          ref={this.triggerRef}
          className={styles.trigger}
          {...triggerProps}
        >
          {trigger}
        </P.Trigger>
        <P.Positioner>
          <P.Content {...contentWrapperProps}>{content}</P.Content>
        </P.Positioner>
      </P.Root>
    );
  }

  _onOpenChange = ({ open }: { open: boolean }) => {
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  componentDidMount(): void {
    this.forceUpdate();
  }
}

function getPositioning(
  position: "start" | "end" | "cover",
  ref: React.RefObject<HTMLButtonElement>
) {
  if (position === "start") {
    return { placement: "bottom-start" };
  } else if (position === "end") {
    return { placement: "bottom-end" };
  }
  const triggerHeight = ref.current?.clientHeight || 36;
  return {
    placement: "bottom-start",
    sameWidth: true,
    offset: { mainAxis: -triggerHeight },
  };
}
