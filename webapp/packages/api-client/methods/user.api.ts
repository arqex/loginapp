import { ApiClient } from "../ApiClient";
import type { CachedResponse, ResponseWithData } from "../apiClient.types";
import type { ApiUser, EmptyObject, UserAccount } from "./api.types";

export async function loadUser(apiClient: ApiClient, id: string) {
  return (await apiClient.requester.get(
    `/users/${id}`
  )) as ResponseWithData<ApiUser>;
}

export function loadUserWithCache(apiClient: ApiClient, id: string) {
  return apiClient.requester.getCached(
    `/users/${id}`
  ) as CachedResponse<ApiUser>;
}

export async function loadUserAccounts(apiClient: ApiClient, id: string) {
  return (await apiClient.requester.get(
    `/users/${id}/accounts`
  )) as ResponseWithData<UserAccount[]>;
}

export function loadUserAccountsWithCache(apiClient: ApiClient, id: string) {
  return apiClient.requester.getCached(
    `/users/${id}/accounts`
  ) as CachedResponse<UserAccount[]>;
}

export async function updateUser(
  apiClient: ApiClient,
  id: string,
  data: Partial<ApiUser>
) {
  return (await apiClient.requester.patch(
    `/users/${id}`,
    data
  )) as ResponseWithData<EmptyObject>;
}

export async function deleteUser(apiClient: ApiClient, id: string) {
  return (await apiClient.requester.delete(
    `/users/${id}`
  )) as ResponseWithData<EmptyObject>;
}

export function invalidateUserAccountsCache(apiClient: ApiClient, id: string) {
  apiClient.invalidateCacheResponse(`/users/${id}/accounts`);
}

export function clearUserAccountsCache(apiClient: ApiClient, id: string) {
  apiClient.clearCachedResult(`/users/${id}/accounts`);
}
