import ReactDOM from "react-dom/client";
import { initApp } from "./application/init/initialization.service.ts";
import Root from "./Root.tsx";
import { initI18n } from "./application/i18n/i18n.service.ts";

const i18n = initI18n();
const { router, authRouter, apiClient, uiStore, ls } = initApp();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Root
    router={router}
    authRouter={authRouter}
    apiClient={apiClient}
    uiStore={uiStore}
    ls={ls}
    i18n={i18n}
  />
);
