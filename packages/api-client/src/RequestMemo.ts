import { handleResponse } from "./ResponseHandler";
import {
  CachedRequest,
  CachedResponse,
  HeaderDefinition,
  ResponseWithData,
} from "./api.types";

type RequestCach = { [key: string]: CachedRequest<any> };
const cache: RequestCach = {};

export function cachedFetch(
  url: string,
  headers: HeaderDefinition
): CachedResponse<any> {
  const cached = cache[url];
  if (cached && !cached.needsRefresh) {
    return {
      promise: cached.promise,
      isLoading: false,
      response: cached.response,
    };
  }

  const promise = fetch(url, { credentials: "include", headers })
    .then(handleResponse)
    .then((response) => {
      cache[url].response = response;
      return response;
    });

  cache[url] = {
    promise,
    requestedAt: Date.now(),
    needsRefresh: false,
  };

  return {
    promise,
    isLoading: true,
    response: cache[url]?.response,
  };
}

export function setCachedResponse(
  url: string,
  response: ResponseWithData<any>
) {
  cache[url] = {
    promise: Promise.resolve(response),
    requestedAt: Date.now(),
    needsRefresh: false,
    response,
  };
}

export function invalidateCacheResponse(url: string) {
  const cached = cache[url];
  if (cached) cached.needsRefresh = true;
}

export function invalidateCache() {
  Object.keys(cache).forEach((key) => {
    cache[key].needsRefresh = true;
  });
}

export function clearCache() {
  Object.keys(cache).forEach((key) => {
    delete cache[key];
  });
}
