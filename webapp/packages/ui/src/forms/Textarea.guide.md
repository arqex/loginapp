
```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

<VStack>
  <Textarea placeholder="Default textarea" />
  <Textarea resizable={false} placeholder="resizable={false}" />
  <Textarea autoresize placeholder="autoresize" />
  <Textarea placeholder="size='sm'" size="sm" />
  <Textarea placeholder="size='lg'" size="lg"/>
  <Textarea placeholder="disabled" disabled />
</VStack>