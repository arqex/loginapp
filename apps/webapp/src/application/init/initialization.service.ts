import { authRoutes, setAuthRouter } from "../../auth_app/authRoutes";
import { getLastAuthenticatedUser } from "../auth/auth.selector";
import { Router, createRouter, setRouter } from "../routing/router";
import { routes } from "../routing/routes";
import { ApiCacher, createApiCacher, setApiCacher } from "../stores/apiCacher";
import { apiClient } from "../stores/apiClient";
import { LS, setLS } from "../stores/localStorage";
import { UIStore, createUIStore, setUIStore } from "../stores/uiStore";

export interface Stores {
  router: Router;
  authRouter: Router;
  apiCacher: ApiCacher;
  uiStore: UIStore;
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

  const uiStore = createUIStore({
    authenticatedUserId: user ? user.id : undefined,
  });
  setUIStore(uiStore);

  return { router, authRouter, apiCacher, uiStore, ls };
}
