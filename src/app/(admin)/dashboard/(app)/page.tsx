"use client";

import { Briefcase, Clock, FileText, UserCheck } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

// ── data ────────────────────────────────────────────────────────────────────

const stats = [
  {
    label: "Open Positions",
    value: 4,
    badge: "+2 this month",
    badgeColor: "#dbeafe",
    badgeText: "#1d4ed8",
    icon: Briefcase,
    iconBg: "#eff6ff",
    iconColor: "#3b82f6",
    accent: "#3b82f6",
  },
  {
    label: "Total Applications",
    value: 12,
    badge: "+7 this week",
    badgeColor: "#dbeafe",
    badgeText: "#1d4ed8",
    icon: FileText,
    iconBg: "#eff6ff",
    iconColor: "#3b82f6",
    accent: "#3b82f6",
  },
  {
    label: "Shortlisted",
    value: 14,
    badge: "6 new",
    badgeColor: "#dcfce7",
    badgeText: "#15803d",
    icon: UserCheck,
    iconBg: "#f0fdf4",
    iconColor: "#22c55e",
    accent: "#22c55e",
  },
  {
    label: "Interviews Scheduled",
    value: 3,
    badge: "-1 this week",
    badgeColor: "#fee2e2",
    badgeText: "#b91c1c",
    icon: Clock,
    iconBg: "#fff7ed",
    iconColor: "#f97316",
    accent: "#f59e0b",
  },
];

const barData = [
  { week: "Week 1", applications: 8 },
  { week: "Week 2", applications: 15 },
  { week: "Week 3", applications: 18 },
  { week: "Week 4", applications: 13 },
];

const chartConfig: ChartConfig = {
  applications: { label: "Applications", color: "#1e3fb0" },
};

const funnel = [
  { label: "Applied", count: 24, max: 24, color: "#1e3fb0" },
  { label: "Reviewed", count: 18, max: 24, color: "#1e3fb0" },
  { label: "Shortlisted", count: 14, max: 24, color: "#cbd5e1" },
  { label: "Interviewed", count: 3, max: 24, color: "#22c55e" },
];

const recentApplicants = [
  {
    initials: "AH",
    name: "Ahmed Hassan",
    position: "Senior Software Engineer",
    status: "Shortlisted",
    applied: "7 Apr 2026",
    score: 83,
  },
  {
    initials: "LA",
    name: "Lina Adel",
    position: "Product Designer",
    status: "Shortlisted",
    applied: "3 Apr 2026",
    score: 84,
  },
  {
    initials: "KS",
    name: "Karim Saleh",
    position: "Project Manager",
    status: "Shortlisted",
    applied: "4 Apr 2026",
    score: 82,
  },
];

const statusColors: Record<string, { bg: string; dot: string; text: string }> = {
  Shortlisted: { bg: "#f0fdf4", dot: "#22c55e", text: "#15803d" },
  Reviewed: { bg: "#eff6ff", dot: "#3b82f6", text: "#1d4ed8" },
  Interviewed: { bg: "#faf5ff", dot: "#a855f7", text: "#7e22ce" },
};

// ── component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col bg-[#f5f7ff]">
      <AdminPageHeader title="Dashboard Overview" />

      <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, badge, badgeColor, badgeText, icon: Icon, iconBg, iconColor, accent }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-xl border border-[rgba(0,0,0,0.06)] bg-white pt-1 shadow-sm"
            >
              {/* top accent bar */}
              <div className="h-1 w-full" style={{ backgroundColor: accent }} />
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: iconBg }}
                  >
                    <Icon size={18} style={{ color: iconColor }} />
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{ backgroundColor: badgeColor, color: badgeText }}
                  >
                    {badge}
                  </span>
                </div>
                <p className="mt-3 text-4xl font-bold text-[#0d1240]">{value}</p>
                <p className="mt-0.5 text-sm text-[#6b7280]">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
          {/* Bar chart */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-[#0d1240]">
              Applications This Month
            </h2>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <BarChart data={barData} barSize={60}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="applications" fill="#1e3fb0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Pipeline funnel */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-base font-semibold text-[#0d1240]">Pipeline Funnel</h2>
            <div className="flex flex-col gap-4">
              {funnel.map(({ label, count, max, color }) => (
                <div key={label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-[#374151]">{label}</span>
                    <span className="font-semibold text-[#0d1240]">{count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#f1f5f9]">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(count / max) * 100}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[rgba(0,0,0,0.06)] px-4 py-4 sm:px-6">
            <div>
              <h2 className="text-base font-semibold text-[#0d1240]">Recent Applications</h2>
              <p className="text-xs text-[#6b7280]">Latest submissions across all positions</p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-[rgba(0,0,0,0.12)] px-4 py-1.5 text-sm font-medium text-[#374151] hover:bg-gray-50"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[680px] w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(0,0,0,0.06)] bg-[#f9fafb]">
                {["Applicant", "Position", "Status", "Applied", "Score"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]"
                  >
                    {col}
                  </th>
                ))}
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {recentApplicants.map(({ initials, name, position, status, applied, score }) => {
                const s = statusColors[status] ?? statusColors["Reviewed"];
                return (
                  <tr
                    key={name}
                    className="border-b border-[rgba(0,0,0,0.04)] last:border-0 hover:bg-[#fafbff]"
                  >
                    {/* Applicant */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: "#1e3fb0" }}
                        >
                          {initials}
                        </div>
                        <span className="font-medium text-[#0d1240]">{name}</span>
                      </div>
                    </td>
                    {/* Position */}
                    <td className="px-6 py-4 text-[#6b7280]">{position}</td>
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
                        <span className="text-xs font-semibold text-[#0d1240]">{score}%</span>
                      </div>
                    </td>
                    {/* Action */}
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="text-[#9ca3af] hover:text-[#6b7280]"
                        aria-label="View applicant"
                      >
                        ···
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
