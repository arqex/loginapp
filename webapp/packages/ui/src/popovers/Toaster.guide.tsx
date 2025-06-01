import React from "react";
import { t } from "./Toaster.utils";
import { Toaster as T, Toast, Portal, HStack } from "@chakra-ui/react";
import { Info, Error, CheckCircle } from "../icons/svg";
import Icon from "../icons/Icon.guide";
import styles from "./Toaster.module.css";

export default class Toaster extends React.Component {
  render() {
    return (
      <Portal>
        <T toaster={t} insetInline={{ mdDown: "4" }}>
          {({ title, type }) => (
            <Toast.Root width={{ md: "sm" }} className={styles[`type_${type}`]}>
              <HStack gap="2" flexGrow={1}>
                {this.renderIcon(type)}
                <Toast.Title flexGrow={1}>{title}</Toast.Title>
              </HStack>
            </Toast.Root>
          )}
        </T>
      </Portal>
    );
  }

  renderIcon(type: string) {
    let icon = <Info />;

    switch (type) {
      case "success":
        icon = <CheckCircle />;
        break;
      case "warning":
      case "error":
        icon = <Error />;
        break;
      default:
        icon = <Info />;
    }
    return <Icon size="md">{icon}</Icon>;
  }
}
