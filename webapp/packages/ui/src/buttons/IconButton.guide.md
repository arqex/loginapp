This is the IconButton documentation

```jsx
import VStack from "../layout/VStack.guide";
import HStack from "../layout/HStack.guide";
import Delete from "../icons/svg/Delete";

<VStack>
  <VStack>
    <b>variant</b>
    <HStack>
      <IconButton tooltip="default"><Delete /></IconButton>
      <IconButton tooltip="primary" variant="primary"><Delete /></IconButton>
      <IconButton tooltip="transparent" variant="transparent"><Delete /></IconButton>
      <IconButton tooltip="solid" variant="solid"><Delete /></IconButton>
      <IconButton tooltip="secondary" variant="secondary"><Delete /></IconButton>
    </HStack>
  </VStack>

  <VStack>
    <b>sizes</b>
    <HStack>
      <IconButton tooltip="sm" size="sm"><Delete /></IconButton>
      <IconButton tooltip="md" size="md"><Delete /></IconButton>
      <IconButton tooltip="lg" size="lg"><Delete /></IconButton>
    </HStack>
  </VStack>

  <VStack>
    <b>disabled</b>
    <HStack> 
      <IconButton tooltip="primary" variant="primary" disabled><Delete /></IconButton>
      <IconButton tooltip="transparent" variant="transparent" disabled><Delete /></IconButton>
    </HStack>
  </VStack>

  <VStack>
    <b>Links</b>
    <HStack> 
      <IconButton tooltip="primary" variant="primary" href="#"><Delete /></IconButton>
      <IconButton tooltip="transparent" variant="transparent" href="#"><Delete /></IconButton>
    </HStack>
  </VStack>

  <VStack>
    <b>With colored background</b>
    <HStack>
      <div style={{background: '#ffeeaa', padding: 10}}>
        <IconButton variant="transparent"><Delete /></IconButton>
      </div>
      <div style={{background: '#aaffee', padding: 10}}>
        <IconButton variant="transparent"><Delete /></IconButton>
      </div>
      <div style={{background: '#aaccff', padding: 10}}>
        <IconButton variant="transparent"><Delete /></IconButton>
      </div>
      <div style={{background: '#ccffaa', padding: 10}}>
        <IconButton variant="transparent"><Delete /></IconButton>
      </div>
      <div style={{background: '#000', padding: 10, color: '#fff'}}>
        <IconButton variant="transparent"><Delete /></IconButton>
      </div>
    </HStack>
  </VStack>
</VStack>
```