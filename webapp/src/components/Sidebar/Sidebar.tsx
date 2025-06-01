import React, { PropsWithChildren } from "react";
import {
  isSidebarVisible,
  setSidebarVisibility,
} from "../../application/layout/layout.service";
import styles from "./Sidebar.module.css";
import SidebarContent from "./SidebarContent";
import SidebarDrawer from "./SidebarDrawer";

interface SidebarProps {}
interface SidebarState {}

export default class Sidebar extends React.Component<
  PropsWithChildren<SidebarProps>,
  SidebarState
> {
  state: SidebarState = {};

  render() {
    return (
      <>
        <SidebarContent />
        <SidebarDrawer isOpen={isSidebarVisible()} onClose={this._closeDrawer}>
          <SidebarContent />
        </SidebarDrawer>
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
