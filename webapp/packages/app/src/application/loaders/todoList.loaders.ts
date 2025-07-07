import {
  loadAccountTodoListsWithCache,
  loadTodoListWithCache,
  loadTodoListItemsWithCache,
} from "@loginapp/api-client";
import { createLoader } from "@loginapp/api-client/loaders";

/**
 * Loader to get account TodoLists by account ID
 */
export const accountTodoListsLoader = createLoader(
  loadAccountTodoListsWithCache
);

/**
 * Loader to get a specific TodoList by ID
 */
export const todoListLoader = createLoader(loadTodoListWithCache);

/**
 * Loader to get TodoItems for a specific TodoList
 */
export const todoListItemsLoader = createLoader(loadTodoListItemsWithCache);
