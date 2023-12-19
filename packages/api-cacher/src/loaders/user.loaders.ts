import { ApiCacher } from "../ApiCacher";
import { createLoaderResult } from "../apiCacher.utils";
import { loadUser } from "../methods/user.cache";

export function userLoader(apiCacher: ApiCacher, id: string) {
  return createLoaderResult(loadUser(apiCacher, id));
}
