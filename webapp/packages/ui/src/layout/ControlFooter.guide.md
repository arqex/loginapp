Control footer allows to quickly add buttons to the bottom of a card or modal.


```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Button from "../buttons/Button.guide";
import Card from "../layout/Card.guide";

<VStack alignItems="stretch">
  <Card>
    <ControlFooter align="start">
      <span>align="start"</span>
      <Button>Ok</Button>
      <Button variant="secondary">Cancel</Button>
    </ControlFooter>
  </Card>
  <Card>
    <ControlFooter align="center">
      <span>align="center"</span>
      <Button>Ok</Button>
      <Button variant="secondary">Cancel</Button>
    </ControlFooter>
  </Card>
  <Card>
    <ControlFooter align="end">
      <span>align="end"</span>
      <Button>Ok</Button>
      <Button variant="secondary">Cancel</Button>
    </ControlFooter>
  </Card>
  <Card>
    <ControlFooter align="stack">
      <span>align="stack"</span>
      <Button>Ok</Button>
      <Button variant="secondary">Cancel</Button>
    </ControlFooter>
  </Card>
  <Card>
    <ControlFooter align="stretch">
      <span>align="stretch"</span>
      <Button>Ok</Button>
      <Button variant="secondary">Cancel</Button>
    </ControlFooter>
  </Card>
</VStack>