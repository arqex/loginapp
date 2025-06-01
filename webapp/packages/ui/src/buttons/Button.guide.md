This is the button documentation

```jsx
import VStack from "../layout/VStack.guide";
import HStack from "../layout/HStack.guide";
import Home from "../icons/svg/Home";
import Delete from "../icons/svg/Delete";

<VStack>
  <VStack>
    <b>variant</b>
    <HStack>
      <Button>default</Button>
      <Button variant="primary">primary</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
      <Button variant="transparent">transparent</Button>
      <Button variant="text">text</Button>
    </HStack>
  </VStack>
  <VStack>
    <b>size</b>
    <HStack>
      <Button>default</Button>
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
    </HStack>
  </VStack>
  <VStack>
    <b>icons</b>
    <HStack>
      <Button>No icons</Button>
      <Button leftIcon={ <Home /> }>leftIcon</Button>
      <Button variant="secondary" rightIcon={ <Delete />}>rightIcon</Button>
      <Button variant="outline" leftIcon={ <Home />} rightIcon={ <Delete />}>Both icons</Button>
    </HStack>
    <HStack>
      <Button size="sm" leftIcon={ <Home /> } rightIcon={ <Delete />}>both sm</Button>
      <Button size="lg" leftIcon={ <Home /> } rightIcon={ <Delete />}>both lg</Button>
    </HStack>
  </VStack>
  <VStack>
    <b>disabled</b>
    <HStack>
      <Button disabled variant="primary">primary</Button>
      <Button disabled variant="secondary">secondary</Button>
      <Button disabled variant="outline">outline</Button>
      <Button disabled variant="transparent">transparent</Button>
    </HStack>
  </VStack>
  <VStack>
    <b>link</b>
    <HStack>
      <Button variant="primary" href="#">link</Button>
      <Button variant="secondary" href="/">link</Button>
    </HStack>
  </VStack>

  <VStack>
    <b>loading</b>
    <HStack>
      <Button size="sm" loading>sm</Button>
      <Button size="md" loading>md</Button>
      <Button size="lg" loading>lg</Button>
    </HStack>
    <HStack>
      <Button loading variant="primary">primary</Button>
      <Button loading variant="secondary">secondary</Button>
      <Button loading variant="outline">outline</Button>
      <Button loading variant="transparent">transparent</Button>
    </HStack>
  </VStack>
</VStack>
```