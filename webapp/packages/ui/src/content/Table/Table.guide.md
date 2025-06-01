```jsx
import VStack from '../../layout/VStack.guide';
import HStack from '../../layout/HStack.guide';
import THead from './THead';
import TBody from './TBody';
import TRow from './TRow';
import TCell from './TCell';
import TH from './TH';

<VStack alignItems="stretch">
  <Table>
    <THead>
      <TH>
        Header 1
      </TH>
      <TH>
        Header 2
      </TH>
      <TH textAlign="right">
        Header 3
      </TH>
    </THead>
    <TBody>
      <TRow>
        <TCell>
          Value 1.1
        </TCell>
        <TCell>
          Value 1.2
        </TCell>
        <TCell textAlign="right">
          Value 1.3
        </TCell>
      </TRow>

      <TRow>
        <TCell>
          Value 2.1
        </TCell>
        <TCell>
          Value 2.2
        </TCell>
        <TCell textAlign="right">
          Value 2.3
        </TCell>
      </TRow>

      <TRow>
        <TCell>
          Value 3.1
        </TCell>
        <TCell>
          Value 3.2
        </TCell>
        <TCell textAlign="right">
          Value 3.3
        </TCell>
      </TRow>
    </TBody>
  </Table>
</VStack>