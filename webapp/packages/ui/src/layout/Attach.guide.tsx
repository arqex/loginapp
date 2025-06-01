import { Group } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

interface AttachProps {
  children: React.ReactNode;
}

export default class Attach extends React.Component<
  PropsWithChildren<AttachProps>
> {
  render() {
    return <Group attached>{this.props.children}</Group>;
  }
}
