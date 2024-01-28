import { authRoutes, setAuthRouter } from "../../auth_app/authRoutes";
import { getLastAuthenticatedUser } from "../auth/auth.selector";
import { Router, createRouter, setRouter } from "../routing/router";
import { routes } from "../routing/routes";
import { apiClient } from "../stores/apiClient";
import { LS, setLS } from "../stores/localStorage";
import { AppStore, createUIStore, setUIStore } from "../stores/uiStore";
import { handleExpiredSessions } from "../auth/auth.service";
import { ApiClient } from "@loginapp/api-client";

export interface Stores {
  router: Router;
  authRouter: Router;
  uiStore: AppStore;
  ls: LS;
  apiClient: ApiClient;
}

export function initApp(): Stores {
  const ls = new LS();
  setLS(ls);

  const router = createRouter(routes);
  setRouter(router);

  const authRouter = createRouter(authRoutes);
  setAuthRouter(authRouter);

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

  return { router, authRouter, uiStore, ls, apiClient };
}
