import { ApiClientBase } from "../ApiClientBase";
import { apiRequester } from "../ApiRequester";
import {
  LoginResponse,
  LoginResponseWithToken,
  ResponseWithData,
} from "../api.types";

export abstract class AuthApiMixin {
  abstract requester: typeof apiRequester;

  async login(email: string, password: string) {
    return (await this.requester.post("/auth/login", {
      email,
      password,
    })) as ResponseWithData<LoginResponse>;
  }

  async loginByOTT(key: string, ott: string) {
    return (await this.requester.post("/auth/login_by_ott", {
      key,
      ott,
    })) as ResponseWithData<LoginResponse>;
  }

  async getAuthenticationToken(
    this: ApiClientBase,
    email: string,
    password: string
  ) {
    return (await this.requester.post("/auth/login?useCookie=false", {
      email,
      password,
    })) as ResponseWithData<LoginResponseWithToken>;
  }

  async getAuthenticationTokenByOTT(
    this: ApiClientBase,
    key: string,
    ott: string
  ) {
    return (await this.requester.post("/auth/login_by_ott?useCookie=false", {
      key,
      ott,
    })) as ResponseWithData<LoginResponseWithToken>;
  }

  async logout() {
    return (await this.requester.post("/auth/logout")) as ResponseWithData<{}>;
  }

  async signup(email: string, password: string) {
    return (await this.requester.post("/auth/signup", {
      email,
      password,
    })) as ResponseWithData<LoginResponse>;
  }

  async verifyEmail(vc: string, email: string) {
    return (await this.requester.post("/auth/verify_email", {
      vc,
      email,
    })) as ResponseWithData<{}>;
  }

  async requestEmailLogin(email: string) {
    return (await this.requester.post("/auth/request_email_login", {
      email,
    })) as ResponseWithData<{}>;
  }

  async requestPasswordRecovery(email: string) {
    return (await this.requester.post("/auth/request_password_recovery", {
      email,
    })) as ResponseWithData<{}>;
  }

  async resetPassword(email: string, password: string, ott: string) {
    return (await this.requester.post("/auth/reset_password", {
      email,
      password,
      ott,
    })) as ResponseWithData<LoginResponse>;
  }
}
