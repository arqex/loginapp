import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import type { I18next } from "./i18n.types";

export function createI18nInstance(): I18next {
  const instance = i18next
    .createInstance()
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    .use(HttpBackend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next) as I18next;

  instance.isLoaded = false;
  instance.loadClbks = [];

  instance.on("loaded", () => {
    instance.loadClbks?.forEach((cb) => cb());
    instance.isLoaded = true;
  });

  return instance;
}

export function i18nLoader(
  instance: I18next,
  onChange: () => void
): { isLoading: boolean } {
  instance.loadClbks?.push(onChange);
  return {
    isLoading: !instance.isLoaded,
  };
}
