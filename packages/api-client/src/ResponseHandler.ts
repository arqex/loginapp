import {
  CachedResponse,
  LoaderResult,
  LoaderResultWithErrors,
  ResponseMiddleware,
  ResponseWithData,
} from "./api.types";
import { ApiError } from "./ApiError";

export async function handleResponse(
  res: Response,
  throwOnApiError = false,
  middlewares: ResponseMiddleware[]
): Promise<ResponseWithData<any>> {
  res = applyMiddleware(res, middlewares);
  let resWithData: ResponseWithData<any> | undefined;
  if (res.status === 204) return await enhanceResponse(res, {});

  if (res.status >= 300 && throwOnApiError) {
    throw new ApiError(await enhanceResponse(res));
  } else {
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

function applyMiddleware(res: Response, middlewares: ResponseMiddleware[]) {
  let applied = res;
  const toApply = [...middlewares];
  while (toApply.length > 0) {
    const current = toApply.shift()!;
    applied = current(applied);
  }
  return applied;
}

export function getLoaderResult<T>(
  cachedResponse: CachedResponse<T>
): LoaderResult<T> {
  const { response, isLoading } = cachedResponse;
  if (!response)
    return {
      isLoading: isLoading,
      data: undefined,
    };

  if (response.status >= 300) throw new ApiError(response);

  return {
    isLoading: isLoading,
    data: response.data,
  };
}

export function getLoaderResultWithErrors<T>(
  cachedResponse: CachedResponse<T>
): LoaderResultWithErrors<T> {
  const { response, isLoading } = cachedResponse;
  if (!response)
    return {
      isLoading: isLoading,
      error: undefined,
      data: undefined,
    };

  if (response.status >= 300)
    return {
      isLoading: isLoading,
      error: response.data,
      data: undefined,
    };

  return {
    isLoading: isLoading,
    error: undefined,
    data: response.data,
  };
}

export function createEmptyResponse(): ResponseWithData<any> {
  return {
    data: undefined,
    body: null,
    bodyUsed: true,
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
    statusText: "",
    type: "basic",
    url: "",
  };
}
