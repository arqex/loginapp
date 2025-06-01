import {
  ApiRequesterConfig,
  HeaderDefinition,
  RequestMiddleware,
  RequestMiddlewareConfig,
  ResponseMiddleware,
} from "./apiClient.types";
import { RequestCacher } from "./RequestCacher";
import efWrapper from "./extendedFetch";
import { handleResponse } from "./handleResponse";

export class ApiRequester {
  headers: HeaderDefinition;
  apiUrl: string;
  requestMiddleware: RequestMiddleware[] = [];
  responseMiddleware: ResponseMiddleware[] = [];
  onLoad: () => void;
  cacher: RequestCacher;
  credentials: RequestCredentials;
  constructor(config: ApiRequesterConfig = {}) {
    this.headers = {
      "content-type": "application/json",
      ...(config.headers || {}),
    };
    this.apiUrl = "http://localhost:3000";
    this.requestMiddleware = config.requestMiddleware || [];
    this.responseMiddleware = config.responseMiddleware || [];
    this.onLoad = config.onLoad || (() => {});
    this.cacher = new RequestCacher(config.initialCache);
    this.credentials = config.credentials || "include";
  }

  getApiUrl(route: string) {
    return `${this.apiUrl}${route}`;
  }
  withHeaders(headers: HeaderDefinition) {
    return new ApiRequester({
      apiUrl: this.apiUrl,
      headers: { ...this.headers, ...headers },
      responseMiddleware: this.responseMiddleware,
      requestMiddleware: this.requestMiddleware,
      onLoad: this.onLoad,
      initialCache: this.cacher.cache,
      credentials: this.credentials,
    });
  }
  async post(route: string, data: any = {}) {
    const { url, options } = this.applyRequestMiddleware({
      url: this.getApiUrl(route),
      options: {
        method: "POST",
        body: JSON.stringify(data),
        headers: this.headers,
        credentials: this.credentials,
      },
    });

    const res = await efWrapper.extendedFecth(url, options);
    const handled = await handleResponse(
      res,
      true,
      this.responseMiddleware,
      options
    );
    this.onLoad();
    return handled;
  }
  async get(route: string) {
    const { url, options } = this.applyRequestMiddleware({
      url: this.getApiUrl(route),
      options: {
        method: "GET",
        headers: this.headers,
        credentials: this.credentials,
      },
    });

    const res = await efWrapper.extendedFecth(url, options);
    const handled = await handleResponse(
      res,
      true,
      this.responseMiddleware,
      options
    );
    this.onLoad();
    return handled;
  }

  getCached(route: string) {
    const { url, options } = this.applyRequestMiddleware({
      url: this.getApiUrl(route),
      options: {
        method: "GET",
        headers: this.headers,
        credentials: this.credentials,
      },
    });
    return this.cacher.cachedFetch(
      url,
      options,
      this.responseMiddleware,
      this.onLoad
    );
  }
  async patch(route: string, data: any) {
    const { url, options } = this.applyRequestMiddleware({
      url: this.getApiUrl(route),
      options: {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: this.headers,
        credentials: this.credentials,
      },
    });
    const res = await efWrapper.extendedFecth(url, options);
    const handled = await handleResponse(
      res,
      true,
      this.responseMiddleware,
      options
    );
    this.onLoad();
    return handled;
  }
  async delete(route: string) {
    const { url, options } = this.applyRequestMiddleware({
      url: this.getApiUrl(route),
      options: {
        method: "DELETE",
        credentials: this.credentials,
        headers: this.headers,
      },
    });
    const res = await efWrapper.extendedFecth(url, options);
    const handled = await handleResponse(
      res,
      true,
      this.responseMiddleware,
      options
    );
    this.onLoad();
    return handled;
  }

  applyRequestMiddleware(requestConfig: RequestMiddlewareConfig) {
    this.requestMiddleware.forEach((middleware) => {
      requestConfig = middleware(requestConfig);
    });
    return requestConfig;
  }

  invalidateCacheResponse(route: string) {
    this.cacher.invalidateCacheResponse(this.getApiUrl(route));
  }

  clearCachedResult(route: string) {
    this.cacher.clearCachedResult(this.getApiUrl(route));
  }
}
