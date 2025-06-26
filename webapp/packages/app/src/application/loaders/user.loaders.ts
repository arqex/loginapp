import {
  getLoaderResult,
  loadUserWithCache,
  loadUserAccountsWithCache,
} from "@loginapp/api-client";
import type {
  ApiClient,
  LoaderResult,
  ApiUser,
  UserAccount,
} from "@loginapp/api-client";

/**
 * Loader to get user data by ID
 */
export function userLoader(
  apiClient: ApiClient,
  userId: string
): LoaderResult<ApiUser> {
  const cachedResponse = loadUserWithCache(apiClient, userId);
  return getLoaderResult(cachedResponse);
}

/**
 * Loader to get user accounts by user ID
 */
export function userAccountsLoader(
  apiClient: ApiClient,
  userId: string
): LoaderResult<UserAccount[]> {
  const cachedResponse = loadUserAccountsWithCache(apiClient, userId);
  return getLoaderResult(cachedResponse);
}
