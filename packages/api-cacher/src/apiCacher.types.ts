import { ApiUser } from "@loginapp/api-client";

export interface LoaderResult<RET> {
  isLoading: boolean;
  data: RET | undefined;
  error: any;
}

interface IndexOf<T> {
  [key: string]: T;
}

export interface ApiCache {
  users: IndexOf<ApiUser>;
}
