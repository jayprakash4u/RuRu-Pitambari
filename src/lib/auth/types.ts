export const ROLES = ["customer", "dealer", "staff", "admin"] as const;
export type Role = (typeof ROLES)[number];

export const PERMISSIONS = [
  "catalog:read",
  "catalog:write",
  "dealer:read",
  "dealer:write",
  "user:read",
  "user:write",
] as const;
export type Permission = (typeof PERMISSIONS)[number];

export type SessionUser = {
  id: string;
  permissions: Permission[];
  roles: Role[];
};

export type AuthSession = {
  expiresAt: Date;
  user: SessionUser;
};

export interface SessionVerifier {
  verify(token: string): Promise<AuthSession | null>;
}
