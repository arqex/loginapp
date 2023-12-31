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

  const user = getLastAuthenticatedUser();
  if (user) {
    // Cache the user but mark it to refresh
    apiClient.setCachedResult(`/users/${user.id}`, user);
    apiClient.invalidateCacheResponse(`/users/${user.id}`);
  }
  handleExpiredSessions(apiClient);

  const uiStore = createUIStore({
    authenticatedUserId: user ? user.id : undefined,
  });
  setUIStore(uiStore);

  return { router, authRouter, uiStore, ls, apiClient };
}
