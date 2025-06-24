import { Theme, Spinner, VStack } from "@loginapp/ui";

export default function SpinnerScreen() {
  return (
    <Theme>
      <VStack w="100%" alignItems="center" justifyContent="center" h="100vh">
        <Spinner animationDuration="1.2s" />
      </VStack>
    </Theme>
  );
}
