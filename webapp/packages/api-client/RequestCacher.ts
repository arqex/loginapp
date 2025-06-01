import {
  RequestCache,
  ResponseMiddleware,
  CachedResponse,
} from "./apiClient.types";
import efWrapper from "./extendedFetch";
import { createEmptyResponse, handleResponse } from "./handleResponse";

export class RequestCacher {
  cache: RequestCache;
  constructor(initialCache: RequestCache = {}) {
    this.cache = initialCache;
  }

  cachedFetch(
    url: string,
    options: RequestInit,
    middlewares: ResponseMiddleware[],
    onLoad: () => void
  ): CachedResponse<any> {
    const cached = this.cache[url];
    if (cached && !cached.needsRefresh) {
      return {
        promise: cached.promise,
        isLoading: cached.isLoading,
        response: cached.response,
        requestOptions: cached.requestOptions!,
      };
    }

    const promise = efWrapper
      .extendedFecth(url, options)
      .then((res) => handleResponse(res, false, middlewares, options))
      .then((response) => {
        this.cache[url] = {
          ...(this.cache[url] || {}),
          isLoading: false,
          response,
          requestOptions: options,
        };
        onLoad();
        return response;
      });

    this.cache[url] = {
      promise,
      requestedAt: Date.now(),
      needsRefresh: false,
      response: cached?.response,
      isLoading: true,
    };

    return {
      promise,
      isLoading: true,
      response: this.cache[url]?.response,
      requestOptions: options,
    };
  }

  setCachedResult(url: string, data: any) {
    const response = this.cache[url]?.response || createEmptyResponse();
    response.data = data;
    this.cache[url] = {
      promise: Promise.resolve(response),
      requestedAt: Date.now(),
      needsRefresh: false,
      response,
      isLoading: false,
    };
  }

  clearCachedResult(url: string) {
    filterCacheKeys(this.cache, url).forEach((key) => delete this.cache[key]);
  }

  invalidateCacheResponse(url: string) {
    filterCacheKeys(this.cache, url).forEach(
      (key) => (this.cache[key].needsRefresh = true)
    );
  }

  invalidateCache() {
    Object.keys(this.cache).forEach((key) => {
      this.cache[key].needsRefresh = true;
    });
  }

  clearCache() {
    this.cache = {};
  }
}

export function filterCacheKeys(cache: RequestCache, pattern: string) {
  const regex = new RegExp(
    `^${pattern.replace(/([&?!:=+.|])/g, "\\$1").replace(/\*/g, ".*?")}$`
  );
  return Object.keys(cache).filter((key) => key.match(regex));
}
