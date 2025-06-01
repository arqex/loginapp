```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';
import TabContent from './TabContent';

<VStack alignItems="stretch">
    <Tabs tabs={{users: "Users", options: "Options"}} defaultValue="users">
      <TabContent value="users">
        This is the user content
      </TabContent>
      <TabContent value="options">
        These are the options
      </TabContent>
    </Tabs>
</VStack>
