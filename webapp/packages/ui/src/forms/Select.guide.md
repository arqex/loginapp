```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

<VStack>
  <HStack>
    <Select placeholder="Default">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  </HStack>
  <HStack>
    <Select placeholder="size='sm'" size='sm'>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
    <Select placeholder="size='md'" size='md'>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
    <Select placeholder="size='lg'" size='lg'>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  </HStack>

  <HStack>
    <Select placeholder="variant='outline'" variant='outline'>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>

    <Select placeholder="variant='plain'" variant='plain'>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  </HStack>

  <HStack>
    <Select placeholder="disabled" disabled>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>
  </HStack>
</VStack>