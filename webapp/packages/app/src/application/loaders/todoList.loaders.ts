import {
  getLoaderResult,
  loadAccountTodoListsWithCache,
} from "@loginapp/api-client";
import type {
  ApiClient,
  LoaderResult,
  ApiTodoList,
} from "@loginapp/api-client";

/**
 * Loader to get account TodoLists by account ID
 */
export function accountTodoListsLoader(
  apiClient: ApiClient,
  accountId: string
): LoaderResult<ApiTodoList[]> {
  const cachedResponse = loadAccountTodoListsWithCache(apiClient, accountId);
  return getLoaderResult(cachedResponse);
}
