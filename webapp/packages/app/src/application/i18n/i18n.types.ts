import type { i18n, TOptionsBase, InterpolationMap } from "i18next";

export interface I18next extends i18n {
  isLoaded: boolean;
  loadClbks?: (() => void)[];
}

type tKey = string | TemplateStringsArray | (string | TemplateStringsArray)[];
type tOptions = TOptionsBase & InterpolationMap<string>;
export type { tKey, tOptions };
