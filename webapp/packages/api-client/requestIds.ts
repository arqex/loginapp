import type {
  RequestMiddleware,
  RequestMiddlewareConfig,
} from "./apiClient.types";

// Utility functions to generate and manage request identifiers

// Generate a random 5-character alphanumeric ID
function generateId(): string {
  return Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Session ID - changes every time the browser gets refreshed
let sessionId: string | null = null;

function getSessionId(): string {
  if (!sessionId) {
    sessionId = generateId();
  }
  return sessionId;
}

// Browser ID - stored in localStorage, persists across sessions
const BROWSER_ID_KEY = "loginapp_browser_id";

function getBrowserId(): string {
  let browserId = localStorage.getItem(BROWSER_ID_KEY);
  if (!browserId) {
    browserId = generateId();
    localStorage.setItem(BROWSER_ID_KEY, browserId);
  }
  return browserId;
}

// Request ID - changes for every single request
function getRequestId(): string {
  return generateId();
}

/**
 * Generates the X-Request-Ids header value containing all three identifiers
 * Format: "R:XXXXX S:XXXXX B:XXXXX"
 */
export function generateRequestIdsHeader(): string {
  const requestId = getRequestId();
  const sessionId = getSessionId();
  const browserId = getBrowserId();

  return `R:${requestId} S:${sessionId} B:${browserId}`;
}

/**
 * Request middleware that adds the X-Request-Ids header to every request
 */
export const requestIdsMiddleware: RequestMiddleware = (
  requestConfig: RequestMiddlewareConfig
) => {
  const headers = requestConfig.options.headers || {};
  (headers as any)["X-Request-Ids"] = generateRequestIdsHeader();

  return {
    ...requestConfig,
    options: {
      ...requestConfig.options,
      headers,
    },
  };
};
