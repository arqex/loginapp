import React from "react";
import { Collapsible as C } from "@chakra-ui/react";

interface CollapsibleProps {
  open?: boolean;
  children: React.ReactNode;
}

export default class Collapsible extends React.Component<CollapsibleProps> {
  render() {
    const { children, open, onToggle } = this.props;
    return (
      <C.Root open={open} onOpenChange={onToggle} lazyLoad>
        <C.Content>{children}</C.Content>
      </C.Root>
    );
  }
}
