import React from "react";
import styles from "./Button.module.css";
import { Button as CB, ButtonProps } from "@chakra-ui/react";

export default class Button extends React.Component<ButtonProps> {
  render() {
    return <CB {...this.props} className={styles.button} colorScheme="cyan" />;
  }
}
