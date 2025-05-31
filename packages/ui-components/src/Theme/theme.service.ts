import { darkColorScheme } from "./colorSchemes/darkColorScheme";
import { lightColorScheme } from "./colorSchemes/lightColorScheme";
import Cookies from "js-cookie";

export type ColorScheme = "light" | "dark";

const cookieKey = "CTLG_COLOR_SCHEME";
export function getClientColorScheme(): ColorScheme {
  return (Cookies.get(cookieKey) as ColorScheme) || getPreferredColorScheme();
}

export function setClientColorScheme(scheme: ColorScheme) {
  Cookies.set(cookieKey, scheme);
}

export function toggleClientColorScheme() {
  setClientColorScheme(getClientColorScheme() === "light" ? "dark" : "light");
}

export function getRequestColorScheme(req: any): ColorScheme {
  return (req.cookies[cookieKey] as ColorScheme) || "light";
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
