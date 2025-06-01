```jsx
import VStack from '../../layout/VStack.guide';
import HStack from '../../layout/HStack.guide';
import Crumb from './Crumb.tsx';

<VStack>
  <Breadcrumb>
    <Crumb href="/Content">Content</Crumb>
    <Crumb href="/Content?id=breadcrumbguide">Breadcrumb component</Crumb>
  </Breadcrumb>
  <Breadcrumb withHome={false}>
    <Crumb href="/Content">Content</Crumb>
    <Crumb href="/Content?id=breadcrumbguide">Breadcrumb component</Crumb>
  </Breadcrumb>
</VStack>