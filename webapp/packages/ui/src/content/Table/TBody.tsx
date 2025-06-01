import React from "react";
import { Table as T, TableBodyProps } from "@chakra-ui/react";

interface TBodyProps extends TableBodyProps {}

export default class TBody extends React.Component<TBodyProps> {
  render() {
    return <T.Body {...this.props}>{this.props.children}</T.Body>;
  }
}
