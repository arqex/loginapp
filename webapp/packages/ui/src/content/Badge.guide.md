```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Icon from '../icons/Icon.guide';
import Star from '../icons/svg/Star';
import Exclamation from '../icons/svg/Exclamation';

<VStack>
  <HStack>
    <Badge>2</Badge>
    <Badge>22</Badge>
    <Badge>Online</Badge>
    <Badge rounded>
      <Icon size="md">
        <Star />
      </Icon>
    </Badge>
    <Badge rounded>
      <Icon size="md">
        <Exclamation />
      </Icon>
    </Badge>
  </HStack>
</VStack>