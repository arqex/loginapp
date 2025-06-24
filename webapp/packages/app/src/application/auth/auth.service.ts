import type { ResponseMiddleware } from "@loginapp/api-client";
import { getApiClient } from "../stores/apiClient";
import { setContextUser, getContextUser } from "./auth.context";
import { logout as apiLogout } from "../apiMethods/auth.api";

export async function logout() {
  setContextUser(undefined);
  await apiLogout(getApiClient());
}

export const expiredSessionMiddleware: ResponseMiddleware = (res) => {
  if (res.status === 401 && getContextUser()) {
    console.log("Expired session detected, logging out");
    logout();
  }
  return res;
};

export function redirectToOauth(provider: string) {
  const returnTo = encodeURIComponent(`${window.location.origin}/#/ott_login`);
  window.location.href = getApiClient().getApiUrl(
    `/auth/oauth_start?provider=${provider}&returnTo=${returnTo}`
  );
}
