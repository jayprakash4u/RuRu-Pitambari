import { AuthorizationError } from "@/lib/api";
import type { AuthSession, Permission, Role } from "./types";

export function hasRole(session: AuthSession, role: Role) {
  return session.user.roles.includes(role);
}

export function hasPermission(session: AuthSession, permission: Permission) {
  return session.user.permissions.includes(permission);
}

export function requireRole(session: AuthSession, role: Role) {
  if (!hasRole(session, role)) throw new AuthorizationError();
}

export function requirePermission(session: AuthSession, permission: Permission) {
  if (!hasPermission(session, permission)) throw new AuthorizationError();
}
