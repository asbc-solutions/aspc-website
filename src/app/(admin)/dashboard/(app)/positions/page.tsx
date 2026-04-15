"use client";

import { Bell, Briefcase, Calendar, ChevronDown, Eye, MapPin, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

// ── types ───────────────────────────────────────────────────────────────────

type Department = "Engineering" | "Design" | "Infrastructure" | "Management" | "Business";
type Status = "Active" | "Paused";

type Position = {
  id: number;
  title: string;
  department: Department;
  location: string;
  workType: string;
  level: string;
  applicants: number;
  maxApplicants: number;
  status: Status;
  postedDate: string;
  avatars: { initials: string; color: string }[];
};

// ── data ────────────────────────────────────────────────────────────────────

const departmentStyles: Record<Department, { bg: string; text: string }> = {
  Engineering: { bg: "#dbeafe", text: "#1d4ed8" },
  Design: { bg: "#ede9fe", text: "#6d28d9" },
  Infrastructure: { bg: "#f1f5f9", text: "#475569" },
  Management: { bg: "#dcfce7", text: "#15803d" },
  Business: { bg: "#ffedd5", text: "#c2410c" },
};

const statusStyles: Record<Status, { bg: string; dot: string; text: string }> = {
  Active: { bg: "#dcfce7", dot: "#22c55e", text: "#15803d" },
  Paused: { bg: "#ffedd5", dot: "#f97316", text: "#c2410c" },
};

const positions: Position[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Cairo, Egypt",
    workType: "Hybrid",
    level: "Senior",
    applicants: 3,
    maxApplicants: 5,
    status: "Active",
    postedDate: "2 Apr 2026",
    avatars: [
      { initials: "AH", color: "#1e3fb0" },
      { initials: "NR", color: "#7c3aed" },
      { initials: "RM", color: "#0891b2" },
    ],
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    workType: "Remote",
    level: "Mid-level",
    applicants: 3,
    maxApplicants: 5,
    status: "Active",
    postedDate: "1 Apr 2026",
    avatars: [
      { initials: "SN", color: "#6d28d9" },
      { initials: "LA", color: "#0891b2" },
      { initials: "MS", color: "#15803d" },
    ],
  },
  {
    id: 3,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Cairo, Egypt",
    workType: "Hybrid",
    level: "Mid-level",
    applicants: 2,
    maxApplicants: 5,
    status: "Active",
    postedDate: "28 Mar 2026",
    avatars: [
      { initials: "OK", color: "#15803d" },
      { initials: "HZ", color: "#b45309" },
    ],
  },
  {
    id: 4,
    title: "Project Manager",
    department: "Management",
    location: "Cairo, Egypt",
    workType: "On-site",
    level: "Senior",
    applicants: 2,
    maxApplicants: 5,
    status: "Paused",
    postedDate: "20 Mar 2026",
    avatars: [
      { initials: "KS", color: "#1e3fb0" },
      { initials: "DN", color: "#7c3aed" },
    ],
  },
  {
    id: 5,
    title: "Business Analyst",
    department: "Business",
    location: "Remote",
    workType: "Remote",
    level: "Mid-level",
    applicants: 2,
    maxApplicants: 5,
    status: "Active",
    postedDate: "15 Mar 2026",
    avatars: [
      { initials: "TI", color: "#1e3fb0" },
      { initials: "YG", color: "#15803d" },
    ],
  },
];

// ── sub-components ───────────────────────────────────────────────────────────

function PositionCard({ position }: { position: Position }) {
  const dept = departmentStyles[position.department];
  const stat = statusStyles[position.status];
  const pct = (position.applicants / position.maxApplicants) * 100;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Top row: department badge + actions */}
      <div className="flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: dept.bg, color: dept.text }}
        >
          {position.department}
        </span>
        <div className="flex items-center gap-3 text-[#9ca3af]">
          <button type="button" className="hover:text-[#6b7280]" aria-label="View position">
            <Eye size={15} />
          </button>
          <button type="button" className="hover:text-[#6b7280]" aria-label="Edit position">
            <Pencil size={15} />
          </button>
          <button type="button" className="hover:text-red-400" aria-label="Delete position">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <h3 className="text-base font-bold text-[#0d1240]">{position.title}</h3>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6b7280]">
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {position.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {position.workType}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={11} />
            {position.level}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="h-1.5 flex-1 rounded-full bg-[#f1f5f9]">
          <div
            className="h-1.5 rounded-full"
            style={{ width: `${pct}%`, backgroundColor: "#1e3fb0" }}
          />
        </div>
        <span className="shrink-0 text-xs font-semibold text-[#1e3fb0]">
          {position.applicants} applicants
        </span>
      </div>

      {/* Footer: avatars + status + date */}
      <div className="flex items-center justify-between">
        {/* Overlapping avatars */}
        <div className="flex">
          {position.avatars.map(({ initials, color }, i) => (
            <div
              key={initials}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white"
              style={{ backgroundColor: color, marginLeft: i === 0 ? 0 : -8, zIndex: i }}
            >
              {initials}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={{ backgroundColor: stat.bg, color: stat.text }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stat.dot }} />
            {position.status}
          </span>
          <span className="text-xs text-[#9ca3af]">{position.postedDate}</span>
        </div>
      </div>
    </div>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────

export default function PositionsPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");

  const filtered = positions.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDept = department === "All Departments" || p.department === department;
    const matchStatus = status === "All Status" || p.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  return (
    <div className="flex flex-1 flex-col bg-[#f5f7ff]">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] bg-white px-8 py-4">
        <div>
          <h1 className="text-xl font-bold text-[#0d1240]">Open Positions</h1>
          <p className="text-xs text-[#6b7280]">Monday, 8 April 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white text-[#6b7280] hover:bg-gray-50"
          >
            <Bell size={16} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: "#1e3fb0" }}
          >
            <Plus size={15} />
            Add Position
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6 p-8">
        {/* Section heading */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0d1240]">Open Positions</h2>
            <p className="text-sm text-[#6b7280]">{positions.length} active roles</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: "#1e3fb0" }}
          >
            <Plus size={15} />
            Add Position
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-4 shadow-sm">
          {/* Search */}
          <div className="relative flex-1 min-w-50">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Search positions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-9 pr-4 text-sm text-[#374151] placeholder-[#9ca3af] outline-none focus:border-[#1e3fb0] focus:ring-1 focus:ring-[#1e3fb0]"
            />
          </div>

          {/* Department filter */}
          <div className="relative">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="appearance-none rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-3 pr-8 text-sm text-[#374151] outline-none focus:border-[#1e3fb0]"
            >
              <option>All Departments</option>
              {(Object.keys(departmentStyles) as Department[]).map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]" />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="appearance-none rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-3 pr-8 text-sm text-[#374151] outline-none focus:border-[#1e3fb0]"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Paused</option>
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]" />
          </div>
        </div>

        {/* Cards grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PositionCard key={p.id} position={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white py-20 text-center shadow-sm">
            <Briefcase size={36} className="text-[#cbd5e1]" />
            <p className="text-sm font-medium text-[#6b7280]">No positions match your filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
