import { FunctionComponent, ComponentClass } from "react";
import { Urlhub, HashStrategy, UrlhubRoute } from "urlhub";

export type ReactRoute = UrlhubRoute<FunctionComponent | ComponentClass>;
export type Router = Urlhub<FunctionComponent | ComponentClass>;

export function createRouter(routes: ReactRoute[]) {
  const router = new Urlhub<FunctionComponent | ComponentClass>({
    // @ts-ignore
    strategy: HashStrategy,
  });

  router.setRoutes(routes);

  return router;
}

let singleton: Router | null = null;
export function setRouter(router: Router) {
  singleton = router;
}

export function getRouter(): Router {
  if (!singleton) throw new Error("Router not initialized");
  return singleton;
}
