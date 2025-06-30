import {
  getLoaderResult,
  getLoaderResultWithErrors,
  loadAccountInvitationsWithCache,
} from "@loginapp/api-client";
import type {
  ApiClient,
  LoaderResult,
  LoaderResultWithErrors,
  ApiInvitation,
} from "@loginapp/api-client";

/**
 * Loader to get invitations for an account by account ID
 */
export function accountInvitationsLoader(
  apiClient: ApiClient,
  accountId: string
): LoaderResult<ApiInvitation[]> {
  const cachedResponse = loadAccountInvitationsWithCache(apiClient, accountId);
  return getLoaderResult(cachedResponse);
}

/**
 * Loader to get invitations for an account with error handling
 */
export function accountInvitationsLoaderWithErrors(
  apiClient: ApiClient,
  accountId: string
): LoaderResultWithErrors<ApiInvitation[]> {
  const cachedResponse = loadAccountInvitationsWithCache(apiClient, accountId);
  return getLoaderResultWithErrors(cachedResponse);
}
