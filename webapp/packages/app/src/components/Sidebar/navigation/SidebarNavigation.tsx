import { MenuItem } from "@loginapp/ui";
import { Home } from "@loginapp/ui/src/icons/svg";
import React from "react";

export default class SidebarNavigation extends React.Component {
  render() {
    const { hash } = window.location;
    return (
      <>
        <MenuItem
          href="/"
          startIcon={<Home />}
          selected={hash === "" || hash === "#/"}
        >
          Home
        </MenuItem>
        <MenuItem
          href="/items_test"
          startIcon={<Home />}
          selected={hash.startsWith("#/items_test")}
        >
          Item test
        </MenuItem>
        <MenuItem href="/sample1" selected={hash.startsWith("#/sample1")}>
          Sample 1
        </MenuItem>
        <MenuItem href="/sample2" selected={hash.startsWith("#/sample2")}>
          Sample 2
        </MenuItem>
      </>
    );
  }

  _getInitialOpenGroup() {
    const { hash } = window.location;
    if (hash.startsWith("#/sample")) {
      console.log("open sample");
      return "sample";
    }
    return null;
  }
}
