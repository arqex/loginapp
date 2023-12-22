export interface ResponseWithData<T> {
  data: T;
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
  url: string;
}

export interface LoginResponse {
  authenticatedId: string;
}

export interface LoginResponseWithToken {
  authenticatedId: string;
  token: string;
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  picURL: string;
}

export interface ApiClientConfig {
  apiURL: string;
  authToken?: string;
  headers?: { [headerName: string]: string };
  responseMiddleware?: ResponseMiddleware[];
}

export type ResponseMiddleware = (res: Response) => Response;

export interface HeaderDefinition {
  [headerName: string]: string;
}

export interface CachedRequest<T> {
  response?: ResponseWithData<T>;
  requestedAt: number;
  needsRefresh: boolean;
  promise: Promise<ResponseWithData<T>>;
}

export interface CachedResponse<T> {
  isLoading: boolean;
  response?: ResponseWithData<T>;
  promise: Promise<ResponseWithData<T>>;
}
