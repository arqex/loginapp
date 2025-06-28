import { HStack, Text } from "@cataloga/ui-components";
import styles from "./SidebarNavigation.module.css";
import classNames from "classnames";

interface SidebarNavigationTitleProps {
  label: string;
}

export default function SidebarNavigationTitle(
  props: SidebarNavigationTitleProps
) {
  const { label } = props;
  const cn = classNames(styles.title);
  return (
    <HStack alignItems="center" className={cn}>
      <Text className={styles.titleText}>{label}</Text>
    </HStack>
  );
}
