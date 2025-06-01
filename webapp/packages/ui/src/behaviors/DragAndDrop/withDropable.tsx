import React, {ComponentType} from 'react';
import {
	Droppable,
	DroppableProvided,
	DroppableStateSnapshot,
} from 'react-beautiful-dnd';

export function withDropable<
	Props extends {id: string; isDropDisabled: boolean}
>(Component: ComponentType<Props>) {
	const withDropable = (props: Props) => {
		return (
			<Droppable droppableId={props.id} isDropDisabled={props.isDropDisabled}>
				{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
					<Component
						{...snapshot}
						innerRef={provided.innerRef}
						placeholder={provided.placeholder}
						{...provided.droppableProps}
						{...(props as Props)}
					/>
				)}
			</Droppable>
		);
	};
	withDropable.displayName = `withDropable(${
		Component.displayName || Component.name || 'component'
	})`;
	return withDropable;
}
