import { loadUser } from "../../business/user/user.service";
import { LoginResponse, ResponseWithData } from "../api/api.types";
import { api } from "../api/apiClient";
import { getRouter } from "../routing/router";
import { ApiUser } from "../stores/apiCacher";
import { getLS } from "../stores/localStorage";
import { getUIStore } from "../stores/uiStore";

export function setLastAuthenticatedUser(user?: ApiUser) {
  user ? getLS().set("AUTH_USER", user) : getLS().del("AUTH_USER");
}

export async function login(email: string, password: string) {
  const { data } = (await api.post("/auth/login", {
    email,
    password,
  })) as ResponseWithData<any>;

  await updateAuthenticatedUser(data.authenticatedId);
}

export async function logout() {
  updateAuthenticatedUser(undefined);
  await api.post("/auth/logout", {});
}

export async function signup(email: string, password: string): Promise<number> {
  const { data, status } = (await api.post("/auth/signup", {
    email,
    password,
  })) as ResponseWithData<LoginResponse>;

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
    const user = await loadUser(id);
    setLastAuthenticatedUser(user);
    uiStore.data.authenticatedUserId = id;
  } else {
    setLastAuthenticatedUser(undefined);
    uiStore.data.authenticatedUserId = null;
  }
  uiStore.emitChange();
}

export function verifyEmail(vc: string, email: string) {
  return api.post("/auth/verify_email", { vc, email });
}

export function requestEmailLogin(email: string) {
  return api.post("/auth/request_email_login", { email });
}

export async function loginByOTT(email: string, ott: string) {
  const { data } = (await api.post("/auth/login_by_ott", {
    email,
    ott,
  })) as ResponseWithData<LoginResponse>;
  await updateAuthenticatedUser(data.authenticatedId);
}

export function requestPasswordRecovery(email: string) {
  return api.post("/auth/request_password_recovery", { email });
}

export async function resetPassword(
  email: string,
  password: string,
  ott: string
) {
  const { data } = (await api.post("/auth/reset_password", {
    email,
    password,
    ott,
  })) as ResponseWithData<LoginResponse>;
  // A valid password reset will log the user in
  updateAuthenticatedUser(data.authenticatedId);
}

export function goToAuthenticatedApp() {
  getRouter()?.replace("/");
  window.location.reload();
}
