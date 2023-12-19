import { CachedResponse, ResponseWithData } from "@loginapp/api-client";
import { ApiCacher } from "./ApiCacher";
import { LoaderResult } from "./apiCacher.types";

export function emitOnLoad(
  apiCacher: ApiCacher,
  cachedResponse: CachedResponse<any>
) {
  const { isLoading, promise } = cachedResponse;
  isLoading &&
    promise.then(() => {
      console.log("Emiting change after caching");
      apiCacher.emitChange();
    });
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

export function createLoaderResult<T>(
  cachedResponse: CachedResponse<T>
): LoaderResult<T> {
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
