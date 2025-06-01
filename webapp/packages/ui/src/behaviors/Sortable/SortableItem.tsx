import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragIndicator } from "../../icons/svg";
import Card, { CardProps } from "../../layout/Card.guide";
import HStack from "../../layout/HStack.guide";
import Icon from "../../icons/Icon.guide";
import styles from "./Sortable.module.css";

interface SortableItemProps extends CardProps {
  id: string;
}

export default function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card innerRef={setNodeRef} padding="none" {...props} style={style}>
      <HStack alignItems="center">
        <span {...attributes} {...listeners} className={styles.handler}>
          <Icon>
            <DragIndicator />
          </Icon>
        </span>
        {props.children}
      </HStack>
    </Card>
  );
}
