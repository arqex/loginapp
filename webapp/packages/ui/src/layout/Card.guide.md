```jsx

import VStack from "./VStack.guide";
import HStack from "./HStack.guide";

<VStack>

  <HStack>
    <Card>
      Default props
    </Card>
  </HStack>
  <HStack>
    <Card bg="card">
      bg="card"
    </Card>
    <Card bg="surface">
      bg="surface"
    </Card>
    <Card bg="shaded">
      bg="shaded"
    </Card>
    <Card bg="tinted">
      bg="tinted"
    </Card>
  </HStack>

  <HStack>
    <Card padding="none">
      padding="none"
    </Card>
    <Card padding="sm">
      padding="sm"
    </Card>
    <Card padding="md">
      padding="md"
    </Card>
    <Card padding="lg">
      padding="lg"
    </Card>
  </HStack>

  <HStack>
    <Card shadow="none">
      shadow="none"
    </Card>
    <Card shadow="sm">
      shadow="sm"
    </Card>
    <Card shadow="md">
      shadow="md"
    </Card>
    <Card shadow="lg">
      shadow="lg"
    </Card>
  </HStack>

  <HStack>
    <Card cornerRadius="none">
      cornerRadius="none"
    </Card>
    <Card cornerRadius="sm">
      cornerRadius="sm"
    </Card>
    <Card cornerRadius="md">
      cornerRadius="md"
    </Card>
    <Card cornerRadius="lg">
      cornerRadius="lg"
    </Card>
  </HStack>


  <HStack>
    <Card>
      {`border={true}`}
    </Card>
    <Card border={false}>
      {`border={false}`}
    </Card>
  </HStack>
</VStack>