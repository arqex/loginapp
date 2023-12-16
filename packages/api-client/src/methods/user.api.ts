import { ApiClientBase } from "../ApiClientBase";
import { ApiUser, CachedResponse, ResponseWithData } from "../api.types";

export function loadUser(apiClient: ApiClientBase, id: string) {
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
  )) as ResponseWithData<{}>;
}

export async function deleteUser(apiClient: ApiClientBase, id: string) {
  return (await apiClient.requester.delete(
    `/users/${id}`
  )) as ResponseWithData<{}>;
}
