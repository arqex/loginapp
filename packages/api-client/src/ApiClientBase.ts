import { apiRequester } from "./ApiRequester";

export abstract class ApiClientBase {
  requester: typeof apiRequester;
}
