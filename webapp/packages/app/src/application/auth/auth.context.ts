import { getUIStore } from "../stores/uiStore";
import type { ApiOrg, ApiUser } from "../apiMethods/api.types";
import { getLS } from "../stores/localStorage";

export function getContextUser() {
  return getUIStore().data.contextUser;
}

export function setContextUser(user?: ApiUser) {
  const uiStore = getUIStore();
  uiStore.data.contextUser = user;
  storeContextUser(user);
  uiStore.emitChange();
}

export function retrieveStoredContextUser(): ApiUser | undefined {
  return getLS().get("CONTEXT_USER") as ApiUser | undefined;
}

export function storeContextUser(user?: ApiUser) {
  if (user) {
    getLS().set("CONTEXT_USER", user);
  } else {
    getLS().del("CONTEXT_USER");
  }
}

export type AuthContext = {
  user: ApiUser;
  org: ApiOrg;
};

export function restoreAuthContext() {
  const user = retrieveStoredContextUser();
  const org = retrieveStoredContextOrg();
  if (user && org) {
    setContextUser(user);
    setContextOrg(org);
    return { user, org } as AuthContext;
  }
}

export function getContextOrg() {
  return getUIStore().data.contextOrg;
}

export function setContextOrg(user?: ApiOrg) {
  const uiStore = getUIStore();
  uiStore.data.contextOrg = user;
  storeContextOrg(user);
  uiStore.emitChange();
}

export function retrieveStoredContextOrg(): ApiOrg | undefined {
  return getLS().get("CONTEXT_ORG") as ApiOrg | undefined;
}

export function storeContextOrg(user?: ApiOrg) {
  if (user) {
    getLS().set("CONTEXT_ORG", user);
  } else {
    getLS().del("CONTEXT_ORG");
  }
}
