import React from "react";
import { Table as T, TableHeaderProps } from "@chakra-ui/react";

interface THeadProps extends TableHeaderProps {}

export default class THead extends React.Component<THeadProps> {
  render() {
    return (
      <T.Header {...this.props}>
        <T.Row>{this.props.children}</T.Row>
      </T.Header>
    );
  }
}
