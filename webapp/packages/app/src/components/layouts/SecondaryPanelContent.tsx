import React from "react";
import styles from "./SecondaryPanel.module.css";
import { VStack, HStack, Heading, IconButton } from "@loginapp/ui";
import { Arrow } from "@loginapp/ui/src/icons/svg";

interface SecondaryPanelContentProps {
  title?: string;
  children: React.ReactNode;
  gap?: number;
  onBack?: () => void;
  backTooltip?: string;
}

export default class SecondaryPanelContent extends React.Component<SecondaryPanelContentProps> {
  render() {
    const { title, children, gap = 4 } = this.props;
    return (
      <VStack gap={4} align="stretch" className={styles.content}>
        <HStack>
          {this.renderBackButton()}
          <Heading size="sm">{title}</Heading>
        </HStack>
        <VStack gap={gap} align="stretch">
          {children}
        </VStack>
      </VStack>
    );
  }

  renderBackButton() {
    const { onBack, backTooltip } = this.props;
    if (!onBack) return null;
    if (!backTooltip)
      throw new Error("backTooltip is required when onBack is provided");

    return (
      <IconButton
        direction="back"
        variant="transparent"
        size="sm"
        tooltip={backTooltip}
        onClick={onBack}
      >
        <Arrow />
      </IconButton>
    );
  }
}
