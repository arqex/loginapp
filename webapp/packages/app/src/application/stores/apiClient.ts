import { ApiClient, type ResponseMiddleware } from "@loginapp/api-client";
import { logout } from "../auth/auth.service";
import { getContextUser } from "../auth/auth.context";

// Instancia del ApiClient configurada para la app
export function createApiClient() {
  return new ApiClient({
    apiURL: "http://localhost:3000",
    responseMiddleware: [expiredSessionMiddleware],
  });
}

let apiClientInstance: ApiClient | undefined;

export function getApiClient(): ApiClient {
  if (!apiClientInstance) {
    apiClientInstance = createApiClient();
  }
  return apiClientInstance;
}

export function setApiClient(apiClient: ApiClient) {
  apiClientInstance = apiClient;
}

const expiredSessionMiddleware: ResponseMiddleware = (res) => {
  if (res.status === 401 && getContextUser()) {
    console.log("Expired session detected, logging out");
    logout();
  }
  return res;
};
