import { ApiClient } from "../ApiClient";
import { CachedResponse, ResponseWithData } from "../apiClient.types";
import { ApiUser, EmptyObject } from "./api.types";

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
