"use client";

import {
  ChevronDown,
  Eye,
  RefreshCw,
  Search,
} from "lucide-react";
import { useState } from "react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

// ── types ────────────────────────────────────────────────────────────────────

type AppStatus = "Shortlisted" | "Interview" | "Reviewed" | "New";
type WorkType = "Hybrid" | "Remote" | "On-site";

type Application = {
  id: number;
  initials: string;
  avatarColor: string;
  name: string;
  workType: WorkType;
  position: string;
  status: AppStatus;
  applied: string;
  score: number;
};

// ── data ─────────────────────────────────────────────────────────────────────

const statusStyles: Record<AppStatus, { bg: string; dot: string; text: string }> = {
  Shortlisted: { bg: "#dcfce7", dot: "#22c55e", text: "#15803d" },
  Interview:   { bg: "#ede9fe", dot: "#a855f7", text: "#7e22ce" },
  Reviewed:    { bg: "#eff6ff", dot: "#3b82f6", text: "#1d4ed8" },
  New:         { bg: "#f0fdfa", dot: "#14b8a6", text: "#0f766e" },
};

const applications: Application[] = [
  { id:  1, initials: "AH", avatarColor: "#1e3fb0", name: "Ahmed Hassan",   workType: "Hybrid",  position: "Senior Software Engineer", status: "Shortlisted", applied: "7 Apr 2026",  score: 83 },
  { id:  2, initials: "SM", avatarColor: "#7c3aed", name: "Sara Mahmoud",   workType: "Remote",  position: "Product Designer",         status: "Interview",   applied: "6 Apr 2026",  score: 87 },
  { id:  3, initials: "OK", avatarColor: "#15803d", name: "Omar Khalil",    workType: "Hybrid",  position: "DevOps Engineer",          status: "Reviewed",    applied: "5 Apr 2026",  score: 76 },
  { id:  4, initials: "NF", avatarColor: "#b45309", name: "Nadia Farouk",   workType: "Hybrid",  position: "Senior Software Engineer", status: "New",         applied: "5 Apr 2026",  score: 77 },
  { id:  5, initials: "KS", avatarColor: "#1e3fb0", name: "Karim Saleh",    workType: "On-site", position: "Project Manager",          status: "Shortlisted", applied: "4 Apr 2026",  score: 82 },
  { id:  6, initials: "LA", avatarColor: "#7c3aed", name: "Lina Adel",      workType: "Remote",  position: "Product Designer",         status: "Shortlisted", applied: "3 Apr 2026",  score: 84 },
  { id:  7, initials: "TI", avatarColor: "#1e3fb0", name: "Tamer Ibrahim",  workType: "Hybrid",  position: "DevOps Engineer",          status: "Interview",   applied: "2 Apr 2026",  score: 79 },
  { id:  8, initials: "YG", avatarColor: "#15803d", name: "Yasmine Gamal",  workType: "Remote",  position: "Business Analyst",         status: "Reviewed",    applied: "1 Apr 2026",  score: 74 },
  { id:  9, initials: "RM", avatarColor: "#0891b2", name: "Rami Mansour",   workType: "Hybrid",  position: "Senior Software Engineer", status: "New",         applied: "30 Mar 2026", score: 68 },
  { id: 10, initials: "DN", avatarColor: "#7c3aed", name: "Dina Nasser",    workType: "On-site", position: "Project Manager",          status: "Reviewed",    applied: "28 Mar 2026", score: 71 },
  { id: 11, initials: "HZ", avatarColor: "#b45309", name: "Hana Zaki",      workType: "Remote",  position: "Business Analyst",         status: "Shortlisted", applied: "25 Mar 2026", score: 80 },
  { id: 12, initials: "MS", avatarColor: "#15803d", name: "Mostafa Sherif", workType: "Hybrid",  position: "DevOps Engineer",          status: "New",         applied: "20 Mar 2026", score: 65 },
];

const allPositions = [...new Set(applications.map((a) => a.position))];

// ── page ─────────────────────────────────────────────────────────────────────

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [positionFilter, setPositionFilter] = useState("All Positions");

  const filtered = applications.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.position.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || a.status === statusFilter;
    const matchPos = positionFilter === "All Positions" || a.position === positionFilter;
    return matchSearch && matchStatus && matchPos;
  });

  return (
    <div className="flex flex-1 flex-col bg-[#f5f7ff]">
      <AdminPageHeader title="All Applications" />

      <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        {/* Section heading */}
        <div>
          <h2 className="text-lg font-bold text-[#0d1240]">All Applications</h2>
          <p className="text-sm text-[#6b7280]">{applications.length} submissions</p>
        </div>

        {/* Filter + table card */}
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
                {(["Shortlisted", "Interview", "Reviewed", "New"] as AppStatus[]).map((s) => (
                  <option key={s}>{s}</option>
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
            <table className="min-w-[860px] w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.06)] bg-[#f9fafb]">
                  {["Applicant", "Position", "Status", "Work Type", "Applied", "Score"].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]"
                      >
                        {col}
                      </th>
                    )
                  )}
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-sm text-[#9ca3af]"
                    >
                      No applications match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map(
                    ({ id, initials, avatarColor, name, workType, position, status, applied, score }) => {
                      const s = statusStyles[status];
                      return (
                        <tr
                          key={id}
                          className="border-b border-[rgba(0,0,0,0.04)] last:border-0 hover:bg-[#fafbff]"
                        >
                          {/* Applicant */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                                style={{ backgroundColor: avatarColor }}
                              >
                                {initials}
                              </div>
                              <div>
                                <p className="font-semibold text-[#0d1240]">{name}</p>
                                <p className="text-xs text-[#9ca3af]">{workType}</p>
                              </div>
                            </div>
                          </td>

                          {/* Position */}
                          <td className="px-6 py-4 text-[#374151]">{position}</td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                              style={{ backgroundColor: s.bg, color: s.text }}
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: s.dot }}
                              />
                              {status}
                            </span>
                          </td>

                          {/* Work type */}
                          <td className="px-6 py-4">
                            <span className="inline-block rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-medium text-[#374151]">
                              {workType}
                            </span>
                          </td>

                          {/* Applied */}
                          <td className="px-6 py-4 text-[#6b7280]">{applied}</td>

                          {/* Score */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-1.5 w-24 rounded-full bg-[#f1f5f9]">
                                <div
                                  className="h-1.5 rounded-full"
                                  style={{ width: `${score}%`, backgroundColor: "#1e3fb0" }}
                                />
                              </div>
                              <span className="min-w-10 text-xs font-semibold text-[#0d1240]">
                                {score}%
                              </span>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-[#9ca3af]">
                              <button
                                type="button"
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] hover:border-[#1e3fb0] hover:text-[#1e3fb0]"
                                aria-label="View applicant"
                              >
                                <Eye size={13} />
                              </button>
                              <button
                                type="button"
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] hover:border-[#1e3fb0] hover:text-[#1e3fb0]"
                                aria-label="Update status"
                              >
                                <RefreshCw size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          {filtered.length > 0 && (
            <div className="border-t border-[rgba(0,0,0,0.06)] px-6 py-3">
              <p className="text-xs text-[#9ca3af]">
                Showing {filtered.length} of {applications.length} applications
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
