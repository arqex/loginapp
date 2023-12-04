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
