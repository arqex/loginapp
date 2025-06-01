// I have wrapped the extendedFetch function in a container
// to be able of override it and mock some requests in the app
// While we don't have the API ready. Unwrapped it when we are
// working with the real API
const container = {
  extendedFecth: async function extendedFecth(
    input: RequestInfo | URL,
    init: RequestInit,
    isRetry = false
  ) {
    try {
      const res = await fetch(input, init);
      return res;
    } catch (error) {
      if (!isRetry && init.method === "GET") {
        return await extendedFecth(input, init, true);
      }

      // @ts-ignore fill the error attributes as if it was an ApiError
      error.response = { error: "Cannot fetch data" };
      // @ts-ignore
      error.request = {
        ...init,
        url: input,
      };
      throw error;
    }
  },
};

export default container;
