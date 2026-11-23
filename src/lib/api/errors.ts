import type { ApiErrorDetail } from "./types";

export class AppError extends Error {
  readonly code: string;
  readonly details?: ApiErrorDetail[];
  readonly expose: boolean;
  readonly status: number;

  constructor(options: {
    cause?: unknown;
    code: string;
    details?: ApiErrorDetail[];
    expose?: boolean;
    message: string;
    status: number;
  }) {
    super(options.message, { cause: options.cause });
    this.name = "AppError";
    this.code = options.code;
    this.details = options.details;
    this.expose = options.expose ?? options.status < 500;
    this.status = options.status;
  }
}

export class ValidationError extends AppError {
  constructor(message = "The request contains invalid input.", details?: ApiErrorDetail[]) {
    super({ code: "VALIDATION_ERROR", details, message, status: 422 });
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication is required.") {
    super({ code: "UNAUTHENTICATED", message, status: 401 });
  }
}

export class AuthorizationError extends AppError {
  constructor(message = "You do not have permission to perform this action.") {
    super({ code: "FORBIDDEN", message, status: 403 });
  }
}

export class NotFoundError extends AppError {
  constructor(message = "The requested resource was not found.") {
    super({ code: "NOT_FOUND", message, status: 404 });
  }
}
