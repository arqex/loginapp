The Popover component expects 2 children, the first would be the trigger to open and the second the content of the popover.

```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Button from '../buttons/Button.guide';
import Text from '../texts/Text.guide';

<VStack>
  <HStack>
    <Popover position="start" content="">
      <Button as="div">Position start</Button>
      <Text>Here's the content. This is the default position</Text>
    </Popover>

    <Popover position="end">
      <Button as="div">Position end</Button>
      <Text>Here's the content</Text>
    </Popover>

    <Popover position="cover">
      <Button as="div">Position cover</Button>
      <Text>Here's the content</Text>
    </Popover>
  </HStack>
</VStack>