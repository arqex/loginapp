```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

<VStack>
  <HStack>
    <Tag>I'm a tag</Tag>
    <Tag onRemove={ () => alert('Close clicked')}>With onRemove</Tag>
    <Tag isLoading>With isLoading</Tag>
    <Tag onClick={ () => alert('Tag clicked')}>With onClick</Tag>
  </HStack>
  <HStack>
    <Tag color="#ccddee">I'm a tag</Tag>
    <Tag color="#ddaaff" onRemove={ () => alert('Close clicked')}>With onRemove</Tag>
    <Tag color="#efcc98" isLoading>With isLoading</Tag>
    <Tag color="#98dfaa" onClick={ () => alert('Tag clicked')}>With onClick</Tag>
  </HStack>
  <HStack>
    <Tag variant="outline" color="#ccddee" >Outline</Tag>
    <Tag variant="outline" color="#ddaaff" onRemove={ () => alert('Close clicked')}>With onRemove</Tag>
    <Tag variant="outline" color="#efcc98" isLoading>With isLoading</Tag>
    <Tag variant="outline" color="#98dfaa" onClick={ () => alert('Tag clicked')}>With onClick</Tag>
  </HStack>

  <HStack>
    <Tag size="sm" color="#ccddee" >size="sm"</Tag>
    <Tag size="sm" color="#ddaaff" onRemove={ () => alert('Close clicked')}>With onRemove</Tag>
    <Tag size="sm" color="#efcc98" isLoading>With isLoading</Tag>
    <Tag size="sm" color="#98dfaa" onClick={ () => alert('Tag clicked')}>With onClick</Tag>
  </HStack>
</VStack>