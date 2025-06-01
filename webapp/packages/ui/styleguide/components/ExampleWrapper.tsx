import React, { PropsWithChildren } from "react";
import { Theme } from "../../src/theme/Theme";
export default class ExampleWrapper extends React.Component<PropsWithChildren> {
  render() {
    return (
      // Examples are NOT part of the same react context as
      // the styleguide, so re adding theme context here
      <Theme>{this.props.children}</Theme>
    );
  }
}
