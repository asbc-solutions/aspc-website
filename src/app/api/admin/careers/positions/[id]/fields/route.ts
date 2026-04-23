import { getAuthHeaders } from "@/lib/auth-header";
import { NextResponse } from "next/server";

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

type Context = { params: Promise<{ id: string }> };

export async function GET(_: Request, context: Context) {
  const { id } = await context.params;
  const apiUrl = getApiUrl();
  if (!apiUrl)
    return NextResponse.json({ message: "API not configured." }, { status: 503 });

  const headers = await getAuthHeaders();
  if (!headers)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(
      `${apiUrl}/careers/admin/positions/${id}/fields`,
      { headers, cache: "no-store" },
    );
    const payload: unknown = await res.json().catch(() => null);
    return NextResponse.json(
      payload ?? { message: "Invalid upstream response." },
      { status: res.status },
    );
  } catch {
    return NextResponse.json(
      { message: "Could not reach the backend server." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request, context: Context) {
  const { id } = await context.params;
  const apiUrl = getApiUrl();
  if (!apiUrl)
    return NextResponse.json({ message: "API not configured." }, { status: 503 });

  const headers = await getAuthHeaders();
  if (!headers)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${apiUrl}/careers/admin/positions/${id}/fields`,
      { method: "POST", headers, body: JSON.stringify(body) },
    );
    const text = await res.text().catch(() => "");
    let payload: unknown = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch { /* non-JSON body */ }

    if (payload === null) {
      const message =
        text.trim() || (res.ok ? "Field created." : "Request failed.");
      return NextResponse.json({ message }, { status: res.ok ? 201 : res.status });
    }
    return NextResponse.json(payload, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Could not reach the backend server." },
      { status: 503 },
    );
  }
}
