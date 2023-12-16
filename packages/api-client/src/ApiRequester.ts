import { cachedFetch, invalidateCacheResponse } from "./RequestMemo";
import { handleResponse } from "./ResponseHandler";
import { HeaderDefinition } from "./api.types";

export const apiRequester = {
  headers: { "content-type": "application/json" } as HeaderDefinition,
  apiUrl: "http://localhost:3000",
  getApiUrl(route: string) {
    return `${this.apiUrl}${route}`;
  },
  withHeaders(headers: HeaderDefinition) {
    return { ...this, headers: { ...this.headers, ...headers } };
  },
  async post(route: string, data: any = {}) {
    const res = await fetch(this.getApiUrl(route), {
      method: "POST",
      body: JSON.stringify(data),
      headers: this.headers,
      credentials: "include",
    });
    return await handleResponse(res);
  },
  async get(route: string) {
    const url = this.getApiUrl(route);
    invalidateCacheResponse(url);
    const { promise } = cachedFetch(url, this.headers);
    return await promise;
  },
  getCached(route: string) {
    return cachedFetch(this.getApiUrl(route), this.headers);
  },
  async patch(route: string, data: any) {
    const res = await fetch(this.getApiUrl(route), {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: this.headers,
      credentials: "include",
    });
    return await handleResponse(res);
  },
  async delete(route: string) {
    const res = await fetch(this.getApiUrl(route), {
      method: "DELETE",
      credentials: "include",
      headers: this.headers,
    });
    return await handleResponse(res);
  },
};
