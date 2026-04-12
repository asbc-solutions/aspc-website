import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminToken,
} from "@/lib/admin-token";

function getSecret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET;
}

export async function GET() {
  const secret = getSecret();
  if (!secret) {
    return NextResponse.json({ authenticated: false });
  }

  const cookieStore = await cookies();
  const raw = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (!raw) {
    return NextResponse.json({ authenticated: false });
  }

  const payload = verifyAdminToken(raw, secret);
  if (!payload) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true, email: payload.sub });
}

export async function POST(request: Request) {
  const secret = getSecret();
  if (!secret) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as { token?: unknown }).token !== "string"
  ) {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const token = (body as { token: string }).token;
  const payload = verifyAdminToken(token, secret);
  if (!payload) {
    return NextResponse.json({ error: "Invalid token." }, { status: 400 });
  }

  const maxAge = Math.max(1, payload.exp - Math.floor(Date.now() / 1000));
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return NextResponse.json({ ok: true });
}
