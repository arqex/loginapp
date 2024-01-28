import { darkColorScheme } from "../../components/Theme/colorSchemes/darkColorScheme";
import { lightColorScheme } from "../../components/Theme/colorSchemes/lightColorScheme";
import { getLS } from "../stores/localStorage";

export type ColorScheme = "light" | "dark";

export function getColorScheme(): ColorScheme {
  const storedTheme = getLS().get("COLOR_SCHEME");
  if (storedTheme) return storedTheme;
  return getPreferredColorScheme();
}

export function toggleColorScheme() {
  setColorScheme(getColorScheme() === "light" ? "dark" : "light");
}

export function setColorScheme(scheme: ColorScheme) {
  getLS().set("COLOR_SCHEME", scheme);
}

function getPreferredColorScheme(): ColorScheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getSchemeVariables(scheme: ColorScheme) {
  return scheme === "dark" ? darkColorScheme : lightColorScheme;
}
