import { ApiClientBase } from "./ApiClientBase";
import { apiRequester } from "./ApiRequester";
import { ApiClientConfig } from "./api.types";

export class ApiClient implements ApiClientBase {
  requester: typeof apiRequester;
  constructor(config: ApiClientConfig) {
    const headers = config.headers || {};
    if (config.authToken) {
      headers[AUTH_HEADER] = getBearer(config.authToken);
    }

    this.requester = apiRequester.withHeaders(headers);
    this.requester.apiUrl = config.apiURL;
  }

  authenticate(authToken: string) {
    this.requester = this.requester.withHeaders({
      [AUTH_HEADER]: getBearer(authToken),
    });
  }

  unauthenticate() {
    const headers = { ...this.requester.headers } as any;
    delete headers[AUTH_HEADER];
    this.requester.headers = headers;
  }

  withHeaders(headers: { [headerName: string]: string }) {
    const allHeaders = { ...this.requester.headers, ...headers };
    return new ApiClient({
      apiURL: this.requester.apiUrl,
      authToken: allHeaders[AUTH_HEADER],
      headers: allHeaders,
    });
  }

  getApiUrl(route: string = "") {
    return this.requester.getApiUrl(route);
  }
}

const AUTH_HEADER = "Authorization";
function getBearer(authToken: string) {
  return `Bearer ${authToken}`;
}
