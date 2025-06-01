import { ResponseWithData } from "./apiClient.types";

export class ApiError extends Error {
  response: ResponseWithData<any>;
  request: RequestInit;

  constructor(res: ResponseWithData<any>, requestOptions: RequestInit) {
    super(buildErrorMessage(res, requestOptions));
    this.response = res;
    this.request = requestOptions;
  }
}

function buildErrorMessage(
  res: ResponseWithData<any>,
  requestOptions: RequestInit
) {
  const { body, method } = requestOptions;

  const payload = body ? `\nPayload: ${body}` : "";
  let responseBody = "";
  try {
    responseBody = JSON.stringify(res.data || {}, null, 2);
  } catch (e) {
    responseBody: "JSON parse error";
  }
  // @ts-ignore headers parsing
  return `YCBM request error (${requestOptions.headers?.["X-Request-Id"]}):
${res.status} ${method} ${res.url}${payload}
Response: ${responseBody}`;
}
