import { createHmac, timingSafeEqual } from "node:crypto";

export const DEFAULT_ADMIN_TOKEN_TTL_SEC = 60 * 60 * 24 * 7;

/** HttpOnly cookie that stores the signed admin session token. */
export const ADMIN_SESSION_COOKIE_NAME = "asbc_admin_token";

export function issueAdminToken(
  email: string,
  secret: string,
  ttlSec = DEFAULT_ADMIN_TOKEN_TTL_SEC,
): { token: string; exp: number } {
  const exp = Math.floor(Date.now() / 1000) + ttlSec;
  const payload = Buffer.from(
    JSON.stringify({ sub: email, exp }),
    "utf8",
  ).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return { token: `${payload}.${sig}`, exp };
}

/** Use this in middleware / server code when you wire up protected routes. */
export function verifyAdminToken(
  token: string,
  secret: string,
): { sub: string; exp: number } | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payloadPart = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);
  const expected = createHmac("sha256", secret)
    .update(payloadPart)
    .digest("base64url");
  const a = Buffer.from(sigPart, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const raw = JSON.parse(
      Buffer.from(payloadPart, "base64url").toString("utf8"),
    ) as { sub?: unknown; exp?: unknown };
    if (typeof raw.sub !== "string" || typeof raw.exp !== "number")
      return null;
    if (raw.exp < Math.floor(Date.now() / 1000)) return null;
    return { sub: raw.sub, exp: raw.exp };
  } catch {
    return null;
  }
}
