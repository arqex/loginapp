```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Input from './Input.guide';
import Select from './Select.guide';
import Textarea from './Textarea.guide';

<VStack>
  <HStack>
    <FormField label="Field with input:">
      <Input placeholder="Default input" />
    </FormField>

    <FormField label="Field with select:">
      <Select placeholder="Default select">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
    </FormField>
  </HStack>

  <HStack>
    <FormField label="Field with caption:" caption="This is the caption messagae">
      <Input placeholder="Default input" />
    </FormField>
  </HStack>

  <HStack>
    <FormField label="Field with error:" error="This is the error messagae">
      <Input placeholder="Default input" />
    </FormField>
  </HStack>


  <HStack>
    <FormField label="Field with helptip" helptip="This is the message to explain the field">
      <Textarea placeholder="Default textarea" />
    </FormField>
  </HStack>


</VStack>