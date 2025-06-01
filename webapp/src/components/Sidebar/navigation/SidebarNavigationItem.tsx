import { HStack, Text } from "@chakra-ui/react";
import Icon, { IconType } from "../../Icon/Icon";
import Link from "../../Link/Link";
import styles from "./SidebarNavigation.module.css";
import classNames from "classnames";

interface SidebarNavigationItemProps {
  icon?: IconType;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export default function SidebarNavigationItem(
  props: SidebarNavigationItemProps
) {
  const { icon, label, href, onClick, isActive } = props;
  const cn = classNames(styles.item, isActive && styles.item_active);
  return (
    <Link href={href} onClick={onClick} className={cn} variant="inherit">
      <HStack>
        {icon && <Icon name={icon} />}
        <Text>{label}</Text>
      </HStack>
    </Link>
  );
}
