import { NextResponse } from "next/server";

import type { AppError } from "./errors";
import type { ApiFailure, ApiMeta, ApiSuccess } from "./types";
import { API_HEADERS, API_VERSION } from "./version";

function createMeta(requestId = crypto.randomUUID()): ApiMeta {
  return { requestId, timestamp: new Date().toISOString(), version: API_VERSION };
}

function responseHeaders(meta: ApiMeta, headers?: HeadersInit) {
  const result = new Headers(headers);
  result.set(API_HEADERS.requestId, meta.requestId);
  result.set(API_HEADERS.version, meta.version);
  return result;
}

export function apiSuccess<T>(data: T, init?: ResponseInit & { requestId?: string }) {
  const meta = createMeta(init?.requestId);
  const body: ApiSuccess<T> = { data, meta, success: true };
  return NextResponse.json(body, {
    ...init,
    headers: responseHeaders(meta, init?.headers),
    status: init?.status ?? 200,
  });
}

export function apiFailure(error: AppError, init?: ResponseInit & { requestId?: string }) {
  const meta = createMeta(init?.requestId);
  const body: ApiFailure = {
    error: {
      code: error.code,
      details: error.expose ? error.details : undefined,
      message: error.expose ? error.message : "An unexpected error occurred.",
    },
    meta,
    success: false,
  };
  return NextResponse.json(body, {
    ...init,
    headers: responseHeaders(meta, init?.headers),
    status: error.status,
  });
}
