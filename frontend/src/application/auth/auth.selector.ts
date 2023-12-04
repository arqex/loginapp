import { ApiCache, selector } from "../stores/apiCacher";
import { getLS } from "../stores/localStorage";
import { getUIStore } from "../stores/uiStore";

export function getAuthenticatedId() {
  return getUIStore().data.authenticatedUserId;
}

export const getAuthenticatedUser = selector((store: ApiCache) => {
  const id = getAuthenticatedId();
  if (id) {
    return store.users[id];
  }
});

export function getLastAuthenticatedUser() {
  return getLS().get("AUTH_USER");
}
