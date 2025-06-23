import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Root from "./Root.tsx";
import { createRouter, setRouter } from "./application/routing/router.ts";
import { authRoutes, setAuthRouter } from "./application/routing/routes.ts";
import { LS, setLS } from "./application/stores/localStorage.ts";
import { createUIStore, setUIStore } from "./application/stores/uiStore.ts";
import { initI18n } from "./application/i18n/i18n.service.ts";
import { createApiClient } from "./application/stores/apiClient.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root
      router={router}
      authRouter={authRouter}
      apiClient={apiClient}
      uiStore={uiStore}
      ls={ls}
      i18n={i18n}
    />
  </StrictMode>
);

export function initRootProps() {
  const ls = new LS();
  setLS(ls);

  const router = createRouter(routes);
  setRouter(router);

  const authRouter = createRouter(authRoutes);
  setAuthRouter(authRouter);

  const apiClient = createApiClient();
  handleExpiredSessions(apiClient);

  const user = getLastAuthenticatedUser();
  if (user) {
    router.start();
    // Cache the user but mark it to refresh
    apiClient.setCachedResult(`/users/${user.id}`, user);
    apiClient.invalidateCacheResponse(`/users/${user.id}`);
  } else {
    authRouter.start();
  }

  const uiStore = createUIStore({
    authenticatedUserId: user ? user.id : undefined,
  });
  setUIStore(uiStore);

  const i18n = initI18n();
  return { router, authRouter, uiStore, ls, apiClient, i18n };
}
