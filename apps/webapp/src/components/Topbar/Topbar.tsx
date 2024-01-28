import React, { PropsWithChildren } from "react";
import {
  isSidebarVisible,
  setSidebarVisibility,
} from "../../application/layout/layout.service";
import IconButton from "../Button/IconButton";
import styles from "./Topbar.module.css";
import {
  getColorScheme,
  toggleColorScheme,
} from "../../application/theme/theme.service";
import UserMenu from "./components/UserMenu";
import { Flex, HStack } from "@chakra-ui/react";

interface TopbarProps {}
interface TopbarState {}

export default class Topbar extends React.Component<
  PropsWithChildren<TopbarProps>,
  TopbarState
> {
  state: TopbarState = {};
  render() {
    const colorScheme = getColorScheme();
    const sidebarVisible = isSidebarVisible();
    return (
      <Flex
        justifyContent="space-between"
        alignItems="center"
        h="60px"
        p="0 16px"
        borderBottom="1px solid var(--border)"
      >
        <div className={styles.headingControls}>
          <IconButton
            icon="menu"
            onClick={() => setSidebarVisibility(!sidebarVisible)}
          />
        </div>
        <div className={styles.tailingControls}>
          <HStack>
            <IconButton
              icon={colorScheme === "dark" ? "moon" : "sun"}
              onClick={() => toggleColorScheme()}
            />
            <UserMenu />
          </HStack>
        </div>
      </Flex>
    );
  }
}
