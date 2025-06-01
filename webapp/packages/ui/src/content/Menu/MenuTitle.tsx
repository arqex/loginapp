import React from "react";
import Text from "../../texts/Text.guide";

interface MenuTitleProps {
  children: React.ReactNode;
  bold?: boolean;
}

export default class MenuTitle extends React.Component<MenuTitleProps> {
  render() {
    return (
      <Text bold={this.props.bold} truncate lineHeight="1em">
        {this.props.children}
      </Text>
    );
  }
}
