import { ApiCacher, userLoader } from "@loginapp/api-cacher";
import { authRoutes, setAuthRouter } from "../../auth_app/authRoutes";
import { getLastAuthenticatedUser } from "../auth/auth.selector";
import { Router, createRouter, setRouter } from "../routing/router";
import { routes } from "../routing/routes";
import { createApiCacher, setApiCacher } from "../stores/apiCacher";
import { apiClient } from "../stores/apiClient";
import { LS, setLS } from "../stores/localStorage";
import { AppStore, createUIStore, setUIStore } from "../stores/uiStore";
import { handleExpiredSessions } from "../auth/auth.service";

export interface Stores {
  router: Router;
  authRouter: Router;
  apiCacher: ApiCacher;
  uiStore: AppStore;
  ls: LS;
}

export function initApp(): Stores {
  const ls = new LS();
  setLS(ls);

  const router = createRouter(routes);
  setRouter(router);

  const authRouter = createRouter(authRoutes);
  setAuthRouter(authRouter);

  const user = getLastAuthenticatedUser();
  const cache = user ? { [user.id]: user } : {};
  const apiCacher = createApiCacher({
    apiClient: apiClient,
    initialCache: cache,
  });
  setApiCacher(apiCacher);
  handleExpiredSessions(apiCacher);

  const uiStore = createUIStore({
    authenticatedUserId: user ? user.id : undefined,
  });
  setUIStore(uiStore);

  if (user) {
    // Try to refresh the user, this way we will
    // logout if the session has expired
    userLoader(apiCacher, user.id);
  }

  return { router, authRouter, apiCacher, uiStore, ls };
}
