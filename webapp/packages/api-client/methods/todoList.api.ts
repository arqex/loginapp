import type { ApiTodoItem, ApiTodoList } from "./api.types";
import type { ResponseWithData } from "../apiClient.types";
import { ApiClient } from "../ApiClient";

// TodoList API methods

export async function loadTodoList(
  apiClient: ApiClient,
  id: string
): Promise<ResponseWithData<ApiTodoList>> {
  return await apiClient.requester.get(`/lists/${id}`);
}

export async function updateTodoList(
  apiClient: ApiClient,
  id: string,
  data: { name: string }
): Promise<ResponseWithData<ApiTodoList>> {
  return await apiClient.requester.patch(`/lists/${id}`, data);
}

export async function deleteTodoList(
  apiClient: ApiClient,
  id: string
): Promise<ResponseWithData<void>> {
  return await apiClient.requester.delete(`/lists/${id}`);
}

// TodoItem API methods

export async function loadTodoListItems(
  apiClient: ApiClient,
  todoListId: string
): Promise<ResponseWithData<ApiTodoItem[]>> {
  return await apiClient.requester.get(`/lists/${todoListId}/items`);
}

export async function createTodoItem(
  apiClient: ApiClient,
  todoListId: string,
  data: { title: string }
): Promise<ResponseWithData<ApiTodoItem>> {
  return await apiClient.requester.post(`/lists/${todoListId}/items`, data);
}

export async function updateTodoItem(
  apiClient: ApiClient,
  id: string,
  data: { title?: string; completed?: boolean }
): Promise<ResponseWithData<ApiTodoItem>> {
  return await apiClient.requester.patch(`/items/${id}`, data);
}

export async function deleteTodoItem(
  apiClient: ApiClient,
  id: string
): Promise<ResponseWithData<void>> {
  return await apiClient.requester.delete(`/items/${id}`);
}

// Cached versions

export function loadTodoListWithCache(apiClient: ApiClient, id: string) {
  return apiClient.requester.getCached(`/lists/${id}`);
}

export function loadTodoListItemsWithCache(
  apiClient: ApiClient,
  todoListId: string
) {
  return apiClient.requester.getCached(`/lists/${todoListId}/items`);
}

// Invalidators

export function invalidateTodoList(apiClient: ApiClient, id: string) {
  return apiClient.invalidateCacheResponse(`/lists/${id}`);
}

export function invalidateTodoListItems(
  apiClient: ApiClient,
  todoListId: string
) {
  return apiClient.invalidateCacheResponse(`/lists/${todoListId}/items`);
}
