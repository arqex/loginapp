import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";
import memoizeOne from "memoize-one";
import { Material3Theme } from "@pchmn/expo-material3-theme";

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export const getTheme = memoizeOne(
  (isDark: boolean, colors: Material3Theme) => {
    return isDark
      ? merge(CombinedDarkTheme, { colors: colors.dark })
      : merge(CombinedLightTheme, { colors: colors.light });
  }
);
