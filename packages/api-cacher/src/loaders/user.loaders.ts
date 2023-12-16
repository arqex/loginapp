import { ApiCacher } from "../ApiCacher";
import { loadUser } from "../methods/user.cache";
import { CachedResponse, ResponseWithData } from "@loginapp/api-client";
import { LoaderResult } from "../apiCacher.types";

export function userLoader(apiCacher: ApiCacher, id: string) {
  return handleCachedResponse(apiCacher, loadUser(apiCacher, id));
}

function handleCachedResponse<T>(
  apiCache: ApiCacher,
  CachedResponse: CachedResponse<T>
) {
  const { isLoading, response, promise } = CachedResponse;
  isLoading && promise.then(() => apiCache.emitChange());
  return createLoaderResult(isLoading, response);
}

function createLoaderResult<T>(
  isLoading: boolean,
  response: ResponseWithData<T> | undefined
): LoaderResult<T> {
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
