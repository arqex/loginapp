The most abstract styling component. It support getting styles through CSS props, so we can use them to wrap any other component:

```jsx
import VStack from './VStack.guide';

<VStack>
  <Box width={200} height={50}>
    No bg
  </Box>

  <Box bg="bg.subtle" width={200} height={50}>
    bg="bg.subtle"
  </Box>

  <Box bg="bg.muted" width={200} height={50}>
    bg="bg.muted"
  </Box>

  <Box bg="bg.emphasized" width={200} height={50}>
    bg="bg.emphasized"
  </Box>
</VStack>