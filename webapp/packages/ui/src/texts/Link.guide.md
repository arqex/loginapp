```jsx
import VStack from '../layout/VStack.guide';
import Text from './Text.guide';

<VStack>
    <Link href="/">Default link</Link>
    <Link href="/" color="action">color="action"</Link>
    <Link href="/" underline={false}>{`underline={false}`}</Link>
    <Text color="light" size="sm">Links should adapt <Link href="#">their color and size</Link> to the context</Text>
</VStack>