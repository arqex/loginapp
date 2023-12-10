import { getRouter } from "../routing/router";
import { ApiUser } from "../stores/apiCacher";
import { getLS } from "../stores/localStorage";
import { getUIStore } from "../stores/uiStore";
import { api } from "../stores/apiClient";

export function setLastAuthenticatedUser(user?: ApiUser) {
  user ? getLS().set("AUTH_USER", user) : getLS().del("AUTH_USER");
}

export async function login(email: string, password: string) {
  const { data } = await api.login(email, password);
  await updateAuthenticatedUser(data.authenticatedId);
}

export async function logout() {
  updateAuthenticatedUser(undefined);
  await api.logout();
}

export async function signup(email: string, password: string): Promise<number> {
  const { data, status } = await api.signup(email, password);

  if (status === 201) {
    // This is a login
    await updateAuthenticatedUser(data.authenticatedId);
  }

  // 204, it was just a signup
  return status;
}

async function updateAuthenticatedUser(id: string | undefined) {
  const uiStore = getUIStore();
  if (id) {
    const { data: user } = await api.loadUser(id);
    setLastAuthenticatedUser(user);
    uiStore.data.authenticatedUserId = id;
  } else {
    setLastAuthenticatedUser(undefined);
    uiStore.data.authenticatedUserId = null;
  }
  uiStore.emitChange();
}

export function verifyEmail(vc: string, email: string) {
  return api.verifyEmail(vc, email);
}

export function requestEmailLogin(email: string) {
  return api.requestEmailLogin(email);
}

export async function loginByOTT(key: string, ott: string) {
  const { data } = await api.loginByOTT(key, ott);
  await updateAuthenticatedUser(data.authenticatedId);
}

export function requestPasswordRecovery(email: string) {
  return api.requestPasswordRecovery(email);
}

export async function resetPassword(
  email: string,
  password: string,
  ott: string
) {
  const { data } = await api.resetPassword(email, password, ott);
  // A valid password reset will log the user in
  updateAuthenticatedUser(data.authenticatedId);
}

export function goToAuthenticatedApp() {
  getRouter()?.replace("/");
  window.location.reload();
}

export function redirectToOauth(provider: string) {
  const returnTo = encodeURIComponent(`${window.location.origin}/#/ott_login`);
  window.location.href = api.requester.getApiUrl(
    `/auth/oauth_start?provider=${provider}&returnTo=${returnTo}`
  );
}
