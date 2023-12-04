import {
  default as urlhub,
  ReactRoute,
  UrlhubClass,
  UrlhubRoute,
} from "urlhub";
import hashStrategy from "urlhub/hashStrategy";

export type Router = UrlhubClass<ReactRoute>;

export function createRouter(routes: UrlhubRoute<ReactRoute>[]) {
  const router: Router = urlhub.create({ strategy: hashStrategy });

  router.setRoutes(routes);
  router.start();

  return router;
}

let singleton: Router | null = null;
export function setRouter(router: Router) {
  singleton = router;
}

export function getRouter() {
  if (!singleton) throw new Error("Router not initialized");
  return singleton;
}
