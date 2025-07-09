import type {
  FunctionComponent,
  ComponentClass,
  ForwardRefExoticComponent,
} from "react";
import { Urlhub, HashStrategy, type UrlhubRoute } from "urlhub";

type ScreenType =
  | FunctionComponent
  | ComponentClass
  | ForwardRefExoticComponent<any>;
export type ReactRoute = UrlhubRoute<ScreenType>;
export type Router = Urlhub<ScreenType>;

export function createRouter(routes: ReactRoute[]) {
  const router = new Urlhub<ScreenType>({
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
