import { ResponseMiddleware, clearCache } from "@loginapp/api-client";
import { getApiCacher } from "../stores/apiCacher";
import { getUIStore } from "../stores/uiStore";
import { ApiCacher } from "@loginapp/api-cacher";

export function onAuthenticate(userId: string, token: string) {
  const store = getUIStore();
  store.data.authenticatedUserId = userId;
  store.data.authenticationToken = token;
  store.data.isAuthenticated = true;
  getApiCacher().authenticate(token);
  store.emitChange();
}

export function onLogout() {
  const store = getUIStore();
  store.data.isAuthenticated = false;
  getApiCacher().unauthenticate();
  setTimeout(() => {
    store.data.authenticatedUserId = null;
    store.data.authenticationToken = null;
    clearCache();
    store.emitChange();
  }, 1000);
  store.emitChange();
}

export function handleExpiredSessions(apiCacher: ApiCacher) {
  const currentMiddleware = apiCacher.apiClient.requester.responseMiddleware;
  if (!currentMiddleware.includes(expiredSessionMiddleware)) {
    currentMiddleware.push(expiredSessionMiddleware);
  }
}

const expiredSessionMiddleware: ResponseMiddleware = (res) => {
  if (res.status === 401) {
    console.log("Expired session detected, logging out");
    onLogout();
  }
  return res;
};
