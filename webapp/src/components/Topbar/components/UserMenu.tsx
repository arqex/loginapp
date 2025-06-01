import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Logout as LogoutIcon } from "@mui/icons-material";

import React, { PropsWithChildren } from "react";
import styles from "./UserMenu.module.css";
import { userLoader } from "../../../business/user/user.loaders";
import { apiClient } from "../../../application/stores/apiClient";
import { getAuthenticatedId } from "../../../application/auth/auth.selector";
import { logout } from "../../../application/auth/auth.service";

interface UserMenuProps {}
interface UserMenuState {}

export default class UserMenu extends React.Component<
  PropsWithChildren<UserMenuProps>,
  UserMenuState
> {
  state: UserMenuState = {};
  render() {
    const { data: user } = userLoader(apiClient, getAuthenticatedId());
    return (
      <Menu>
        <MenuButton>
          <Avatar name="User name" size="md" />
        </MenuButton>
        <MenuList w="300px">
          <HStack
            p="0 16px 8px"
            borderBottom="1px solid var(--border)"
            mb="8px"
          >
            <Avatar name="User name" size="sm" />
            <VStack alignItems="start" spacing="0">
              <Text as="div">User name</Text>
              <Text as="div" fontSize="sm">
                {user?.email}
              </Text>
            </VStack>
          </HStack>
          <MenuItem p="8px 16px" onClick={this._logout}>
            <HStack>
              <LogoutIcon /> <span>Log out</span>
            </HStack>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  _logout = async () => {
    logout();
  };
}
