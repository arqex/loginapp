import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Root from "./Root.tsx";
import {
  createRouter,
  getRouter,
  setRouter,
} from "./application/routing/router.ts";
import { routes } from "./application/routing/routes.ts";
import { getLS, LS, setLS } from "./application/stores/localStorage.ts";
import {
  createUIStore,
  getUIStore,
  setUIStore,
} from "./application/stores/uiStore.ts";
import { getI18next, initI18n } from "./application/i18n/i18n.service.ts";
import {
  createApiClient,
  getApiClient,
  setApiClient,
} from "./application/stores/apiClient.ts";
import { restoreAuthenticatedId } from "./application/auth/auth.context.ts";

initRootProps();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root
      router={getRouter()}
      apiClient={getApiClient()}
      uiStore={getUIStore()}
      ls={getLS()}
      i18n={getI18next()}
    />
  </StrictMode>
);

export function initRootProps() {
  const ls = new LS();
  setLS(ls);

  const router = createRouter(routes);
  router.start();
  setRouter(router);

  const apiClient = createApiClient();
  setApiClient(apiClient);

  const uiStore = createUIStore({
    authenticatedUserId: undefined,
  });
  setUIStore(uiStore);

  restoreAuthenticatedId();

  const i18n = initI18n();
  return { router, uiStore, ls, apiClient, i18n };
}
