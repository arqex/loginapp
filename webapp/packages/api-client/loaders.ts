import type {
  CachedResponse,
  LoaderResult,
  LoaderResultWithErrors,
} from "./apiClient.types";
import { getLoaderResult } from "./handleResponse";

export type LoaderFunction<Args extends any[] = any[], RES = any> = (
  ...args: Args
) => LoaderResult<RES>;

export function createLoader<RES, Args extends any[]>(
  requesterWithCaching: (...args: Args) => CachedResponse<RES>
): LoaderFunction<Args, RES> {
  const loaderName = requesterWithCaching.name
    ? requesterWithCaching.name + "Loader"
    : "dataLoader";
  const loader = Object.defineProperty(
    function (...args: Args) {
      const response = requesterWithCaching(...args);
      return getLoaderResult(response);
    },
    "name",
    { value: loaderName }
  );

  return loader as LoaderFunction<Args, RES>;
}

export type LoaderFunctionWithErrors<Args extends any[] = any[], RES = any> = (
  ...args: Args
) => LoaderResultWithErrors<RES>;

export function withErrors<Args extends any[] = any[], RES = any>(
  loader: LoaderFunction<Args, RES>
): LoaderFunctionWithErrors<Args, RES> {
  const loaderWithErrors: LoaderFunctionWithErrors<Args, RES> = (
    ...args: Args
  ) => {
    try {
      return loader(...args) as LoaderResultWithErrors<RES>;
    } catch (error) {
      return { isLoading: false, error } as LoaderResultWithErrors<RES>;
    }
  };

  Object.defineProperty(loaderWithErrors, "name", {
    value: (loader.name || "anonymous") + "LoaderWithErrors",
  });

  return loaderWithErrors;
}
