```jsx
import VStack from '../../layout/VStack.guide';
import HStack from '../../layout/HStack.guide';
import Card from '../../layout/Card.guide';
import { Apps, Bolt, Cached} from '../../icons/svg';
import Text from '../../texts/Text.guide';
import MenuTitle from './MenuTitle';

<VStack>
  <HStack>
    <Card padding="sm" width="200px">
      <VStack gap={0} alignItems="stretch">
        <MenuItem>Item title</MenuItem>
        <MenuItem selected>Selected</MenuItem>
      </VStack>
    </Card>
    <Card padding="sm" width="200px">
      <VStack gap={0} alignItems="stretch">
        <MenuItem selected startIcon={<Apps />}>With start icon</MenuItem>
        <MenuItem startIcon={<Cached />} endIcon={<Bolt />}>With both</MenuItem>
        <MenuItem endIcon={<Bolt />}>With end icon</MenuItem>
      </VStack>
    </Card>
    <Card padding="sm" width="200px">
      <VStack gap={0} alignItems="stretch">
        <MenuItem href="/Content">With an href</MenuItem>
        <MenuItem onClick={() => alert('Menu item clicked')}>With onClick</MenuItem>
      </VStack>
    </Card>
  </HStack>
  <HStack>
    <Card padding="sm" width="200px">
      <VStack gap={0} alignItems="stretch">
        <MenuItem size="sm">size="sm"</MenuItem>
        <MenuItem selected size="sm">Selected</MenuItem>
        <MenuItem size="sm" startIcon={<Apps />}>With start icon</MenuItem>
      </VStack>
    </Card>
    <Card padding="sm" width="300px">
      <VStack gap={0} alignItems="stretch">
        <MenuItem size="lg">size="lg"</MenuItem>
        <MenuItem selected size="lg">Selected</MenuItem>
        <MenuItem size="lg" startIcon={<Apps />}>
          <VStack gap={.5}>
            <MenuTitle>Compound content</MenuTitle>
            <Text size="xs" color="lighter">With a description</Text>
          </VStack>
        </MenuItem>
      </VStack>
    </Card>
  </HStack>
</VStack>