```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Box from './Box.guide';
import Circle from './Circle.guide';

const placements = [
  "bottom-start",
  "bottom-end",
  "top-start",
  "top-end",
  "bottom-center",
  "top-center",
  "middle-center",
  "middle-start",
  "middle-end",
];

<VStack>
  <HStack wrap="wrap">
    { placements.map( (p, i) => (
    <Box position="relative" width="80px" height="80px" bg="var(--tinted)" key={i}>
      <Float placement={p} offset={3}>
        <Circle size={5} bg="red" color="white">5</Circle>
      </Float>
    </Box>
    ))}
  </HStack>
</VStack>