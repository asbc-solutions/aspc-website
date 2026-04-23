import { getAuthHeaders } from "@/lib/auth-header";
import { NextResponse } from "next/server";

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

type Context = { params: Promise<{ id: string; fieldId: string }> };

export async function GET(_: Request, context: Context) {
  const { id, fieldId } = await context.params;
  const apiUrl = getApiUrl();
  if (!apiUrl)
    return NextResponse.json({ message: "API not configured." }, { status: 503 });

  const headers = await getAuthHeaders();
  if (!headers)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(
      `${apiUrl}/careers/admin/positions/${id}/fields/${fieldId}`,
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

export async function PUT(request: Request, context: Context) {
  const { id, fieldId } = await context.params;
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
      `${apiUrl}/careers/admin/positions/${id}/fields/${fieldId}`,
      { method: "PUT", headers, body: JSON.stringify(body) },
    );
    const text = await res.text().catch(() => "");
    let payload: unknown = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch { /* non-JSON body */ }

    if (payload === null) {
      const message =
        text.trim() || (res.ok ? "Field updated." : "Request failed.");
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

export async function DELETE(_: Request, context: Context) {
  const { id, fieldId } = await context.params;
  const apiUrl = getApiUrl();
  if (!apiUrl)
    return NextResponse.json({ message: "API not configured." }, { status: 503 });

  const headers = await getAuthHeaders();
  if (!headers)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(
      `${apiUrl}/careers/admin/positions/${id}/fields/${fieldId}`,
      { method: "DELETE", headers },
    );

    if (res.status === 204 || res.status === 200) {
      const text = await res.text().catch(() => "");
      let payload: unknown = null;
      try {
        payload = text ? JSON.parse(text) : null;
      } catch { /* no-op */ }
      return NextResponse.json(
        payload ?? { message: "Field deleted successfully." },
        { status: 200 },
      );
    }

    const text = await res.text().catch(() => "");
    let payload: unknown = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch { /* non-JSON body */ }
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof (payload as Record<string, unknown>).message === "string"
        ? (payload as Record<string, unknown>).message
        : text.trim() || "Failed to delete field.";
    return NextResponse.json({ message }, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Could not reach the backend server." },
      { status: 503 },
    );
  }
}
