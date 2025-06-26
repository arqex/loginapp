import { getLoaderResult, loadAccountWithCache } from "@loginapp/api-client";
import type { ApiClient, LoaderResult, ApiAccount } from "@loginapp/api-client";

/**
 * Loader to get account data by ID
 */
export function accountLoader(
  apiClient: ApiClient,
  accountId: string
): LoaderResult<ApiAccount> {
  const cachedResponse = loadAccountWithCache(apiClient, accountId);
  return getLoaderResult(cachedResponse);
}
