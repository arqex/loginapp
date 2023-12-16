import { ApiCacher } from "../ApiCacher";

export function getUser(apiCacher: ApiCacher, id: string) {
  return apiCacher.data.users[id];
}
