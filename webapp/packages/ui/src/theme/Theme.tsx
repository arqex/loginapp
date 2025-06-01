import React from "react";
import {
  ColorModeProvider,
  ColorModeProviderProps,
} from "../../chakra-snippets/color-mode";
import { ChakraProvider } from "@chakra-ui/react";
import { themeSystem, lightColors, darkColors } from "./themeSystem";

export function Theme(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={themeSystem}>
      <style>
        {`
        :root {
          ${lightColors}
        }

        .dark {
          ${darkColors}
        }`}
      </style>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
