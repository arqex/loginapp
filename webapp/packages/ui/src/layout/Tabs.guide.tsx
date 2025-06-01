import React from "react";
import { Tabs as T, TabsRootProps as TProps } from "@chakra-ui/react";
import styles from "./Tabs.module.css";

interface TabsProps extends Omit<TProps, "variant" | "lazyMount"> {
  tabs: { [id: string]: React.ReactNode };
}

export default class Tabs extends React.Component<TabsProps> {
  render() {
    const { tabs, children, ...props } = this.props;
    return (
      <T.Root lazyMount variant="line" {...props} className={styles.tabs}>
        <T.List>
          {Object.keys(tabs).map((key) => (
            <T.Trigger key={key} value={key}>
              {tabs[key]}
            </T.Trigger>
          ))}
        </T.List>
        {children}
      </T.Root>
    );
  }
}
