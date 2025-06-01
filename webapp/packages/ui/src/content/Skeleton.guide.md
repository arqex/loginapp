```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

<VStack>
  <HStack gap="30px">
    <VStack>
      <p>size: 60, makes circle</p>
      <Skeleton size="60px" />
    </VStack>

    <VStack>
      <p>lines: 2, makes text</p>
      <Skeleton lines="2" />
    </VStack>

    <VStack>
      <p>No size or lines, make custom skeleton</p>
      <Skeleton height="120px" />
    </VStack>

  </HStack>
</VStack>