import EventEmitter from "eventemitter3";
import { ApiClientConfig, AuthType } from "./apiClient.types";
import { ApiClientBase } from "./ApiClientBase";
import { ApiRequester } from "./ApiRequester";

export class ApiClient implements ApiClientBase {
  emitter = new EventEmitter();
  requester: ApiRequester;
  constructor(config: ApiClientConfig = {}) {
    const headers = config.headers || { "content-type": "application/json" };

    if (config.authToken) {
      headers[AUTH_HEADER] = getAuthHeader(config.authToken, config.authType);
    }

    this.requester = new ApiRequester({
      apiUrl: config.apiURL || "https://localhost:3000",
      headers,
      responseMiddleware: config.responseMiddleware,
      requestMiddleware: config.requestMiddleware,
      onLoad: () => this.emitLoad(),
      initialCache: config.initialCache,
      credentials: config.credentials,
    });
  }

  authenticate(authToken: string, authType: AuthType = "bearer") {
    this.requester = this.requester.withHeaders({
      [AUTH_HEADER]: getAuthHeader(authToken, authType),
    });
    return this;
  }

  unauthenticate() {
    const headers = { ...this.requester.headers } as any;
    delete headers[AUTH_HEADER];
    this.requester.headers = headers;
  }

  withHeaders(headers: { [headerName: string]: string }) {
    const allHeaders = { ...this.requester.headers, ...headers };
    const requester = this.requester.withHeaders(allHeaders);

    const withHeaderInstance = new ApiClient();
    withHeaderInstance.requester = requester;
    return withHeaderInstance;
  }

  getApiUrl(route: string = "") {
    return this.requester.getApiUrl(route);
  }

  emitTimeout: number | undefined;
  addLoadListener(clbk: () => void) {
    this.emitter.on("load", clbk);
  }
  removeLoadListener(clbk: () => void) {
    this.emitter.removeListener("load", clbk);
  }
  emitLoad() {
    // wait one cycle to batch multiple changes in one re-render
    if (!this.emitTimeout) {
      // @ts-ignore - setTimeout is not a number in node, but it works
      this.emitTimeout = setTimeout(() => {
        delete this.emitTimeout;
        this.emitter.emit("load");
      });
    }
  }

  invalidateCacheResponse(route: string) {
    this.requester.invalidateCacheResponse(route);
  }

  clearCachedResult(route: string) {
    this.requester.clearCachedResult(route);
  }

  getRequestCache() {
    return { ...this.requester.cacher.cache };
  }
}

export const AUTH_HEADER = "Authorization";
function getAuthHeader(authToken: string, type: AuthType = "bearer") {
  if (type === "basic") {
    return `Basic ${authToken}`;
  }
  return `Bearer ${authToken}`;
}
