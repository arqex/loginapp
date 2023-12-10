import { apiRequester } from "./ApiRequester";
import { AuthApiMixin } from "./methods/auth.api";
import { UserApiMixin } from "./methods/user.api";

export class ApiClient {
  requester: typeof apiRequester;
  constructor(apiUrl: string) {
    this.requester = apiRequester.withHeaders({});
    this.requester.apiUrl = apiUrl;
  }
}

export interface ApiClient extends AuthApiMixin, UserApiMixin {}
applyMixins(ApiClient, [AuthApiMixin, UserApiMixin]);

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}
