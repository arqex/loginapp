```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Cancel from '../icons/svg/Cancel';
import Icon from '../icons/Icon.guide';
import InputAddon from './InputAddon';
import Attach from '../layout/Attach.guide';

<VStack>
  <HStack>
    <Input placeholder="Default" />
  </HStack>
  <HStack>
    <Input placeholder="variant='outline'" variant="outline" />
    <Input placeholder="variant='unstyled'" variant="unstyled" />
  </HStack>
  <HStack>
    <Input placeholder="size='sm'" size="sm" />
    <Input placeholder="size='md'" size="md" />
    <Input placeholder="size='lg'" size="lg" />
  </HStack>
  <HStack>
    <Input placeholder="with startElement" startElement={ <Icon><Cancel /></Icon> } />
    <Input placeholder="with endElement" endElement={ <Icon><Cancel /></Icon> } />
    <Input placeholder="with both" 
      ps="4.5em"
      startElement="https://"
      endElement={ <Cancel />}/>
  </HStack>

  <HStack>
    <Input placeholder="disabled" disabled />
  </HStack>

  <div>Use `InputAddon` and `Attach` to place static components before and after the input</div>
  <HStack>
    <Attach>
      <InputAddon>https://</InputAddon>
      <Input placeholder="yourdomain" />
      <InputAddon>.com</InputAddon>
    </Attach>
  </HStack>
</VStack>