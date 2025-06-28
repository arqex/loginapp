import React from "react";
import { isMobileLayout } from "../../application/layout/layout.service";
import styles from "./Topbar.module.css";
import {
  getColorScheme,
  toggleColorScheme,
} from "../../application/theme/theme.service";
import UserMenu from "./components/UserMenu";
import { HStack, IconButton } from "@loginapp/ui";
import { DarkMode, LightMode } from "@loginapp/ui/chakra-snippets/color-mode";
import { Menu } from "@loginapp/ui/src/icons/svg";

interface TopbarProps {
  showAppMenuToggle?: boolean;
  onAppShowMenu?: () => void;
  children?: React.ReactNode;
}

export default class Topbar extends React.Component<TopbarProps> {
  render() {
    const colorScheme = getColorScheme();
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
            <IconButton onClick={() => toggleColorScheme()}>
              {colorScheme === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
            <UserMenu />
          </HStack>
        </div>
      </HStack>
    );
  }
}
