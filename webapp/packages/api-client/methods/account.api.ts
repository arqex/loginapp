import { ApiAccount } from "./api.types";
import { ResponseWithData } from "../apiClient.types";
import { ApiClient } from "../ApiClient";

export async function loadAccount(
  apiClient: ApiClient,
  id: string
): Promise<ResponseWithData<ApiAccount>> {
  return await apiClient.requester.get(`/accounts/${id}`);
}
