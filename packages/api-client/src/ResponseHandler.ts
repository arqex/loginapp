import { ResponseWithData } from "./api.types";
import { ApiError } from "./ApiError";

export async function handleResponse(
  res: Response
): Promise<ResponseWithData<any>> {
  let resWithData: ResponseWithData<any> | undefined;
  if (res.status === 204) return await enhanceResponse(res, {});
  else {
    try {
      resWithData = await enhanceResponse(res);
    } catch (e) {
      throw new ApiError(await enhanceResponse(res, "not_json"));
    }
  }
  return resWithData;
}

async function enhanceResponse<T>(
  res: Response,
  data?: any
): Promise<ResponseWithData<T>> {
  return {
    data: data || (await res.json()),
    body: res.body,
    bodyUsed: res.bodyUsed,
    headers: res.headers,
    ok: res.ok,
    redirected: res.redirected,
    status: res.status,
    statusText: res.statusText,
    type: res.type,
    url: res.url,
  };
}
