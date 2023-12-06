import { api } from "../../application/api/apiClient";
import { ApiUser } from "../../application/stores/apiCacher";

export async function loadUser(id: string): Promise<ApiUser | undefined> {
  const { data } = await api.get(`/users/${id}`);
  return data;
}
