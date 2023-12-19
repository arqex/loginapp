import { userLoader } from "@loginapp/api-cacher";
import { getLS } from "../stores/localStorage";
import { getUIStore } from "../stores/uiStore";
import { getApiCacher } from "../stores/apiCacher";

export function getAuthenticatedId() {
  return getUIStore().data.authenticatedUserId;
}

export function getAuthenticatedUser() {
  const id = getAuthenticatedId();
  if (!id) return;
  const { data } = userLoader(getApiCacher(), id);
  return data;
}

export function getLastAuthenticatedUser() {
  return getLS().get("AUTH_USER");
}
