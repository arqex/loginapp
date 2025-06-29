import type {
  ApiAccount,
  ApiTodoList,
  ApiUser,
  ListCreationPayload,
} from "./api.types";
import type { ResponseWithData } from "../apiClient.types";
import { ApiClient } from "../ApiClient";

// Create a new account
export async function createAccount(
  apiClient: ApiClient,
  name: string
): Promise<ResponseWithData<{ id: string }>> {
  return await apiClient.requester.post(`/accounts`, { name });
}

export async function loadAccount(
  apiClient: ApiClient,
  id: string
): Promise<ResponseWithData<ApiAccount>> {
  return await apiClient.requester.get(`/accounts/${id}`);
}

// Load users in an account
export async function loadAccountUsers(
  apiClient: ApiClient,
  accountId: string
): Promise<ResponseWithData<ApiUser[]>> {
  return await apiClient.requester.get(`/accounts/${accountId}/users`);
}

// Load todo lists in an account
export async function loadAccountTodoLists(
  apiClient: ApiClient,
  accountId: string
): Promise<ResponseWithData<ApiTodoList[]>> {
  return await apiClient.requester.get(`/accounts/${accountId}/lists`);
}

// Create a new todo list in an account
export async function createAccountTodoList(
  apiClient: ApiClient,
  accountId: string,
  data: ListCreationPayload
): Promise<ResponseWithData<ApiTodoList>> {
  return await apiClient.requester.post(`/accounts/${accountId}/lists`, data);
}

// Cached: Load account
export function loadAccountWithCache(apiClient: ApiClient, id: string) {
  return apiClient.requester.getCached(`/accounts/${id}`);
}

// Cached: Load users in an account
export function loadAccountUsersWithCache(
  apiClient: ApiClient,
  accountId: string
) {
  return apiClient.requester.getCached(`/accounts/${accountId}/users`);
}

// Cached: Load todo lists in an account
export function loadAccountTodoListsWithCache(
  apiClient: ApiClient,
  accountId: string
) {
  return apiClient.requester.getCached(`/accounts/${accountId}/lists`);
}
