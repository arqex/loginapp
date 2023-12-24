import { ApiClientBase } from "../ApiClientBase";
import {
  LoginResponse,
  LoginResponseWithToken,
  ResponseWithData,
} from "../api.types";

export async function login(
  apiClient: ApiClientBase,
  email: string,
  password: string
) {
  return (await apiClient.requester.post("/auth/login", {
    email,
    password,
  })) as ResponseWithData<LoginResponse>;
}

export async function loginByOTT(
  apiClient: ApiClientBase,
  key: string,
  ott: string
) {
  return (await apiClient.requester.post("/auth/login_by_ott", {
    key,
    ott,
  })) as ResponseWithData<LoginResponse>;
}

export async function getAuthenticationToken(
  apiClient: ApiClientBase,
  email: string,
  password: string
) {
  return (await apiClient.requester.post("/auth/login?useCookie=false", {
    email,
    password,
  })) as ResponseWithData<LoginResponseWithToken>;
}

export async function getAuthenticationTokenByOTT(
  apiClient: ApiClientBase,
  key: string,
  ott: string
) {
  return (await apiClient.requester.post("/auth/login_by_ott?useCookie=false", {
    key,
    ott,
  })) as ResponseWithData<LoginResponseWithToken>;
}

export async function logout(apiClient: ApiClientBase) {
  return (await apiClient.requester.post(
    "/auth/logout"
  )) as ResponseWithData<{}>;
}

export async function signup(
  apiClient: ApiClientBase,
  email: string,
  password: string
) {
  return (await apiClient.requester.post("/auth/signup", {
    email,
    password,
  })) as ResponseWithData<LoginResponse>;
}

export async function verifyEmail(
  apiClient: ApiClientBase,
  vc: string,
  email: string
) {
  return (await apiClient.requester.post("/auth/verify_email", {
    vc,
    email,
  })) as ResponseWithData<LoginResponseWithToken>;
}

export async function requestEmailLogin(
  apiClient: ApiClientBase,
  email: string
) {
  return (await apiClient.requester.post("/auth/request_email_login", {
    email,
  })) as ResponseWithData<{}>;
}

export async function requestPasswordRecovery(
  apiClient: ApiClientBase,
  email: string
) {
  return (await apiClient.requester.post("/auth/request_password_recovery", {
    email,
  })) as ResponseWithData<{}>;
}

export async function resetPassword(
  apiClient: ApiClientBase,
  email: string,
  password: string,
  ott: string
) {
  return (await apiClient.requester.post("/auth/reset_password", {
    email,
    password,
    ott,
  })) as ResponseWithData<LoginResponse>;
}
