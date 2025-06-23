import { createI18nInstance } from "./i18n";
import type { I18next, tKey, tOptions } from "./i18n.types";

let i18next: I18next;
export function initI18n() {
  i18next = createI18nInstance();
  i18next.init({
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    debug: false,
    backend: {
      loadPath: "/i18n/{{lng}}/{{lng}}.translations.json",
    },
    react: {
      useSuspense: false,
    },
  });
  return i18next;
}

export function t(key: tKey, options?: tOptions) {
  return i18next.t(key, options);
}
