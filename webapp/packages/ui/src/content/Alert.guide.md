```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

<VStack>
  <Alert status="info">An alert with status info</Alert>
  <Alert status="success">An alert with status success</Alert>
  <Alert status="warning">An alert with status warning</Alert>
  <Alert status="error">An alert with status error</Alert>
  <Alert status="error" withIcon={false}>An alert withIcon=false</Alert>
  <Alert status="info" onClose={ () => alert('Close clicked') }>An alert with onClose</Alert>
</VStack>