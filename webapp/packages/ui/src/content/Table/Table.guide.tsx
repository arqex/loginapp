import React from "react";
import { Table as T, TableRootProps } from "@chakra-ui/react";

interface TableProps extends TableRootProps {
  innerRef?: React.Ref<HTMLTableElement>;
}

export default class Table extends React.Component<TableProps> {
  render() {
    const { innerRef, ...rest } = this.props;
    return <T.Root {...rest} ref={innerRef} interactive stickyHeader />;
  }
}
