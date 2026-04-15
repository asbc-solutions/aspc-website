import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-token";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as { email?: unknown }).email !== "string" ||
    typeof (body as { password?: unknown }).password !== "string"
  ) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: "API is not configured." }, { status: 503 });
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the server. Check your connection." },
      { status: 503 },
    );
  }

  const json: unknown = await backendRes.json().catch(() => null);

  if (!backendRes.ok) {
    const err =
      json && typeof json === "object" && typeof (json as Record<string, unknown>).message === "string"
        ? (json as { message: string }).message
        : "Invalid email or password.";
    return NextResponse.json({ error: err }, { status: backendRes.status });
  }

  const nested =
    json &&
    typeof json === "object" &&
    "data" in json &&
    typeof (json as { data: unknown }).data === "object" &&
    (json as { data: unknown }).data !== null
      ? ((json as { data: Record<string, unknown> }).data)
      : null;

  const token = typeof nested?.token === "string" ? nested.token : null;

  if (!token) {
    return NextResponse.json(
      { error: "Invalid response from server." },
      { status: 502 },
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ ok: true });
}
