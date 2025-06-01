import {
  CachedResponse,
  LoaderResult,
  LoaderResultWithErrors,
  ResponseMiddleware,
  ResponseWithData,
} from "./apiClient.types";
import { ApiError } from "./ApiError";

export async function handleResponse(
  res: Response,
  throwOnApiError = false,
  middlewares: ResponseMiddleware[],
  requestOptions: RequestInit
): Promise<ResponseWithData<any>> {
  const resWithData = await applyMiddleware(
    await enhanceResponse(res),
    requestOptions,
    middlewares
  );

  const { status } = res;

  if (status >= 300 && throwOnApiError) {
    throw new ApiError(resWithData, requestOptions);
  }

  return resWithData;
}

async function enhanceResponse<T>(res: Response): Promise<ResponseWithData<T>> {
  let data = await res.text().catch(() => ({}));
  try {
    data = JSON.parse(data as string);
  } catch (e) {
    // do nothing
  }

  return {
    data: data as T,
    body: res.body,
    bodyUsed: res.bodyUsed,
    headers: parseHeaders(res.headers),
    ok: res.ok,
    redirected: res.redirected,
    status: res.status,
    statusText: res.statusText,
    type: res.type,
    url: res.url,
  };
}

async function applyMiddleware(
  res: ResponseWithData<any>,
  requestOptions: RequestInit,
  middlewares: ResponseMiddleware[]
) {
  try {
    let applied = res;
    const toApply = [...middlewares];
    while (toApply.length > 0) {
      const current = toApply.shift()!;
      applied = await current(applied, requestOptions);
    }
    return applied;
  } catch (e) {
    console.error("Could not apply middleware", e);
    return res;
  }
}

function parseHeaders(headers: Headers) {
  const parsed: Record<string, string> = {};
  headers.forEach((value, key) => {
    parsed[key] = value;
  });
  return parsed;
}

export function createEmptyResponse(): ResponseWithData<any> {
  return {
    data: undefined,
    body: null,
    bodyUsed: true,
    headers: {},
    ok: true,
    redirected: false,
    status: 200,
    statusText: "",
    type: "basic",
    url: "",
  };
}

export function getLoaderResult<T>(
  cachedResponse: CachedResponse<T>
): LoaderResult<T> {
  const { response, isLoading, requestOptions } = cachedResponse;
  if (!response)
    return {
      isLoading,
      data: undefined,
    };

  if (response.status >= 300) throw new ApiError(response, requestOptions);

  return {
    isLoading,
    data: response.data,
  };
}

export function getLoaderResultWithErrors<T>(
  cachedResponse: CachedResponse<T>
): LoaderResultWithErrors<T> {
  const { response, isLoading } = cachedResponse;

  if (!response || response.status >= 300) {
    return {
      isLoading,
      error: response?.data,
      data: undefined,
    };
  }

  return {
    isLoading,
    error: undefined,
    data: response.data,
  };
}
