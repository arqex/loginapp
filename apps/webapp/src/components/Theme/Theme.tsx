import memoizeOne from "memoize-one";
import React, { PropsWithChildren } from "react";
import {
  ColorScheme,
  getColorScheme,
  getSchemeVariables,
  setColorScheme,
} from "../../application/theme/theme.service";

import {
  ChakraProvider,
  theme as defaultTheme,
  extendTheme,
  createMultiStyleConfigHelpers,
} from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";
import { darkColorScheme } from "./colorSchemes/darkColorScheme";
import { lightColorScheme } from "./colorSchemes/lightColorScheme";

const themeSizes = defaultTheme.sizes;
function getSize(size: keyof typeof themeSizes | "100%"): any {
  const themeSize = size === "100%" ? size : themeSizes[size];
  return {
    container: {
      width: size,
      height: size,
      fontSize: `calc(${themeSize} / 2.5)`,
    },
    excessLabel: {
      width: size,
      height: size,
    },
    label: {
      fontSize: `calc(${themeSize} / 2.5)`,
      lineHeight: themeSize,
    },
  };
}

interface ThemeProps {}
interface ThemeState {}

export default class Theme extends React.Component<
  PropsWithChildren<ThemeProps>,
  ThemeState
> {
  state: ThemeState = {};
  render() {
    return (
      <ChakraProvider
        theme={getTheme(getColorScheme())}
        colorModeManager={colorModeManager}
      >
        <style>{renderCSSVariables(getColorScheme())}</style>
        {this.props.children}
      </ChakraProvider>
    );
  }
}

const renderCSSVariables = memoizeOne((scheme: ColorScheme) => {
  const vars: any = getSchemeVariables(scheme);
  const css = Object.keys(vars)
    .map((key) => `--${key}: ${vars[key]};`)
    .join("\n");

  return `:root * { ${css} }`;
});

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);
const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    backgroundColor: "var(--input_bg) !important",
    color: "var(--input_text) !important",
  },
});
const inputStyles = defineMultiStyleConfig({ baseStyle });

const getTheme = memoizeOne((scheme: ColorScheme) => {
  const colorScheme = scheme === "dark" ? darkColorScheme : lightColorScheme;
  return extendTheme({
    config: {
      initialColorMode: scheme,
    },
    components: {
      Avatar: {
        sizes: {
          md: getSize(9),
          sm: getSize(7),
        },
      },
      Menu: {
        list: {
          bg: colorScheme.popup_bg,
        },
      },
      Input: inputStyles,
    },
    styles: {
      global: {
        body: {
          bg: colorScheme.bg,
        },
        "*, *::before, &::after": {
          borderColor: colorScheme.border,
        },
      },
    },
  });
});

const colorModeManager: any = {
  get: getColorScheme,
  set: setColorScheme,
  type: "localStorage",
};
