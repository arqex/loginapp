import { apiRequester } from "./ApiRequester";

export abstract class ApiClientBase {
  abstract requester: typeof apiRequester;
}
