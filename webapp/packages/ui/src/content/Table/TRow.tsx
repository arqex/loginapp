import React from "react";
import { Table as T, TableRowProps } from "@chakra-ui/react";

interface TRowProps extends TableRowProps {}

export default class TRow extends React.Component<TRowProps> {
  render() {
    return <T.Row {...this.props}>{this.props.children}</T.Row>;
  }
}
