import { clearCache } from "@loginapp/api-client";
import { getApiCacher } from "../stores/apiCacher";
import { getUIStore } from "../stores/uiStore";

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
