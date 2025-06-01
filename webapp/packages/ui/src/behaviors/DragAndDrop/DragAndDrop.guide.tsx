import React, { PropsWithChildren } from "react";
import { DragDropContext, Responders } from "react-beautiful-dnd";

export interface DragAndDropProps {
  onBeforeCapture?: Responders["onBeforeCapture"];
  onBeforeDragStart?: Responders["onBeforeDragStart"];
  onDragStart?: Responders["onDragStart"];
  onDragUpdate?: Responders["onDragUpdate"];
  onDragEnd: Responders["onDragEnd"];
  /** Read out by screen readers when focusing on a drag handle */
  dragHandleUsageInstructions?: string;
}

export default function DragAndDrop({
  onDragEnd,
  children,
}: PropsWithChildren<DragAndDropProps>) {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
}
