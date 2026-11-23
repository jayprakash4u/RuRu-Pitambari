import type { NextRequest } from "next/server";

import { AppError } from "./errors";
import { apiFailure } from "./response";

type ApiHandler<Context = unknown> = (
  request: NextRequest,
  context: Context,
) => Promise<Response> | Response;

export function withApiHandler<Context = unknown>(handler: ApiHandler<Context>) {
  return async (request: NextRequest, context: Context) => {
    const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();
    try {
      return await handler(request, context);
    } catch (error) {
      if (error instanceof AppError) return apiFailure(error, { requestId });

      // Replace with the production observability provider; never expose raw errors.
      console.error("Unhandled API error", { error, requestId });
      return apiFailure(
        new AppError({ code: "INTERNAL_ERROR", message: "Internal server error", status: 500 }),
        { requestId },
      );
    }
  };
}
