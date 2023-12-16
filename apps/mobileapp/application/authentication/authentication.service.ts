import { getApiCacher } from "../stores/apiCacher";
import { getUIStore } from "../stores/uiStore";

export function onAuthenticate(userId: string, token: string) {
  const store = getUIStore();
  store.data.authenticatedUserId = userId;
  store.data.authenticationToken = token;
  getApiCacher().authenticate(token);
  store.emitChange();
}

export function onLogout() {
  const store = getUIStore();
  store.data.authenticatedUserId = null;
  store.data.authenticationToken = null;
  getApiCacher().unauthenticate();
  store.emitChange();
}
