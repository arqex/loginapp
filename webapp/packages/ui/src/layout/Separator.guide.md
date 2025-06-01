```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Card from './Card.guide';

<VStack>
  <HStack>
    Horizontal
    <Card width="300px" height="300px">
      <Separator />
    </Card>
  </HStack>

  <HStack>
    Vertical
    <Card width="300px" height="300px">
      <HStack height="300px" alignItems="stretch">
        <Separator orientation="vertical" />
      </HStack>
    </Card>
  </HStack>
</VStack>