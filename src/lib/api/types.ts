import type { ApiVersion } from "./version";

export type ApiMeta = {
  requestId: string;
  timestamp: string;
  version: ApiVersion;
};

export type ApiSuccess<T> = {
  data: T;
  meta: ApiMeta;
  success: true;
};

export type ApiErrorDetail = {
  path?: string;
  reason: string;
};

export type ApiFailure = {
  error: {
    code: string;
    details?: ApiErrorDetail[];
    message: string;
  };
  meta: ApiMeta;
  success: false;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
