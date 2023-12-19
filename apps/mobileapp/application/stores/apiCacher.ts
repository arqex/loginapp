import { ApiCacher } from "@loginapp/api-cacher";

let cacherSingleton: ApiCacher | undefined;
export { createApiCacher } from "@loginapp/api-cacher";

export function setApiCacher(nextStore: ApiCacher) {
  cacherSingleton = nextStore;
}

export function getApiCacher(): ApiCacher {
  if (!cacherSingleton) throw new Error("Api Cacher not initialized");
  return cacherSingleton;
}
