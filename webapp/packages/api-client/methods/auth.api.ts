import { ApiClient } from "../ApiClient";
import type { ResponseWithData } from "../apiClient.types";
import type {
  EmptyObject,
  LoginResponse,
  LoginResponseWithToken,
} from "./api.types";

export async function login(
  apiClient: ApiClient,
  email: string,
  password: string
) {
  return (await apiClient.requester.post("/auth/login", {
    email,
    password,
  })) as ResponseWithData<LoginResponse>;
}

export async function loginByOTT(
  apiClient: ApiClient,
  key: string,
  ott: string
) {
  return (await apiClient.requester.post("/auth/login_by_ott", {
    key,
    ott,
  })) as ResponseWithData<LoginResponse>;
}

export async function getAuthenticationToken(
  apiClient: ApiClient,
  email: string,
  password: string
) {
  return (await apiClient.requester.post("/auth/login?useCookie=false", {
    email,
    password,
  })) as ResponseWithData<LoginResponseWithToken>;
}

export async function getAuthenticationTokenByOTT(
  apiClient: ApiClient,
  key: string,
  ott: string
) {
  return (await apiClient.requester.post("/auth/login_by_ott?useCookie=false", {
    key,
    ott,
  })) as ResponseWithData<LoginResponseWithToken>;
}

export async function logout(apiClient: ApiClient) {
  return (await apiClient.requester.post(
    "/auth/logout"
  )) as ResponseWithData<EmptyObject>;
}

export async function signup(
  apiClient: ApiClient,
  email: string,
  password: string,
  useCookie = true
) {
  return (await apiClient.requester.post(
    "/auth/signup?useCookie=" + useCookie,
    {
      email,
      password,
    }
  )) as ResponseWithData<LoginResponse | LoginResponseWithToken>;
}

export async function verifyEmail(
  apiClient: ApiClient,
  vc: string,
  email: string,
  useCookie = true
) {
  return (await apiClient.requester.post(
    "/auth/verify_email?useCookie=" + useCookie,
    {
      vc,
      email,
    }
  )) as ResponseWithData<EmptyObject>;
}

export async function requestEmailLogin(apiClient: ApiClient, email: string) {
  return (await apiClient.requester.post("/auth/request_email_login", {
    email,
  })) as ResponseWithData<EmptyObject>;
}

export async function requestPasswordRecovery(
  apiClient: ApiClient,
  email: string
) {
  return (await apiClient.requester.post("/auth/request_password_recovery", {
    email,
  })) as ResponseWithData<EmptyObject>;
}

export async function resetPassword(
  apiClient: ApiClient,
  email: string,
  password: string,
  ott: string
) {
  return (await apiClient.requester.post("/auth/reset_password", {
    email,
    password,
    ott,
  })) as ResponseWithData<EmptyObject>;
}

export async function loginByProvider(
  apiClient: ApiClient,
  provider: "apple" | "google",
  token: string
) {
  return (await apiClient.requester.post(
    "/auth/login_by_provider?useCookie=false",
    {
      provider,
      token,
    }
  )) as ResponseWithData<LoginResponseWithToken>;
}

export async function signupByProvider(
  apiClient: ApiClient,
  provider: "apple" | "google",
  token: string
) {
  return (await apiClient.requester.post(
    "/auth/signup_by_provider?useCookie=false",
    {
      provider,
      token,
    }
  )) as ResponseWithData<LoginResponseWithToken>;
}

export async function setPassword(apiClient: ApiClient, password: string) {
  return (await apiClient.requester.post("/auth/set_password", {
    password,
  })) as ResponseWithData<LoginResponse>;
}
