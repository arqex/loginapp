import type {
  ApiAccount,
  ApiTodoList,
  AccountUser,
  ListCreationPayload,
  PaginationResponseData,
  ApiInvitation,
  CreateInvitationPayload,
} from "./api.types";
import type { ResponseWithData, CachedResponse } from "../apiClient.types";
import { ApiClient } from "../ApiClient";

// Create a new account
export async function createAccount(
  apiClient: ApiClient,
  name: string
): Promise<ResponseWithData<{ id: string }>> {
  return await apiClient.requester.post(`/accounts`, { name });
}

// Update account
export async function updateAccount(
  apiClient: ApiClient,
  accountId: string,
  data: { name?: string }
): Promise<ResponseWithData<ApiAccount>> {
  return await apiClient.requester.patch(`/accounts/${accountId}`, data);
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
): Promise<ResponseWithData<PaginationResponseData<AccountUser>>> {
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

// Load invitations for an account
export async function loadAccountInvitations(
  apiClient: ApiClient,
  accountId: string
): Promise<ResponseWithData<ApiInvitation[]>> {
  return await apiClient.requester.get(`/accounts/${accountId}/invitations`);
}

// Load invitations for an account with caching
export function loadAccountInvitationsWithCache(
  apiClient: ApiClient,
  accountId: string
): CachedResponse<ApiInvitation[]> {
  return apiClient.requester.getCached(`/accounts/${accountId}/invitations`);
}

// Create a new invitation for an account
export async function createAccountInvitation(
  apiClient: ApiClient,
  accountId: string,
  data: CreateInvitationPayload
): Promise<ResponseWithData<ApiInvitation>> {
  return await apiClient.requester.post(
    `/accounts/${accountId}/invitations`,
    data
  );
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

// Cache invalidation functions
export function clearAccountCache(apiClient: ApiClient, accountId: string) {
  apiClient.clearCachedResult(`/accounts/${accountId}`);
}

export function clearAccountUsersCache(
  apiClient: ApiClient,
  accountId: string
) {
  apiClient.clearCachedResult(`/accounts/${accountId}/users`);
}

export function clearAccountTodoListsCache(
  apiClient: ApiClient,
  accountId: string
) {
  apiClient.clearCachedResult(`/accounts/${accountId}/lists`);
}

// Cache invalidation functions for invitations
export function clearAccountInvitationsCache(
  apiClient: ApiClient,
  accountId: string
) {
  apiClient.clearCachedResult(`/accounts/${accountId}/invitations`);
}

export function invalidateAccountInvitations(
  apiClient: ApiClient,
  accountId: string
) {
  apiClient.invalidateCacheResponse(`/accounts/${accountId}/invitations`);
}
