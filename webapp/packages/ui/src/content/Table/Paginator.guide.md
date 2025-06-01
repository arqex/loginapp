```jsx
import VStack from '../../layout/VStack.guide';
import HStack from '../../layout/HStack.guide';
import PaginatorControls from './PaginatorControls';

const items = [];
for(let i = 0; i<20; i++ ){
  items.push('Item ' + i);
}

<VStack>
  <HStack>
    <Paginator pageSize={5} allItems={items}>
      {(pageItems, controlsProps) => (
        <VStack>
          <PaginatorControls {...controlsProps} />
          { pageItems.map( it => <p>{it}</p>)}
        </VStack>
      )}
    </Paginator>
  </HStack>
</VStack>