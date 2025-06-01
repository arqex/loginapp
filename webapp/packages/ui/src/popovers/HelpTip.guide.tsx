import React, { PropsWithChildren } from "react";
import { Popover } from "@chakra-ui/react";
import { Help } from "../icons/svg";
import styles from "./HelpTip.module.css";
import buttonStyles from "../buttons/Button.module.css";
import classNames from "classnames";
import { Icon } from "../icons";
import Box from "../layout/Box.guide";

interface HelpTipProps {}

export default class HelpTip extends React.Component<
  PropsWithChildren<HelpTipProps>
> {
  render() {
    const triggerClasses = classNames(
      styles.helpIcon,
      buttonStyles.iconButton,
      buttonStyles.sm,
      buttonStyles.primary
    );
    return (
      <Popover.Root lazyMount unmountOnExit>
        <Popover.Trigger className={styles.trigger}>
          <Box className={triggerClasses}>
            <Icon size="md">
              <Help />
            </Icon>
          </Box>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>{this.props.children}</Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    );
  }
}
