import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StackHeaderProps } from "@react-navigation/stack";

export const TopBar = ({
  route,
  options,
  back,
  navigation,
}: StackHeaderProps) => (
  <Appbar.Header>
    {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    <Appbar.Content title={getHeaderTitle(options, route.name)} />
  </Appbar.Header>
);
