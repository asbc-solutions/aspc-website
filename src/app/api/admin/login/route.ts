import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";

import { issueAdminToken } from "@/lib/admin-token";

function digestEqual(a: string, b: string): boolean {
  const da = createHash("sha256").update(a, "utf8").digest();
  const db = createHash("sha256").update(b, "utf8").digest();
  return da.length === db.length && timingSafeEqual(da, db);
}

export async function POST(request: Request) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!adminEmail || !adminPassword || !secret) {
    return NextResponse.json(
      { error: "Admin sign-in is not configured on the server." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    !("password" in body)
  ) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email =
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";
  const password =
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : "";

  const emailOk = digestEqual(email, adminEmail.trim().toLowerCase());
  const passOk = digestEqual(password, adminPassword);

  if (!emailOk || !passOk) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }

  const { token, exp } = issueAdminToken(email, secret);
  return NextResponse.json({ token, exp });
}
