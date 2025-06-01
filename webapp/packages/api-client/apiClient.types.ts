export interface ResponseWithData<T> {
  data: T;
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
  headers: { [key: string]: string };
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

export interface ApiAccount {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiUser {
  id: string;
  name: string;
  email: string;
  picURL: string;
}

export interface ApiClientConfig {
  apiURL?: string;
  authToken?: string;
  headers?: { [headerName: string]: string };
  responseMiddleware?: ResponseMiddleware[];
  requestMiddleware?: RequestMiddleware[];
  useCache?: boolean;
  initialCache?: RequestCache;
  credentials?: RequestCredentials;
}

export type AuthType = "basic" | "bearer";

export type ResponseMiddleware = (
  res: ResponseWithData<any>,
  requestOptions: RequestInit
) => ResponseWithData<any>;

export type RequestMiddlewareConfig = {
  url: string;
  options: RequestInit;
};

export type RequestMiddleware = (
  requestConfig: RequestMiddlewareConfig
) => RequestMiddlewareConfig;

export interface HeaderDefinition {
  [headerName: string]: string;
}

export type RequestCache = { [key: string]: CachedRequest<any> };
export interface ApiRequesterConfig {
  apiUrl?: string;
  headers?: HeaderDefinition;
  requestMiddleware?: RequestMiddleware[];
  responseMiddleware?: ResponseMiddleware[];
  onLoad?: () => void;
  initialCache?: RequestCache;
  credentials?: RequestCredentials;
}

export interface CachedRequest<T> {
  response?: ResponseWithData<T>;
  requestedAt: number;
  needsRefresh: boolean;
  promise: Promise<ResponseWithData<T>>;
  isLoading: boolean;
}

export interface CachedResponse<T> {
  isLoading: boolean;
  response?: ResponseWithData<T>;
  promise: Promise<ResponseWithData<T>>;
  requestOptions: RequestInit;
}

export interface LoaderResult<RET> {
  isLoading: boolean;
  data: RET | undefined;
}

export interface LoaderResultWithErrors<RET> {
  isLoading: boolean;
  data: RET | undefined;
  error: any;
}
