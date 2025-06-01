import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const lightColors = `
  --action_bg: #618cb8;
  --action_bg_hover: #2B6CB0;
  --action_fg: #ffffff;
  --action_subtle_bg: rgba(97, 140, 184, 0.1);
  --action_subtle_bg_hover: rgba(97, 140, 184, 0.2);
  --action_subtle_fg: #424c56;
  --input_bg: #ffffff;
  --input_bg_hover: #eef;
  --input_text: var(--chakra-colors-gray-900);
  --text: var(--chakra-colors-gray-900);
  --text_light: var(--chakra-colors-gray-700);
  --text_lighter: var(--chakra-colors-gray-600);
  --text_subtle: var(--chakra-colors-gray-500);
  --link: #618cb8;
  --link_hover: #2B6CB0;
  --card: #ffffff;
  --card_border: #82868D22;
  --subtle_border: #82868D11;
  --surface: var(--chakra-colors-gray-50);
  --shaded: var(--chakra-colors-gray-100);
  --tinted: var(--chakra-colors-gray-150);
  --focus_ring: #c100c3;
  --toast_bg: var(--chakra-colors-gray-800);
  --toast_fg: var(--chakra-colors-gray-50);
  --icon_button_bg: #99AABB33;
`;

export const darkColors = `
  --action_bg: #2C5282;
  --action_bg_hover: #2B6CB0;
  --action_fg: #ffffff;
  --action_subtle_bg: rgba(100, 205, 255, 0.1);
  --action_subtle_bg_hover: rgba(100, 205, 255, 0.2);
  --action_subtle_fg: #ffffff;
  --input_bg: var(--chakra-colors-gray-600);
  --input_bg_hover: var(--chakra-colors-gray-700);
  --input_text: #ffffff;
  --text: var(--chakra-colors-gray-50);
  --text_light: var(--chakra-colors-gray-200);
  --text_lighter: var(--chakra-colors-gray-300);
  --text_subtle: var(--chakra-colors-gray-400);
  --link: #2C5282;
  --link_hover: #2B6CB0;
  --card: var(--chakra-colors-gray-50);
  --card_border: #82868D22;
  --subtle_border: #82868D11;
  --surface: var(--chakra-colors-gray-100);
  --shaded: var(--chakra-colors-gray-200);
  --tinted: var(--chakra-colors-gray-300);
  --focus_ring: #c100c3;
  --toast_bg: var(--chakra-colors-gray-50);
  --toast_fg: var(--chakra-colors-gray-900);
  --icon_button_bg: #99AABB33;
`;

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        gray: {
          "50": { value: "#F6F9FB" },
          "100": { value: "#EDF2F7" },
          "150": { value: "#E0E5EA" },
          "200": { value: "#D2D7DD" },
          "300": { value: "#B8BCC2" },
          "400": { value: "#9DA1A8" },
          "500": { value: "#82868D" },
          "600": { value: "#676A73" },
          "700": { value: "#4D4F58" },
          "800": { value: "#32343E" },
          "850": { value: "#252731" },
          "900": { value: "#171923" },
          "950": { value: "#0C0D12" },
        },
      },
    },
    semanticTokens: {
      colors: {
        gray: {
          focusRing: {
            value: "var(--focus_ring)",
          },
        },
      },
    },
  },
});

export const themeSystem = createSystem(defaultConfig, customConfig);
