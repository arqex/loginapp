import { getUIStore } from "../stores/uiStore";

export function getAuthenticatedId() {
  return getUIStore().data.authenticatedUserId;
}

export function isAuthenticated() {
  return !!getAuthenticatedId();
}
