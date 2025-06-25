import { getUIStore, type AuthContext } from "../stores/uiStore";
import { getLS } from "../stores/localStorage";
import type { ApiAccount, ApiAccountRole, ApiUser } from "@loginapp/api-client";

export function getAuthenticatedId() {
  return getUIStore().data.authenticatedUserId;
}

export function setAuthenticatedId(id = "") {
  const uiStore = getUIStore();
  uiStore.data.authenticatedUserId = id;
  storeAuthenticatedId(id);
  uiStore.emitChange();
}

export function restoreAuthenticatedId() {
  const id = getLS().get("AUTH_ID");
  if (typeof id === "string") {
    setAuthenticatedId(id);
  }
}

function storeAuthenticatedId(id: string) {
  if (id) {
    getLS().set("AUTH_ID", id);
  } else {
    getLS().del("AUTH_ID");
  }
}

export function getAuthContext(): AuthContext | undefined {
  return getUIStore().data.authContext;
}

export function setAuthContext(
  user: ApiUser,
  account?: ApiAccount,
  role?: ApiAccountRole
) {
  // Get the current context, if any of the values have changed, update the context
  const currentContext = getAuthContext();
  if (
    !currentContext ||
    currentContext.user !== user ||
    currentContext.account !== account ||
    currentContext.role !== role
  ) {
    getUIStore().data.authContext = {
      user,
      account,
      role,
    };
    getUIStore().emitChange();
  }
}
