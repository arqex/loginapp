import React from "react";
import { logout } from "../../../application/auth/auth.service";
import {
  Popover,
  Avatar,
  VStack,
  MenuItem,
  Separator,
  Text,
} from "@loginapp/ui";
import { Logout } from "@loginapp/ui/src/icons/svg";
import { getAuthContext } from "../../../application/auth/auth.context";

export default class UserMenu extends React.Component {
  render() {
    const { user } = getAuthContext()!;
    return (
      <Popover>
        <Avatar name={user.name} size="sm" />
        <VStack gap="0">
          <MenuItem
            size="lg"
            startElement={<Avatar name={user.name} size="sm" />}
          >
            <VStack alignItems="start" gap="0.5">
              <Text lineHeight="1em">{user.name}</Text>
              <Text lineHeight="1em" size="sm" color="light">
                {user.email}
              </Text>
            </VStack>
          </MenuItem>
          <Separator />
          <MenuItem startIcon={<Logout />} onClick={this._logout}>
            Logout
          </MenuItem>
        </VStack>
      </Popover>
    );
  }

  _logout = async () => {
    logout();
  };
}
