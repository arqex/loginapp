import {
  ApiUser,
  loadUser as apiLoadUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "@loginapp/api-client";
import { ApiCacher } from "../ApiCacher";

export function loadUser(apiCacher: ApiCacher, id: string) {
  const result = apiLoadUser(apiCacher.apiClient, id);
  const { isLoading, promise } = result;
  isLoading && promise.then(() => apiCacher.emitChange());
  return result;
}

export async function loadUserOld(apiCacher: ApiCacher, id: string) {
  const response = await apiLoadUser(apiCacher.apiClient, id);
  apiCacher.data = {
    ...apiCacher.data,
    users: {
      ...apiCacher.data.users,
      [id]: response.data,
    },
  };
  apiCacher.emitChange();
  return response;
}

export async function updateUser(
  apiCacher: ApiCacher,
  id: string,
  data: Partial<ApiUser>
) {
  const response = await apiUpdateUser(apiCacher.apiClient, id, data);
  apiCacher.data = {
    ...apiCacher.data,
    users: {
      ...apiCacher.data.users,
      [id]: {
        ...(apiCacher.data.users[id] || {}),
        ...data,
      },
    },
  };
  apiCacher.emitChange();
  return response;
}

export async function deleteUser(apiCacher: ApiCacher, id: string) {
  const response = await apiDeleteUser(apiCacher.apiClient, id);
  const users = { ...apiCacher.data.users };
  delete users[id];
  apiCacher.data = {
    ...apiCacher.data,
    users,
  };
  apiCacher.emitChange();
  return response;
}
