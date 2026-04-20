import { getAuthHeaders } from "@/lib/auth-header";
import type { JobPosition } from "./jobs.api";

// ── Types ─────────────────────────────────────────────────────────────────────

export type AdminApplicationAnswer = {
  form_field_id: number;
  form_field_label: string;
  value: string | number | boolean | string[];
};

export type AdminApplication = {
  id: number;
  position_id: number;
  position: JobPosition;
  status: { value: number; label: string };
  answers: AdminApplicationAnswer[];
  created_at: string;
  updated_at: string;
};

type ApiResponse<TData> = {
  status: boolean;
  message: string;
  data: TData;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

// ── Positions (admin) ─────────────────────────────────────────────────────────

export const getAdminPositions = async (): Promise<JobPosition[]> => {
  const headers = await getAuthHeaders();
  if (!headers) throw new Error("Unauthorized: no admin session cookie found.");

  const res = await fetch(`${apiUrl}/careers/admin/positions`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load positions (HTTP ${res.status}).`);
  }

  const payload: ApiResponse<JobPosition[]> = await res.json();
  return payload.data ?? [];
};

// ── Applications ──────────────────────────────────────────────────────────────

/**
 * GET /careers/admin/positions/{positionId}/applications
 */
export const getPositionApplications = async (
  positionId: number | string,
): Promise<AdminApplication[]> => {
  const headers = await getAuthHeaders();
  if (!headers) throw new Error("Unauthorized");

  const res = await fetch(
    `${apiUrl}/careers/admin/positions/${positionId}/applications`,
    { headers, cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(
      `Failed to load applications for position ${positionId} (HTTP ${res.status}).`,
    );
  }

  const payload: ApiResponse<AdminApplication[]> = await res.json();
  return payload.data ?? [];
};

// ── Dashboard stats ───────────────────────────────────────────────────────────

export type DashboardStats = {
  openPositions: number;
  totalApplications: number;
  shortlisted: number;
  interviewed: number;
  applications: AdminApplication[];
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const positions = await getAdminPositions();
  const openPositions = positions.filter(
    (p) => p.status.label.toLowerCase() === "active",
  ).length;

  const results = await Promise.allSettled(
    positions.map((p) => getPositionApplications(p.id)),
  );

  const applications = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : [],
  );

  const shortlisted = applications.filter(
    (a) => a.status.label === "Shortlisted",
  ).length;

  const interviewed = applications.filter(
    (a) => a.status.label === "Interview",
  ).length;

  return {
    openPositions,
    totalApplications: applications.length,
    shortlisted,
    interviewed,
    applications,
  };
};

/**
 * GET /careers/admin/applications/{id}
 */
export const getApplicationById = async (
  id: number | string,
): Promise<AdminApplication | null> => {
  const headers = await getAuthHeaders();
  if (!headers) return null;

  const res = await fetch(`${apiUrl}/careers/admin/applications/${id}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) return null;

  const payload: ApiResponse<AdminApplication> = await res.json();
  return payload.data ?? null;
};
