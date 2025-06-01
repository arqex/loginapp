import React from "react";
import VStack from "../../src/layout/VStack.guide";

// This is used in the components libray to wrap each
// preview in a theme, with a toggle to switch themes
export default class Logo extends React.Component<{}> {
  render() {
    return (
      <VStack>
        <h3>Component Library</h3>
      </VStack>
    );
  }

  _updateRTL = (e: any) => {
    document.documentElement.dir = e.target.checked ? "rtl" : "ltr";
  };
}
