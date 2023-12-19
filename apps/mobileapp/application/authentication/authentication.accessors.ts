import { getUIStore } from "../stores/uiStore";

export function getAuthenticatedId() {
  return getUIStore().data.authenticatedUserId;
}

export function isAuthenticated() {
  return getUIStore().data.isAuthenticated;
}

export function getAuthToken() {
  return getUIStore().data.authenticationToken;
}
