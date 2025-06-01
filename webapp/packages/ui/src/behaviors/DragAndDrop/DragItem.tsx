import React from "react";
import Card, { CardProps } from "../../layout/Card.guide";
import { Icon } from "../../icons";
import DragIndicator from "../../icons/svg/DragIndicator";
import { HStack } from "@chakra-ui/react";
import styles from "./Drag.module.css";
import classNames from "classnames";

interface DragItemProps extends CardProps {
  dragHandleProps: any;
  innerRef: React.Ref<HTMLDivElement>;
  isDragging?: boolean;
}

export default class DragItem extends React.Component<DragItemProps> {
  state = {
    isDragging: false,
  };

  render() {
    const { dragHandleProps, innerRef, children, isDragging, ...props } =
      this.props;
    const classes = classNames(isDragging && styles.dragging);
    return (
      <Card innerRef={innerRef} padding="sm" {...props} className={classes}>
        <HStack alignItems="center">
          <span {...dragHandleProps} className={styles.handler}>
            <Icon>
              <DragIndicator />
            </Icon>
          </span>
          <div>{children}</div>
        </HStack>
      </Card>
    );
  }
}
