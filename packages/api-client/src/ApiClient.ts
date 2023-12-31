import EventEmitter from "eventemitter3";
import { ApiClientBase } from "./ApiClientBase";
import { apiRequester } from "./ApiRequester";
import { ApiClientConfig } from "./api.types";
import {
  clearCachedResult,
  invalidateCacheResponse,
  setCachedResult,
} from "./RequestMemo";

export class ApiClient implements ApiClientBase {
  emitter = new EventEmitter();
  requester: typeof apiRequester;
  useCache: boolean = true;
  constructor(config: ApiClientConfig) {
    const headers = config.headers || {};
    if (config.authToken) {
      headers[AUTH_HEADER] = getBearer(config.authToken);
    }

    if (config.useCache) {
      this.useCache = true;
    }

    this.requester = apiRequester.withHeaders(headers);
    this.requester.apiUrl = config.apiURL;
    this.requester.onLoad = () => this.emitLoad();
  }

  authenticate(authToken: string) {
    this.requester = this.requester.withHeaders({
      [AUTH_HEADER]: getBearer(authToken),
    });
  }

  unauthenticate() {
    const headers = { ...this.requester.headers } as any;
    delete headers[AUTH_HEADER];
    this.requester.headers = headers;
  }

  withHeaders(headers: { [headerName: string]: string }) {
    const allHeaders = { ...this.requester.headers, ...headers };
    return new ApiClient({
      apiURL: this.requester.apiUrl,
      authToken: allHeaders[AUTH_HEADER],
      headers: allHeaders,
    });
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
    invalidateCacheResponse(this.requester.getApiUrl(route));
  }

  clearCachedResult(route: string) {
    clearCachedResult(this.requester.getApiUrl(route));
  }

  setCachedResult(route: string, data: any) {
    setCachedResult(this.requester.getApiUrl(route), data);
  }
}

const AUTH_HEADER = "Authorization";
function getBearer(authToken: string) {
  return `Bearer ${authToken}`;
}
