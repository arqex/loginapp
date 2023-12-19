import { ResponseWithData } from "./api.types";

export class ApiError extends Error {
  response: ResponseWithData<any>;
  constructor(res: ResponseWithData<any>) {
    super(`API Error ${res.url} ${res.status}`);
    this.response = res;
  }
}
