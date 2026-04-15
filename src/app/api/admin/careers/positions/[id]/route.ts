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

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: Context) {
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

  const { id } = await context.params;

  try {
    const res = await fetch(`${apiUrl}/careers/admin/positions/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
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

export async function DELETE(_: Request, context: Context) {
  const apiUrl = getApiUrl();
  if (!apiUrl) {
    return NextResponse.json({ message: "API is not configured." }, { status: 503 });
  }

  const headers = await getAuthHeaders();
  if (!headers) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const res = await fetch(`${apiUrl}/careers/admin/positions/${id}`, {
      method: "DELETE",
      headers,
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
