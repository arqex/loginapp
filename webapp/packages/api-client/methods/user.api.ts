import { CachedResponse, ResponseWithData } from "../apiClient.types";
import { ApiClientBase } from "../ApiClientBase";
import { ApiUser, EmptyObject } from "./api.types";

export async function loadUser(apiClient: ApiClientBase, id: string) {
  return (await apiClient.requester.get(
    `/users/${id}`
  )) as ResponseWithData<ApiUser>;
}

export function loadUserWithCache(apiClient: ApiClientBase, id: string) {
  return apiClient.requester.getCached(
    `/users/${id}`
  ) as CachedResponse<ApiUser>;
}

export async function updateUser(
  apiClient: ApiClientBase,
  id: string,
  data: Partial<ApiUser>
) {
  return (await apiClient.requester.patch(
    `/users/${id}`,
    data
  )) as ResponseWithData<EmptyObject>;
}

export async function deleteUser(apiClient: ApiClientBase, id: string) {
  return (await apiClient.requester.delete(
    `/users/${id}`
  )) as ResponseWithData<EmptyObject>;
}
