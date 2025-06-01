import React from "react";
import { Separator as S, SeparatorProps as SProps } from "@chakra-ui/react";
import styles from "./Separator.module.css";

export default class Separator extends React.Component<SProps> {
  render() {
    return <S {...this.props} className={styles.separator} />;
  }
}
