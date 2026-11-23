export const API_VERSION = "v1" as const;
export const API_BASE_PATH = `/api/${API_VERSION}` as const;

export const API_HEADERS = {
  version: "x-api-version",
  requestId: "x-request-id",
} as const;

export type ApiVersion = typeof API_VERSION;
