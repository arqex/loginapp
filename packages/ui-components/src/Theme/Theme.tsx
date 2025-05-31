import memoizeOne from "memoize-one";
import React from "react";
import {
  ColorScheme,
  getSchemeVariables,
  setClientColorScheme,
} from "./theme.service";

import {
  ChakraProvider,
  theme as defaultTheme,
  extendTheme,
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
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

interface ThemeProps {
  colorScheme?: ColorScheme;
  children: React.ReactNode;
}

export default class Theme extends React.Component<ThemeProps> {
  render() {
    const { colorScheme = "light", children } = this.props;
    console.log("Rendering Theme", colorScheme);
    return (
      <ChakraProvider
        theme={getTheme(colorScheme)}
        colorModeManager={this._getColorSchemeManager(colorScheme)}
      >
        <style>{renderCSSVariables(colorScheme)}</style>
        {children}
      </ChakraProvider>
    );
  }

  _getColorSchemeManager = memoizeOne((colorScheme: ColorScheme) => {
    return {
      get: () => colorScheme,
      set: () => setClientColorScheme,
      type: "localStorage",
    } as any;
  });
}

const renderCSSVariables = memoizeOne((scheme: ColorScheme) => {
  const vars: any = getSchemeVariables(scheme);
  const css = Object.keys(vars)
    .map((key) => `--${key}: ${vars[key]};`)
    .join("\n");

  return `:root * { ${css} }`;
});

const fieldStyle = {
  backgroundColor: "var(--input_bg) !important",
  color: "var(--input_text) !important",
};

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);
const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: fieldStyle,
});
const inputStyles = defineMultiStyleConfig({ baseStyle });

const textareaTheme = defineStyleConfig({
  variants: {
    outline: defineStyle(fieldStyle),
  },
});

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
      Textarea: textareaTheme,
    },
    fonts: {
      heading: `'Mulish', sans-serif`,
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
