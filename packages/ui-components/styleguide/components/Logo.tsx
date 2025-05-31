import React from "react";

// This is used in the components libray to wrap each
// preview in a theme, with a toggle to switch themes

type LogoState = {
  colorMode: "light" | "dark" | "auto";
};

const colorRegex = new RegExp(/^[0-9A-Fa-f]{6}$/i);
export default class Logo extends React.Component<{}, LogoState> {
  state: LogoState = {
    colorMode: "light",
  };

  render() {
    return (
      <div>
        <h3>Component Library</h3>
      </div>
    );
  }

  _updateRTL = (e) => {
    document.documentElement.dir = e.target.checked ? "rtl" : "ltr";
  };

  _setColorMode = (e) => {
    this.setState({ colorMode: e.target.value });
  };
}
