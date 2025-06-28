import {
  getLoaderResult,
  loadAccountTodoListsWithCache,
  loadTodoListWithCache,
  loadTodoListItemsWithCache,
} from "@loginapp/api-client";
import type {
  ApiClient,
  LoaderResult,
  ApiTodoList,
  ApiTodoItem,
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

/**
 * Loader to get a specific TodoList by ID
 */
export function todoListLoader(
  apiClient: ApiClient,
  todoListId: string
): LoaderResult<ApiTodoList> {
  const cachedResponse = loadTodoListWithCache(apiClient, todoListId);
  return getLoaderResult(cachedResponse);
}

/**
 * Loader to get TodoItems for a specific TodoList
 */
export function todoListItemsLoader(
  apiClient: ApiClient,
  todoListId: string
): LoaderResult<ApiTodoItem[]> {
  const cachedResponse = loadTodoListItemsWithCache(apiClient, todoListId);
  return getLoaderResult(cachedResponse);
}
