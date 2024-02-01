import { i18n, TOptionsBase, InterpolationMap } from "i18next";

export interface I18next extends i18n {}

type tKey = string | TemplateStringsArray | (string | TemplateStringsArray)[];
type tOptions = TOptionsBase & InterpolationMap<string>;
export type { tKey, tOptions };
