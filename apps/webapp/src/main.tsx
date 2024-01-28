import ReactDOM from "react-dom/client";
import { initApp } from "./application/init/initialization.service.ts";
import Root from "./Root.tsx";

const { router, authRouter, apiClient, uiStore, ls } = initApp();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Root
    router={router}
    authRouter={authRouter}
    apiClient={apiClient}
    uiStore={uiStore}
    ls={ls}
  />
);
