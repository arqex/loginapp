import React, {ComponentType} from 'react';
import {
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
} from 'react-beautiful-dnd';

export type withDraggableProps = {
	id: string;
	index: number;
	isDragDisabled: boolean;
	draggable: DraggableProp;
};

export type DraggableProp = {
	provided: DraggableProvided;
	snapshot: DraggableStateSnapshot;
};

export function withDraggable<Props extends withDraggableProps>(
	Component: ComponentType<Props>
) {
	type draggableProps = Omit<Props, 'draggable'>;
	const withDraggable = (props: draggableProps) => {
		return (
			<Draggable
				draggableId={props.id}
				index={props.index}
				isDragDisabled={props.isDragDisabled}
			>
				{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
					<Component
						{...(props as Props)}
						draggable={{provided, snapshot} as DraggableProp}
					/>
				)}
			</Draggable>
		);
	};
	withDraggable.displayName = `withDraggable(${
		Component.displayName || Component.name || 'component'
	})`;
	return withDraggable;
}
