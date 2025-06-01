```jsx
import VStack from '../layout/VStack.guide';
import HStack from '../layout/HStack.guide';

<VStack>
  <HStack>
    <ButtonWrapper>
      <h1>Header</h1>
      <div>And some text here, this will make the button to be big enought to check how it looks with multiple lines and internal components</div>
    </ButtonWrapper>

    <ButtonWrapper variant="card">
      <h1>Variant: card</h1>
      <div>And some text here, this will make the button to be big enought to check how it looks with multiple lines and internal components</div>
    </ButtonWrapper>
  </HStack>

  <HStack>
    <ButtonWrapper variant="card_surface">
      <h1>Variant card_surface</h1>
      <div>And some text here, this will make the button to be big enought to check how it looks with multiple lines and internal components</div>
    </ButtonWrapper>
    <ButtonWrapper variant="card_shaded">
      <h1>Variant card_shaded</h1>
      <div>And some text here, this will make the button to be big enought to check how it looks with multiple lines and internal components</div>
    </ButtonWrapper>
  </HStack>


  <HStack>
    <ButtonWrapper variant="card_tinted">
      <h1>Variant card_tinted</h1>
      <div>And some text here, this will make the button to be big enought to check how it looks with multiple lines and internal components</div>
    </ButtonWrapper>

    <ButtonWrapper href="#">
      <h1>With a link</h1>
      <div>And some text here, this will make the button to be big enought to check how it looks with multiple lines and internal components</div>
    </ButtonWrapper>
  </HStack>
</VStack>