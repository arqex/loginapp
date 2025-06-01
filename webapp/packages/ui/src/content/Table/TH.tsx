import React from "react";
import { Box, Table as T, TableCellProps } from "@chakra-ui/react";
import styles from "./Table.module.css";

interface THProps extends Omit<TableCellProps, "align"> {
  align?: "start" | "center" | "end";
  innerRef?: React.RefObject<HTMLTableCellElement>;
}

export default class TH extends React.Component<THProps> {
  render() {
    const { align = "start", innerRef } = this.props;
    return (
      <T.ColumnHeader {...this.props} ref={innerRef} className={styles.th}>
        <Box display="flex" justifyContent={align}>
          {this.props.children}
        </Box>
      </T.ColumnHeader>
    );
  }
}
