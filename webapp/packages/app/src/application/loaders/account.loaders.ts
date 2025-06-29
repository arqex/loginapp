import {
  getLoaderResult,
  loadAccountWithCache,
  loadAccountUsersWithCache,
} from "@loginapp/api-client";
import type {
  ApiClient,
  LoaderResult,
  ApiAccount,
  AccountUser,
  PaginationResponseData,
} from "@loginapp/api-client";

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

/**
 * Loader to get users in an account by account ID
 */
export function accountUsersLoader(
  apiClient: ApiClient,
  accountId: string
): LoaderResult<PaginationResponseData<AccountUser>> {
  const cachedResponse = loadAccountUsersWithCache(apiClient, accountId);
  return getLoaderResult(cachedResponse);
}
