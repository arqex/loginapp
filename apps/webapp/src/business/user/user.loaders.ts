import { ApiClient, getLoaderResult, loadUser } from "@loginapp/api-client";

export function userLoader(apiClient: ApiClient, id: string) {
  return getLoaderResult(loadUser(apiClient, id));
}
