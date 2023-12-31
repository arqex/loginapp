import { createEmptyResponse, handleResponse } from "./ResponseHandler";
import {
  CachedRequest,
  CachedResponse,
  HeaderDefinition,
  ResponseMiddleware,
} from "./api.types";

type RequestCach = { [key: string]: CachedRequest<any> };
const cache: RequestCach = {};

export function cachedFetch(
  url: string,
  headers: HeaderDefinition,
  middlewares: ResponseMiddleware[],
  onLoad: () => void
): CachedResponse<any> {
  const cached = cache[url];
  if (cached && !cached.needsRefresh) {
    console.log("Cache hit!", cached);
    return {
      promise: cached.promise,
      isLoading: false,
      response: cached.response,
    };
  }

  console.log("Cache miss! fetching with headers...", headers);
  const promise = fetch(url, { credentials: "include", headers })
    .then((res) => handleResponse(res, false, middlewares))
    .then((response) => {
      cache[url].isLoading = false;
      cache[url].response = response;
      onLoad();
      return response;
    });

  cache[url] = {
    promise,
    requestedAt: Date.now(),
    needsRefresh: false,
    response: cached?.response,
    isLoading: true,
  };

  console.log("...and returning", cache[url]);

  return {
    promise,
    isLoading: true,
    response: cache[url]?.response,
  };
}

export function setCachedResult(url: string, data: any) {
  const response = cache[url]?.response || createEmptyResponse();
  response.data = data;
  cache[url] = {
    promise: Promise.resolve(response),
    requestedAt: Date.now(),
    needsRefresh: false,
    isLoading: false,
    response,
  };
}

export function clearCachedResult(url: string) {
  delete cache[url];
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
