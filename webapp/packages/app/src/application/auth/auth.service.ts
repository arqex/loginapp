import type { ResponseMiddleware } from "@loginapp/api-client";
import { getApiClient } from "../stores/apiClient";
import { logout as apiLogout } from "@loginapp/api-client";
import { getAuthenticatedId, setAuthenticatedId } from "./auth.context";

export async function logout() {
  setAuthenticatedId(undefined);
  await apiLogout(getApiClient());
}

export const expiredSessionMiddleware: ResponseMiddleware = (res) => {
  if (res.status === 401 && getAuthenticatedId()) {
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
