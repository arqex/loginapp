```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

<VStack>
  <HStack>
    <Checkbox>Default checkbox</Checkbox>
    <Checkbox checked>Checked checkbox</Checkbox>
  </HStack>

  <HStack>
    <Checkbox size="sm">size="sm"</Checkbox>
    <Checkbox size="md">size="md"</Checkbox>
    <Checkbox size="lg">size="lg"</Checkbox>
  </HStack>


  <HStack>
    <Checkbox disabled>Disabled</Checkbox>
    <Checkbox disabled checked>disabled and checked</Checkbox>
  </HStack>

</VStack>