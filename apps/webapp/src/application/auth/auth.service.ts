import { getRouter } from "../routing/router";
import { getApiCacher } from "../stores/apiCacher";
import { apiClient } from "../stores/apiClient";
import { getLS } from "../stores/localStorage";
import { getUIStore } from "../stores/uiStore";
import { loadUser } from "@loginapp/api-cacher";
import {
  login as apiLogin,
  logout as apiLogout,
  signup as apiSignup,
  loginByOTT as apiLoginByOTT,
  requestPasswordRecovery as apiRequestPasswordRecovery,
  resetPassword as apiResetPassword,
  verifyEmail as apiVerifyEmail,
  requestEmailLogin as apiRequestEmailLogin,
  ApiUser,
} from "@loginapp/api-client";

export function setLastAuthenticatedUser(user?: ApiUser) {
  user ? getLS().set("AUTH_USER", user) : getLS().del("AUTH_USER");
}

export async function login(email: string, password: string) {
  const { data } = await apiLogin(apiClient, email, password);
  await updateAuthenticatedUser(data.authenticatedId);
}

export async function logout() {
  updateAuthenticatedUser(undefined);
  await apiLogout(apiClient);
}

export async function signup(email: string, password: string): Promise<number> {
  const { data, status } = await apiSignup(apiClient, email, password);

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
    const { data: user } = await loadUser(getApiCacher(), id).promise;
    setLastAuthenticatedUser(user);
    uiStore.data.authenticatedUserId = id;
  } else {
    setLastAuthenticatedUser(undefined);
    uiStore.data.authenticatedUserId = null;
  }
  uiStore.emitChange();
}

export function verifyEmail(vc: string, email: string) {
  return apiVerifyEmail(apiClient, vc, email);
}

export function requestEmailLogin(email: string) {
  return apiRequestEmailLogin(apiClient, email);
}

export async function loginByOTT(key: string, ott: string) {
  const { data } = await apiLoginByOTT(apiClient, key, ott);
  await updateAuthenticatedUser(data.authenticatedId);
}

export function requestPasswordRecovery(email: string) {
  return apiRequestPasswordRecovery(apiClient, email);
}

export async function resetPassword(
  email: string,
  password: string,
  ott: string
) {
  const { data } = await apiResetPassword(apiClient, email, password, ott);
  // A valid password reset will log the user in
  updateAuthenticatedUser(data.authenticatedId);
}

export function goToAuthenticatedApp() {
  getRouter()?.replace("/");
  window.location.reload();
}

export function redirectToOauth(provider: string) {
  const returnTo = encodeURIComponent(`${window.location.origin}/#/ott_login`);
  window.location.href = apiClient.getApiUrl(
    `/auth/oauth_start?provider=${provider}&returnTo=${returnTo}`
  );
}
