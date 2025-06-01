import { api } from "../../application/stores/apiClient";

export async function loadUser(id: string) {
  const { data } = await api.loadUser(id);
  return data;
}
