```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

import Button from '../buttons/Button.guide';
import Text from '../texts/Text.guide';

const [ open, setOpen ] = React.useState(false);

<VStack>
  <Button onClick={ () => setOpen(!open) }>Toggle collapsible</Button>
  <Collapsible open={open}>
    <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
  </Collapsible>
</VStack>