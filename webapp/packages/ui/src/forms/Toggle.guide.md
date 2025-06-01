```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

const [isActive, setIsActive] = React.useState(false);

<VStack>
  <Toggle>Uncontrolled toggle</Toggle>
  <Toggle checked={isActive} onCheckedChange={e => setIsActive(e.checked)}>
    Controlled toggle
  </Toggle>
  <Toggle position="start">Position start</Toggle>
</VStack>