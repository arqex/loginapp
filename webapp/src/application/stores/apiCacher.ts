import lorese, { Lorese } from "lorese";

export interface ApiUser {
  id: string;
}
interface IndexOf<T> {
  [key: string]: T;
}
export interface ApiCache {
  users: IndexOf<ApiUser>;
}

export type ApiCacher = Lorese<ApiCache>;

const initalStore: ApiCache = {
  users: {},
};

let cacherSingleton: ApiCacher | undefined;
export function createApiCacher(overrides: Partial<ApiCache> = {}) {
  return lorese({ ...initalStore, ...overrides });
}

export function setApiCacher(nextStore: ApiCacher) {
  cacherSingleton = nextStore;
}

export function getApiCacher(): ApiCacher {
  if (!cacherSingleton) throw new Error("Api Cacher not initialized");
  return cacherSingleton;
}

// Allow to define selectors before initializating the apiCacher
// and always use the current singleton
type SelectorInput<ARG, RET> = (store: ApiCache, arg: ARG) => RET;
type SelectorOutput<ARG, RET> = (arg: ARG) => RET;
export function selector<ARG, RET>(
  clbk: SelectorInput<ARG, RET>
): SelectorOutput<ARG, RET> {
  return function (arg: ARG) {
    return getApiCacher().selector(clbk)(arg);
  };
}

// Allow to define reducers before initializating the apiCacher
// and always use the current singleton
type ReducerInput<ST, ARG> = (store: ST, arg: ARG) => ST;
type ReducerOutput<ARG> = (arg: ARG) => void;
export function reducer<ARG>(
  clbk: ReducerInput<ApiCache, ARG>
): ReducerOutput<ARG> {
  return function (arg: ARG) {
    return getApiCacher().reducer(clbk)(arg);
  };
}
