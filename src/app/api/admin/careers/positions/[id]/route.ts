import { getAuthHeaders } from "@/lib/auth-header";
import { NextResponse } from "next/server";

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: Context) {
  const apiUrl = getApiUrl();
  if (!apiUrl) {
    return NextResponse.json(
      { message: "API is not configured." },
      { status: 503 },
    );
  }

  const headers = await getAuthHeaders();
  if (!headers) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const { id } = await context.params;

  try {
    const res = await fetch(`${apiUrl}/careers/admin/positions/${id}`, {
      method: "PUT",
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
      const message =
        text.trim() ||
        (res.ok ? "Position updated successfully." : "Request failed.");
      return NextResponse.json(
        { message },
        { status: res.ok ? 200 : res.status },
      );
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
  const apiUrl = getApiUrl();
  if (!apiUrl) {
    return NextResponse.json(
      { message: "API is not configured." },
      { status: 503 },
    );
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

    // 204 No Content is a valid success — return 200 with a body so the client can parse it
    if (res.status === 204 || res.status === 200) {
      const text = await res.text().catch(() => "");
      let payload: unknown = null;
      try {
        payload = text ? JSON.parse(text) : null;
      } catch {
        // no-op
      }
      return NextResponse.json(
        payload ?? { message: "Position deleted successfully." },
        { status: 200 },
      );
    }

    const text = await res.text().catch(() => "");
    let payload: unknown = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      // non-JSON error body
    }
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? (payload as Record<string, unknown>).message
        : text.trim() || "Failed to delete position.";
    return NextResponse.json({ message }, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Could not reach the backend server." },
      { status: 503 },
    );
  }
}
