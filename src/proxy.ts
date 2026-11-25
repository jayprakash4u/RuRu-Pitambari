import { NextResponse, type NextRequest } from "next/server";

import { AuthenticationError, apiFailure } from "@/lib/api";
import { SESSION_COOKIE } from "@/lib/auth/constants";

const API_PROTECTED_PREFIX = "/api/v1/private";
const PAGE_PROTECTED_PREFIXES = ["/account", "/checkout", "/orders"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSessionCookie = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (hasSessionCookie) return NextResponse.next();

  if (pathname.startsWith(API_PROTECTED_PREFIX)) {
    return apiFailure(new AuthenticationError(), {
      requestId: request.headers.get("x-request-id") ?? undefined,
    });
  }

  if (PAGE_PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("returnTo", `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/orders/:path*", "/api/v1/private/:path*"],
};
