import React from "react";
import SidebarNavigationGroup from "./SidebarNavigationGroup";
import SidebarNavigationItem from "./SidebarNavigationItem";
import { Box } from "@chakra-ui/react";
import styles from "./SidebarNavigation.module.css";

interface SidebarNavigationProps {}
interface SidebarNavigationState {
  openGroup: string | null;
}

export default class SidebarNavigation extends React.Component<
  SidebarNavigationProps,
  SidebarNavigationState
> {
  state = {
    openGroup: this._getInitialOpenGroup(),
  };
  render() {
    const { openGroup } = this.state;
    const { hash } = window.location;
    return (
      <Box className={styles.sidebarNavigation}>
        <SidebarNavigationItem
          href="/"
          icon="home"
          label="Home"
          isActive={hash === "" || hash === "#/"}
        />
        <SidebarNavigationGroup
          isOpen={openGroup === "sample"}
          header={
            <SidebarNavigationItem
              icon="star"
              onClick={() => this.setState({ openGroup: "sample" })}
              label="Samples"
            />
          }
        >
          <SidebarNavigationItem
            href="/sample1"
            label="Sample 1"
            isActive={hash.startsWith("#/sample1")}
          />
          <SidebarNavigationItem
            href="/sample2"
            label="Sample 2"
            isActive={hash.startsWith("#/sample2")}
          />
        </SidebarNavigationGroup>
      </Box>
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
