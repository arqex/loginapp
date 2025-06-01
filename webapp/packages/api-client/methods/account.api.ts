import { ApiAccount } from "./api.types";
import { ApiClientBase } from "../ApiClientBase";
import { ResponseWithData } from "../apiClient.types";

export async function loadAccount(
  apiClient: ApiClientBase,
  id: string
): Promise<ResponseWithData<ApiAccount>> {
  return await apiClient.requester.get(`/accounts/${id}`);
}
