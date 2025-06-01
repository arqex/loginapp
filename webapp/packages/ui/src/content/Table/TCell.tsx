import React from "react";
import { Box, Table as T, TableCellProps } from "@chakra-ui/react";
import styles from "./Table.module.css";
import classNames from "classnames";

interface TCellProps extends Omit<TableCellProps, "align"> {
  align?: "start" | "center" | "end";
}

export default class TCell extends React.Component<TCellProps> {
  render() {
    const { align = "start", ...props } = this.props;
    const classes = classNames(styles.tcell, props.className);
    return (
      <T.Cell {...props} className={classes}>
        <Box display="flex" justifyContent={align}>
          {this.props.children}
        </Box>
      </T.Cell>
    );
  }
}
