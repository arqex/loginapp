import React from "react";
import {
  isSidebarVisible,
  setSidebarVisibility,
} from "../../application/layout/layout.service";
import SidebarContent from "./SidebarContent";

interface SidebarProps {
  children?: React.ReactNode;
}

export default class Sidebar extends React.Component<SidebarProps> {
  render() {
    const { children } = this.props;
    return (
      <>
        <SidebarContent>{children}</SidebarContent>
      </>
    );
  }

  _closeDrawer = () => {
    setSidebarVisibility(false);
  };

  _handleResize = () => {
    const width = window.innerWidth;
    const isVisible = isSidebarVisible();
    if (isVisible && width >= 960) {
      setSidebarVisibility(false);
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this._handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this._handleResize);
  }
}
