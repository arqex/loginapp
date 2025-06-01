```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import { toaster } from './Toaster.utils.ts';
import  Button from '../buttons/Button.guide';


<VStack>
  <Toaster />
  <HStack>
    <Button onClick={() => toaster.info('This is an info message') }>info toast</Button>
    <Button onClick={() => toaster.success('This is an success message') }>success toast</Button>
    <Button onClick={() => toaster.warning('This is an warning message') }>warning toast</Button>
    <Button onClick={() => toaster.error('This is an error message') }>error toast</Button>
  </HStack>
</VStack>