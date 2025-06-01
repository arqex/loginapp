This component is copied from https://github.com/NightCafeStudio/react-render-if-visible
and modified to fix the offset as suggested at https://github.com/NightCafeStudio/react-render-if-visible/pull/25

Renders a placeholder if the item is not on screen. To see it in action inspect the circles in devtools and scroll.


```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Circle from '../layout/Circle.guide';

<VStack>
  <RenderIfVisible defaultHeight={80}>
    <Circle bg="red" size={20} />
  </RenderIfVisible>

  <RenderIfVisible defaultHeight={80}>
    <Circle bg="red" size={20} />
  </RenderIfVisible>

  <RenderIfVisible defaultHeight={80}>
    <Circle bg="red" size={20} />
  </RenderIfVisible>

  <RenderIfVisible defaultHeight={80}>
    <Circle bg="red" size={20} />
  </RenderIfVisible>

</VStack>