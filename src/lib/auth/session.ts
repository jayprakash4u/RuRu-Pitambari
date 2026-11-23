import "server-only";

import { cookies } from "next/headers";

import { AuthenticationError } from "@/lib/api";
import { SESSION_COOKIE } from "./constants";
import type { AuthSession, SessionVerifier } from "./types";

export async function getSession(verifier: SessionVerifier): Promise<AuthSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifier.verify(token);
}

export async function requireSession(verifier: SessionVerifier) {
  const session = await getSession(verifier);
  if (!session || session.expiresAt <= new Date()) throw new AuthenticationError();
  return session;
}
