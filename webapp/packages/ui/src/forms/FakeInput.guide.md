```jsx
import FakeInput from './FakeInput.guide';
import Tag from '../content/Tag.guide';
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

<VStack>
  <HStack>
    <FakeInput size="sm">
      Small
    </FakeInput>
    <FakeInput size="md">
      Medium
    </FakeInput>
    <FakeInput size="lg">
      Large
    </FakeInput>
  </HStack>

  <HStack>
    <FakeInput>{null}</FakeInput>
  </HStack>
</VStack>