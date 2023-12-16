interface LoaderInput<INP> {
  selector: (arg: INP) => any;
  load: (arg: INP) => Promise<any>;
  isValid?: (arg: INP) => boolean;
}

interface LoaderOutput<INP, RET> {
  isLoading: boolean;
  data: RET | undefined;
  error: any;
  retry: (arg: INP) => void;
  promise: Promise<any>;
}

type LoaderFunction<ARG, RET> = (input: ARG) => LoaderOutput<ARG, RET>;

export function Loader<INP, RET>(
  config: LoaderInput<INP>
): LoaderFunction<INP, RET> {
  const isValid = config.isValid || (() => true);
  const loadCache = new Map<string, LoaderOutput<INP, RET>>();

  function loadData(input: INP, cached: RET | void) {
    const key = JSON.stringify(input);
    let promise = config.load(input);
    loadCache.set(key, {
      isLoading: true,
      error: null,
      promise: promise,
      data: config.selector(input),
      retry: tryLoad,
    });

    promise
      .then(() => {
        loadCache.set(key, {
          isLoading: false,
          error: null,
          promise: promise,
          data: config.selector(input),
          retry: tryLoad,
        });
      })
      .catch((err) => {
        loadCache.set(key, {
          isLoading: false,
          error: err,
          promise: promise,
          data: undefined,
          retry: tryLoad,
        });
      });
  }

  function tryLoad(input: INP) {
    const key = JSON.stringify(input);
    let loaded = loadCache.get(key);
    const cached = config.selector(input);

    const isValidLoad =
      loaded &&
      (loaded.error ||
        loaded.isLoading ||
        (loaded.data === cached && isValid(input)));

    // Try to reuse the cached object
    if (loaded && isValidLoad) {
      return loaded;
    }

    // If the selector data has been updated, upate the cached data
    if (loaded && cached && isValid(input) && loaded.data !== cached) {
      loaded = {
        isLoading: false,
        error: null,
        data: cached,
        retry: tryLoad,
        promise: Promise.resolve(cached),
      };
      loadCache.set(key, loaded);
      return loaded;
    }

    // The data is not loaded, load it
    loadData(input);
    loaded = loadCache.get(key);

    if (!loaded) throw new Error("Load not cached");

    // return the loading data
    return loaded;
  }

  return tryLoad;
}
