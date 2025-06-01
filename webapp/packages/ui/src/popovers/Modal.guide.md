```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import Button from '../buttons/Button.guide';
import Text from '../texts/Text.guide';
import Heading from '../texts/Heading.guide';
import Box from '../layout/Box.guide';
import ControlFooter from '../layout/ControlFooter.guide';

const [open1 , setOpen1] = React.useState(false);
const [open2 , setOpen2] = React.useState(false);


const ModalContent = ({setOpen}) => (
  <>
    <Heading size="sm">This is the modal heading</Heading>
    <Box flexGrow="1">
      <Text block>
        Here some content for the modal
      </Text>
    </Box>
    <ControlFooter align="end" sticky>
      <Button variant="secondary" onClick={ () => setOpen(false) }>Close</Button>
      <Button onClick={ () => setOpen(false) }>OK</Button>
    </ControlFooter>
  </>
);

<VStack>
  <HStack>
    <Modal open={open1} onClose={ () => setOpen1(false) }>
      <ModalContent setOpen={setOpen1} />
    </Modal>
    <Button onClick={ () => setOpen1(true) }>Open modal</Button>
  </HStack>
  <HStack>
    <Modal open={open2} onClose={ () => setOpen2(false) } size="cover">
      <ModalContent  setOpen={setOpen2} />
    </Modal>
    <Button onClick={ () => setOpen2(true) }>Open modal cover size</Button>
  </HStack>
</VStack>
