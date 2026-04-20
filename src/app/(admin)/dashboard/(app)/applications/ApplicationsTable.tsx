"use client";

import { ChevronDown, Eye, Loader2, Search } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";
import type { AdminApplication } from "@/app/api/admin.api";
import { updateApplicationStatus } from "./actions";

// ── Status config ─────────────────────────────────────────────────────────────

export const APPLICATION_STATUS_OPTIONS = [
  { label: "Pending", value: 1 },
  { label: "Reviewed", value: 2 },
  { label: "Interview", value: 3 },
  { label: "Shortlisted", value: 4 },
  { label: "Rejected", value: 5 },
];

const STATUS_STYLES: Record<string, { bg: string; dot: string; text: string }> = {
  Pending:     { bg: "#f0fdfa", dot: "#14b8a6", text: "#0f766e" },
  Reviewed:    { bg: "#eff6ff", dot: "#3b82f6", text: "#1d4ed8" },
  Interview:   { bg: "#ede9fe", dot: "#a855f7", text: "#7e22ce" },
  Shortlisted: { bg: "#dcfce7", dot: "#22c55e", text: "#15803d" },
  Rejected:    { bg: "#fee2e2", dot: "#ef4444", text: "#dc2626" },
};

const defaultStyle = { bg: "#f1f5f9", dot: "#94a3b8", text: "#475569" };

// ── Helpers ───────────────────────────────────────────────────────────────────

const AVATAR_COLORS = ["#1e3fb0", "#7c3aed", "#15803d", "#b45309", "#0891b2", "#be123c"];

const avatarColor = (name: string) =>
  AVATAR_COLORS[(name.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const getAnswer = (app: AdminApplication, label: string): string => {
  const a = app.answers.find((x) => x.form_field_label === label);
  if (!a) return "";
  return Array.isArray(a.value) ? a.value.join(", ") : String(a.value);
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

// ── Row ───────────────────────────────────────────────────────────────────────

function ApplicationRow({
  app,
  onViewDetail,
}: {
  app: AdminApplication;
  onViewDetail: (app: AdminApplication) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(app.status);

  const name = getAnswer(app, "Full Name") || "—";
  const color = avatarColor(name);
  const abbr = initials(name);
  const style = STATUS_STYLES[optimisticStatus.label] ?? defaultStyle;

  const handleStatusChange = (value: number, label: string) => {
    startTransition(async () => {
      setOptimisticStatus({ value, label });
      await updateApplicationStatus(app.id, value);
    });
  };

  return (
    <tr className="border-b border-[rgba(0,0,0,0.04)] last:border-0 hover:bg-[#fafbff]">
      {/* Applicant */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {abbr}
          </div>
          <div>
            <p className="font-semibold text-[#0d1240]">{name}</p>
            <p className="text-xs text-[#9ca3af]">
              {getAnswer(app, "Email Address") || "—"}
            </p>
          </div>
        </div>
      </td>

      {/* Position */}
      <td className="px-6 py-4 text-[#374151]">{app.position?.title ?? "—"}</td>

      {/* Work type */}
      <td className="px-6 py-4">
        <span className="inline-block rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-medium text-[#374151]">
          {app.position?.work_type?.label ?? "—"}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="relative inline-flex items-center gap-1.5">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: style.bg, color: style.text }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: style.dot }}
            />
            {optimisticStatus.label}
          </span>
          {isPending && <Loader2 size={12} className="animate-spin text-[#9ca3af]" />}
        </div>
      </td>

      {/* Applied */}
      <td className="px-6 py-4 text-[#6b7280]">{formatDate(app.created_at)}</td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewDetail(app)}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] text-[#9ca3af] hover:border-[#1e3fb0] hover:text-[#1e3fb0]"
            aria-label="View application"
          >
            <Eye size={13} />
          </button>

          <select
            disabled={isPending}
            value={optimisticStatus.value}
            onChange={(e) => {
              const val = Number(e.target.value);
              const opt = APPLICATION_STATUS_OPTIONS.find((o) => o.value === val);
              if (opt) handleStatusChange(opt.value, opt.label);
            }}
            className="rounded-md border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-1 pl-2 pr-6 text-xs text-[#374151] outline-none focus:border-[#1e3fb0] disabled:opacity-50"
            aria-label="Change status"
          >
            {APPLICATION_STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </td>
    </tr>
  );
}

// ── Detail drawer ─────────────────────────────────────────────────────────────

function ApplicationDetail({
  app,
  onClose,
}: {
  app: AdminApplication;
  onClose: () => void;
}) {
  const name = getAnswer(app, "Full Name") || "—";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] bg-white px-6 py-4">
          <div>
            <h3 className="text-base font-bold text-[#0d1240]">{name}</h3>
            <p className="text-xs text-[#6b7280]">{app.position?.title ?? "—"}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f3f4f6]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="divide-y divide-[rgba(0,0,0,0.06)] px-6">
          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 py-5 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">Position</p>
              <p className="mt-1 text-[#374151]">{app.position?.title ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">Department</p>
              <p className="mt-1 text-[#374151]">{app.position?.department ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">Work Type</p>
              <p className="mt-1 text-[#374151]">{app.position?.work_type?.label ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">Applied</p>
              <p className="mt-1 text-[#374151]">{formatDate(app.created_at)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">Status</p>
              <p className="mt-1 text-[#374151]">{app.status.label}</p>
            </div>
          </div>

          {/* Answers */}
          <div className="py-5">
            <h4 className="mb-4 text-sm font-semibold text-[#0d1240]">Application Answers</h4>
            <div className="flex flex-col gap-4">
              {app.answers.map((a) => (
                <div key={a.form_field_id}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                    {a.form_field_label}
                  </p>
                  <p className="mt-1 text-sm text-[#374151]">
                    {Array.isArray(a.value) ? a.value.join(", ") : String(a.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────

export function ApplicationsTable({ applications }: { applications: AdminApplication[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [positionFilter, setPositionFilter] = useState("All Positions");
  const [detail, setDetail] = useState<AdminApplication | null>(null);

  const allPositions = [
    ...new Set(applications.map((a) => a.position?.title).filter(Boolean)),
  ] as string[];

  const filtered = applications.filter((a) => {
    const name = getAnswer(a, "Full Name");
    const posTitle = a.position?.title ?? "";
    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      posTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All Status" || a.status.label === statusFilter;
    const matchPos =
      positionFilter === "All Positions" || posTitle === positionFilter;
    return matchSearch && matchStatus && matchPos;
  });

  return (
    <>
      <div className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white shadow-sm">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[rgba(0,0,0,0.06)] p-4">
          <div className="relative min-w-48 flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
            />
            <input
              type="text"
              placeholder="Search applicants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-9 pr-4 text-sm text-[#374151] placeholder-[#9ca3af] outline-none focus:border-[#1e3fb0] focus:ring-1 focus:ring-[#1e3fb0]"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-3 pr-8 text-sm text-[#374151] outline-none focus:border-[#1e3fb0]"
            >
              <option>All Status</option>
              {APPLICATION_STATUS_OPTIONS.map((o) => (
                <option key={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="appearance-none rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-3 pr-8 text-sm text-[#374151] outline-none focus:border-[#1e3fb0]"
            >
              <option>All Positions</option>
              {allPositions.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(0,0,0,0.06)] bg-[#f9fafb]">
                {["Applicant", "Position", "Work Type", "Status", "Applied", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]"
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#9ca3af]">
                    No applications match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <ApplicationRow
                    key={app.id}
                    app={app}
                    onViewDetail={setDetail}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="border-t border-[rgba(0,0,0,0.06)] px-6 py-3">
            <p className="text-xs text-[#9ca3af]">
              Showing {filtered.length} of {applications.length} applications
            </p>
          </div>
        )}
      </div>

      {detail && (
        <ApplicationDetail app={detail} onClose={() => setDetail(null)} />
      )}
    </>
  );
}
