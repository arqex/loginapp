Drag and Drop build around https://github.com/atlassian/react-beautiful-dnd

This is the quite low level, we will probably implament something like `<DragableItemsList>` to make it easier to create a simple list that is re orderable.

Basic example

```jsx
import {withDropable} from './withDropable.tsx';
import {withDraggable} from './withDraggable.tsx';
import DragItem from './DragItem';

const [items, setItems] = React.useState([
	{
		id: '1',
		text: 'Write a cool JS library',
	},
	{
		id: '2',
		text: 'Make it generic enough',
	},
	{
		id: '3',
		text: 'Write README',
	},
	{
		id: '4',
		text: 'Create some examples',
	},
	{
		id: '5',
		text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
	},
	{
		id: '6',
		text: '???',
	},
	{
		id: '7',
		text: 'PROFIT',
	},
]);

const _onDragEnd = ({destination,source,draggableId}) => {
	if ( !destination) return;
	if ( destination.index === source.index ) return;

	const newItems = [...items];
	const item = newItems.splice(source.index,1);
	newItems.splice(destination.index,0, item[0]);
	setItems(newItems);
	console.log('Items reordered', newItems);
};


const Item =  withDraggable(({id,text, draggable}) => {
	const {draggableProps, dragHandleProps, innerRef} = draggable.provided;
	const { isDragging } = draggable.snapshot;
	const {style, ...other} = draggableProps;
	return (<DragItem innerRef={innerRef} dragHandleProps={dragHandleProps} {...other} style={{...style,marginBottom: 8}} isDragging={isDragging} >
				The id is: {id}
			</DragItem>);
});

const Dropzone = withDropable(({children, innerRef, style,placeholder,draggingOverWith,draggingFromThisWith,isUsingPlaceholder,
isDropDisabled,...other}) => {
	return(<div ref={innerRef} { ...other} style={{...style,width: 300}} >{children}{placeholder}</div>)
});



<DragAndDrop onDragEnd={_onDragEnd} >
	<Dropzone id="myDropzone">
		{items.map( (item, index)=> {
			return <Item key={item.id} {...{...item,index}} />
		})}
	</Dropzone>
</DragAndDrop>


```

More complex example with draging between two lists

```jsx
import {withDropable} from './withDropable.tsx';
import {withDraggable} from './withDraggable.tsx';

import Card from '../../layout/Card.guide';

const [items, setItems] = React.useState([[
	{
		id: '1',
		text: 'Write a cool JS library',
	},
	{
		id: '2',
		text: 'Make it generic enough',
	},
	{
		id: '3',
		text: 'Write README',
	},
	{
		id: '4',
		text: 'Create some examples',
	},
	{
		id: '5',
		text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
	},
	],[
	{
		id: '6',
		text: '???',
	},
	{
		id: '7',
		text: 'PROFIT',
	},]]);

const _onDragEnd = ({destination,source,draggableId}) => {
	if ( !destination) return;
	if ( destination.droppableId === source.droppableId && destination.index === source.index ) return;

	const newItems = [...items];
	const item = newItems[parseInt(source.droppableId)].splice(source.index,1);
	newItems[parseInt(destination.droppableId)].splice(destination.index,0, item[0]);
	setItems(newItems);
};


const DragItem =  withDraggable(({id,text, draggable}) => {
	const {draggableProps, dragHandleProps, innerRef} = draggable.provided;
	const {style, ...other} = draggableProps;
	return (<Card border innerRef={innerRef} {...other} style={{...style,marginBottom: 8}} >
				<div style={{width:20, height: 20, background: 'red'}} {...dragHandleProps} />The id is: {id}
			</Card>);
});

const Dropzone = withDropable(({children, innerRef, style, isDraggingOver, placeholder, ...other}) => {
	return(<div ref={innerRef} { ...other} style={{...style,width: 320, padding: 10, background: isDraggingOver? 'var(--color-info-bg)':undefined}}>{children}{placeholder}</div>)
});


<div style={{width: '100%', display: 'flex', gap: 20}}>
	<DragAndDrop onDragEnd={_onDragEnd} >
		<Dropzone id="0">
			{items[0].map( (item, index)=> {
				return <DragItem key={item.id} {...{...item,index}} />
			})}
		</Dropzone>
		<Dropzone id="1">
			{items[1].map( (item, index)=> {
				return <DragItem key={item.id} {...{...item,index}} />
			})}
		</Dropzone>
	</DragAndDrop>
</div>

```
