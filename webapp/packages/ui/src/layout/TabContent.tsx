import React from "react";
import { Tabs as T, TabsContentProps as TCProps } from "@chakra-ui/react";

interface TabContentProps extends TCProps {
  children: React.ReactNode;
}

export default class TabContent extends React.Component<TabContentProps> {
  render() {
    const { children, ...props } = this.props;
    return <T.Content {...props}>{children}</T.Content>;
  }
}
