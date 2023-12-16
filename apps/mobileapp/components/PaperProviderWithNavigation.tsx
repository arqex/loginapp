import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { getTheme } from "../application/theming/theming.utils";
import { StatusBar } from "expo-status-bar";
import * as Linking from "expo-linking";

const linking = {
  prefixes: [Linking.createURL("/")],
};

interface PaperThemeProviderProps {
  children: React.ReactNode;
}

export default function PaperProviderWithNavigation(
  props: PaperThemeProviderProps
) {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const isDark = colorScheme === "dark";
  const appTheme = getTheme(isDark, theme);

  return (
    <PaperProvider theme={appTheme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer theme={appTheme} linking={linking}>
        {props.children}
      </NavigationContainer>
    </PaperProvider>
  );
}
