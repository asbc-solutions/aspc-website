"use server";

import { getAuthHeaders } from "@/lib/auth-header";

/**
 * PATCH /careers/admin/applications/{id}/status
 * Update the status of a single application.
 */
export async function updateApplicationStatus(
  id: number,
  statusValue: number,
): Promise<{ ok: boolean; message: string }> {
  const headers = await getAuthHeaders();
  if (!headers) return { ok: false, message: "Unauthorized" };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/careers/admin/applications/${id}/status`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: statusValue }),
      },
    );

    const text = await res.text().catch(() => "");
    let message = res.ok ? "Status updated." : "Failed to update status.";
    try {
      const payload = text ? (JSON.parse(text) as Record<string, unknown>) : null;
      if (payload && typeof payload.message === "string") message = payload.message;
    } catch {
      // non-JSON body
    }

    return { ok: res.ok, message };
  } catch {
    return { ok: false, message: "Could not reach the server." };
  }
}
