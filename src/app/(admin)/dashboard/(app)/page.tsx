import Link from "next/link";
import { Briefcase, Clock, FileText, UserCheck } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getDashboardStats, type AdminApplication } from "@/app/api/admin.api";
import { DashboardBarChart } from "./DashboardBarChart";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getName(app: AdminApplication): string {
  const a = app.answers.find((x) => x.form_field_label === "Full Name");
  if (!a) return "Unknown";
  return Array.isArray(a.value) ? a.value.join(" ") : String(a.value);
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function getWeeklyData(applications: AdminApplication[]) {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const weeks = [
    { label: "Week 1", start: new Date(y, m, 1),  end: new Date(y, m, 8) },
    { label: "Week 2", start: new Date(y, m, 8),  end: new Date(y, m, 15) },
    { label: "Week 3", start: new Date(y, m, 15), end: new Date(y, m, 22) },
    { label: "Week 4", start: new Date(y, m, 22), end: new Date(y, m + 1, 1) },
  ];
  return weeks.map(({ label, start, end }) => ({
    week: label,
    applications: applications.filter((a) => {
      const d = new Date(a.created_at);
      return d >= start && d < end;
    }).length,
  }));
}

// ── Status config ─────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, { bg: string; dot: string; text: string }> = {
  Pending:     { bg: "#f0fdfa", dot: "#14b8a6", text: "#0f766e" },
  Reviewed:    { bg: "#eff6ff", dot: "#3b82f6", text: "#1d4ed8" },
  Interview:   { bg: "#ede9fe", dot: "#a855f7", text: "#7e22ce" },
  Shortlisted: { bg: "#dcfce7", dot: "#22c55e", text: "#15803d" },
  Rejected:    { bg: "#fee2e2", dot: "#ef4444", text: "#dc2626" },
};

const DEFAULT_STATUS = { bg: "#f1f5f9", dot: "#94a3b8", text: "#475569" };

const AVATAR_COLORS = ["#1e3fb0", "#7c3aed", "#15803d", "#b45309", "#0891b2", "#be123c"];

function avatarColor(name: string): string {
  return AVATAR_COLORS[(name.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
}

// ── Component ─────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  let openPositions = 0;
  let totalApplications = 0;
  let shortlisted = 0;
  let interviewed = 0;
  let applications: AdminApplication[] = [];

  try {
    ({ openPositions, totalApplications, shortlisted, interviewed, applications } =
      await getDashboardStats());
  } catch {
    // show zeros if API unavailable
  }

  const reviewed = applications.filter((a) => a.status.value >= 2).length;
  const barData = getWeeklyData(applications);

  const recentApplicants = [...applications]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  const funnel = [
    { label: "Applied",     count: totalApplications, color: "#1e3fb0" },
    { label: "Reviewed",    count: reviewed,           color: "#1e3fb0" },
    { label: "Shortlisted", count: shortlisted,        color: "#cbd5e1" },
    { label: "Interviewed", count: interviewed,        color: "#22c55e" },
  ];

  const statsCards = [
    {
      label: "Open Positions",
      value: openPositions,
      badge: `${openPositions} active`,
      badgeColor: "#dbeafe", badgeText: "#1d4ed8",
      icon: Briefcase, iconBg: "#eff6ff", iconColor: "#3b82f6", accent: "#3b82f6",
    },
    {
      label: "Total Applications",
      value: totalApplications,
      badge: `${totalApplications} total`,
      badgeColor: "#dbeafe", badgeText: "#1d4ed8",
      icon: FileText, iconBg: "#eff6ff", iconColor: "#3b82f6", accent: "#3b82f6",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      badge: `${shortlisted} candidates`,
      badgeColor: "#dcfce7", badgeText: "#15803d",
      icon: UserCheck, iconBg: "#f0fdf4", iconColor: "#22c55e", accent: "#22c55e",
    },
    {
      label: "Interviews Scheduled",
      value: interviewed,
      badge: `${interviewed} scheduled`,
      badgeColor: interviewed === 0 ? "#f1f5f9" : "#fee2e2",
      badgeText: interviewed === 0 ? "#6b7280" : "#b91c1c",
      icon: Clock, iconBg: "#fff7ed", iconColor: "#f97316", accent: "#f59e0b",
    },
  ];

  return (
    <div className="flex flex-1 flex-col bg-[#f5f7ff]">
      <AdminPageHeader title="Dashboard Overview" />

      <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map(({ label, value, badge, badgeColor, badgeText, icon: Icon, iconBg, iconColor, accent }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-xl border border-[rgba(0,0,0,0.06)] bg-white pt-1 shadow-sm"
            >
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
            <DashboardBarChart data={barData} />
          </div>

          {/* Pipeline funnel */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-base font-semibold text-[#0d1240]">Pipeline Funnel</h2>
            <div className="flex flex-col gap-4">
              {funnel.map(({ label, count, color }) => (
                <div key={label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-[#374151]">{label}</span>
                    <span className="font-semibold text-[#0d1240]">{count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#f1f5f9]">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: totalApplications > 0
                          ? `${(count / totalApplications) * 100}%`
                          : "0%",
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
            <Link
              href="/dashboard/applications"
              className="rounded-lg border border-[rgba(0,0,0,0.12)] px-4 py-1.5 text-sm font-medium text-[#374151] hover:bg-gray-50"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-145 w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.06)] bg-[#f9fafb]">
                  {["Applicant", "Position", "Status", "Applied"].map((col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentApplicants.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-10 text-center text-sm text-[#9ca3af]"
                    >
                      No applications yet.
                    </td>
                  </tr>
                ) : (
                  recentApplicants.map((app) => {
                    const name = getName(app);
                    const abbr = getInitials(name);
                    const color = avatarColor(name);
                    const s = STATUS_COLORS[app.status.label] ?? DEFAULT_STATUS;
                    return (
                      <tr
                        key={app.id}
                        className="border-b border-[rgba(0,0,0,0.04)] last:border-0 hover:bg-[#fafbff]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                              style={{ backgroundColor: color }}
                            >
                              {abbr}
                            </div>
                            <span className="font-medium text-[#0d1240]">{name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#6b7280]">{app.position?.title ?? "—"}</td>
                        <td className="px-6 py-4">
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                            style={{ backgroundColor: s.bg, color: s.text }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: s.dot }}
                            />
                            {app.status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#6b7280]">{formatDate(app.created_at)}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
