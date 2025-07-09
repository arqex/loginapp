import React from "react";
import { isMobileLayout } from "../../application/layout/layout.service";
import styles from "./Topbar.module.css";
import UserMenu from "./components/UserMenu";
import { HStack, IconButton } from "@loginapp/ui";
import { Menu } from "@loginapp/ui/src/icons/svg";

interface TopbarProps {
  showAppMenuToggle?: boolean;
  onAppShowMenu?: () => void;
  children?: React.ReactNode;
}

export default class Topbar extends React.Component<TopbarProps> {
  render() {
    const { showAppMenuToggle, onAppShowMenu } = this.props;
    const showToggle = showAppMenuToggle || isMobileLayout();
    return (
      <HStack
        justifyContent="space-between"
        alignItems="center"
        h="60px"
        p="0 1.5rem"
      >
        <div className={styles.headingControls}>
          {showToggle && (
            <IconButton onClick={onAppShowMenu}>{<Menu />}</IconButton>
          )}
        </div>
        <div className={styles.tailingControls}>
          <HStack>
            <UserMenu />
          </HStack>
        </div>
      </HStack>
    );
  }
}
