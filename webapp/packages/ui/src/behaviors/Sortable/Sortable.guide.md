```jsx
import VStack from '../../layout/VStack.guide';
import HStack from '../../layout/HStack.guide';
import SortableItem from './SortableItem';

const startingItems = [
  {id: '1', title: 'Item 1'},
  {id: '2', title: 'Item 2'},
  {id: '3', title: 'Item 3'}
];

const [items, setItems] = React.useState(startingItems);

<VStack>
    <Sortable items={items} onChange={ items => setItems(items)}>
      { items.map( item => (
        <SortableItem id={item.id} key={item.id}>
          { item.title }
        </SortableItem>
      ))}
    </Sortable>
</VStack>