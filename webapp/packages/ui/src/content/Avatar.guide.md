```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

<VStack>
  <HStack>
    <Avatar name="Simon Adebayor" src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
    <Avatar name="Javier Marquez" />
    <Avatar name="Javier Marquez" color="#fea" />
  </HStack>
  
  <HStack>
    <Avatar name="Javier Marquez" size="xs" />
    <Avatar name="Javier Marquez" size="sm" />
    <Avatar name="Javier Marquez" size="md" />
    <Avatar name="Javier Marquez"  size="lg" />
  </HStack>
</VStack>