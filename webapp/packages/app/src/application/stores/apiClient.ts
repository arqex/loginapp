import { ApiClient } from "@loginapp/api-client";

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
  if (res.status === 401 && getAuthenticatedId()) {
    console.log("Expired session detected, logging out");
    logout();
  }
  return res;
};
