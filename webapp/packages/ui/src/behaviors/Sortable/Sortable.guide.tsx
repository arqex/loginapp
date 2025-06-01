import React, { useCallback, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export interface SortableProps<T extends { id: string }> {
  items: T[];
  onChange: (items: T[]) => void;
  children: React.ReactNode;
}

export default function Sortable<T extends { id: string }>(
  props: SortableProps<T>
) {
  const { items, children, onChange } = props;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        const indices = items.map((i) => i.id);
        const oldIndex = indices.indexOf(active.id);
        const newIndex = indices.indexOf(over?.id);
        const updatedItems = arrayMove(items, oldIndex, newIndex);
        onChange(updatedItems);
      }
    },
    [items, onChange]
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
}
