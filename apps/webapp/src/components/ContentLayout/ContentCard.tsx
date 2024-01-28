import React, { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";

import styles from "./ContentLayout.module.css";

interface ContentCardProps {
  children?: React.ReactNode;
  padding?: string;
}
interface ContentCardState {}

export default class ContentCard extends React.Component<
  PropsWithChildren<ContentCardProps>,
  ContentCardState
> {
  state: ContentCardState = {};
  render() {
    const { children, padding } = this.props;
    return (
      <Box w="100%" className={styles.contentCard} p={padding}>
        {children}
      </Box>
    );
  }
}
