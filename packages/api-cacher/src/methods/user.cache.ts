import {
  ApiUser,
  loadUser as apiLoadUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "@loginapp/api-client";
import { ApiCacher } from "../ApiCacher";
import {
  clearCachedResult,
  setCachedResult,
} from "@loginapp/api-client/src/RequestMemo";
import { emitOnLoad } from "../apiCacher.utils";

export function loadUser(apiCacher: ApiCacher, id: string) {
  const result = apiLoadUser(apiCacher.apiClient, id);
  emitOnLoad(apiCacher, result);
  return result;
}

export async function updateUser(
  apiCacher: ApiCacher,
  id: string,
  data: Partial<ApiUser>
) {
  const { apiClient } = apiCacher;
  const updateResponse = await apiUpdateUser(apiClient, id, data);
  const { response } = apiLoadUser(apiClient, id);
  if (response?.data && response.status < 300) {
    const user = { ...response.data, ...data };
    setCachedResult(apiClient.getApiUrl(`/users/${id}`), user);
    apiCacher.emitChange();
  }
  return updateResponse;
}

export async function deleteUser(apiCacher: ApiCacher, id: string) {
  const response = await apiDeleteUser(apiCacher.apiClient, id);
  clearCachedResult(apiCacher.apiClient.getApiUrl(`/users/${id}`));
  apiCacher.emitChange();
  return response;
}
