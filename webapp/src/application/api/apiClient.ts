import { ApiError } from "./ApiError";
import { ResponseWithData } from "./api.types";

export function getApiUrl(route: string) {
  return `http://localhost:3000${route}`;
}

export const api = {
  post: async (route: string, data: any) => {
    const res = await fetch(getApiUrl(route), {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    return await handleResponse(res);
  },
  get: async (route: string) => {
    const res = await fetch(getApiUrl(route), {
      method: "GET",
      credentials: "include",
    });
    return await handleResponse(res);
  },
  patch: async (route: string, data: any) => {
    const res = await fetch(getApiUrl(route), {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
      credentials: "include",
    });
    return await handleResponse(res);
  },
  delete: async (route: string) => {
    const res = await fetch(getApiUrl(route), {
      method: "DELETE",
      credentials: "include",
    });
    return await handleResponse(res);
  },
};

async function handleResponse(res: Response): Promise<ResponseWithData<any>> {
  let resWithData: ResponseWithData<any> | undefined;
  if (res.status === 204) return await enhanceResponse(res, {});
  else {
    try {
      resWithData = await enhanceResponse(res);
    } catch (e) {
      throw new ApiError(await enhanceResponse(res, "not_json"));
    }
  }
  if (res.status >= 300) throw new ApiError(resWithData);
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
