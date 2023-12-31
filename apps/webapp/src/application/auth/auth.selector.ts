import { userLoader } from "../../business/user/user.loaders";
import { apiClient } from "../stores/apiClient";
import { getLS } from "../stores/localStorage";
import { getUIStore } from "../stores/uiStore";

export function getAuthenticatedId() {
  return getUIStore().data.authenticatedUserId;
}

export function getAuthenticatedUser() {
  const id = getAuthenticatedId();
  if (!id) return;
  const { data } = userLoader(apiClient, id);
  return data;
}

export function getLastAuthenticatedUser() {
  return getLS().get("AUTH_USER");
}
