import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-token";

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export async function GET() {
  const apiUrl = getApiUrl();
  if (!apiUrl) {
    return NextResponse.json({ message: "API is not configured." }, { status: 503 });
  }

  const headers = await getAuthHeaders();
  if (!headers) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${apiUrl}/careers/admin/positions`, {
      method: "GET",
      headers,
      cache: "no-store",
    });
    const payload: unknown = await res.json().catch(() => null);
    return NextResponse.json(payload ?? { message: "Invalid upstream response." }, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Could not reach the backend server." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  const apiUrl = getApiUrl();
  if (!apiUrl) {
    return NextResponse.json({ message: "API is not configured." }, { status: 503 });
  }

  const headers = await getAuthHeaders();
  if (!headers) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  try {
    const res = await fetch(`${apiUrl}/careers/admin/positions`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const text = await res.text().catch(() => "");
    let payload: unknown = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      // non-JSON body — surface the raw text as the error message
    }

    if (payload === null) {
      const message = text.trim() || (res.ok ? "Position created." : "Request failed.");
      return NextResponse.json({ message }, { status: res.ok ? 200 : res.status });
    }

    return NextResponse.json(payload, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Could not reach the backend server." },
      { status: 503 },
    );
  }
}
