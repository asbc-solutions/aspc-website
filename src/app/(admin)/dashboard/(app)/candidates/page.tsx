"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

type CandidateStatus = "Interview" | "Reviewed" | "Shortlisted";

type Candidate = {
  id: number;
  initials: string;
  avatarColor: string;
  name: string;
  position: string;
  status: CandidateStatus;
  scores: {
    technical: number;
    communication: number;
    problemSolving: number;
    cultureFit: number;
  };
  highlight?: "Top Pick";
};

const candidates: Candidate[] = [
  {
    id: 1,
    initials: "SM",
    avatarColor: "#6b3fa0",
    name: "Sara Mahmoud",
    position: "Product Designer",
    status: "Interview",
    scores: { technical: 82, communication: 91, problemSolving: 78, cultureFit: 95 },
    highlight: "Top Pick",
  },
  {
    id: 2,
    initials: "DN",
    avatarColor: "#2272a8",
    name: "Dina Nasser",
    position: "Project Manager",
    status: "Interview",
    scores: { technical: 70, communication: 88, problemSolving: 80, cultureFit: 86 },
  },
  {
    id: 3,
    initials: "AH",
    avatarColor: "#2d4ea4",
    name: "Ahmed Hassan",
    position: "Senior Engineer",
    status: "Reviewed",
    scores: { technical: 93, communication: 77, problemSolving: 89, cultureFit: 84 },
  },
  {
    id: 4,
    initials: "OM",
    avatarColor: "#1f8f67",
    name: "Omar Magdy",
    position: "Data Analyst",
    status: "Shortlisted",
    scores: { technical: 85, communication: 79, problemSolving: 82, cultureFit: 90 },
  },
  {
    id: 5,
    initials: "LA",
    avatarColor: "#7d49bd",
    name: "Lina Adel",
    position: "UX Researcher",
    status: "Interview",
    scores: { technical: 74, communication: 94, problemSolving: 76, cultureFit: 92 },
  },
  {
    id: 6,
    initials: "KS",
    avatarColor: "#1f6fb0",
    name: "Karim Saleh",
    position: "Business Analyst",
    status: "Reviewed",
    scores: { technical: 79, communication: 81, problemSolving: 87, cultureFit: 83 },
  },
  {
    id: 7,
    initials: "NF",
    avatarColor: "#9b6d22",
    name: "Nadia Farouk",
    position: "QA Engineer",
    status: "Shortlisted",
    scores: { technical: 88, communication: 84, problemSolving: 81, cultureFit: 86 },
  },
  {
    id: 8,
    initials: "RM",
    avatarColor: "#0f7f8f",
    name: "Rami Mansour",
    position: "DevOps Engineer",
    status: "Reviewed",
    scores: { technical: 91, communication: 75, problemSolving: 90, cultureFit: 80 },
  },
  {
    id: 9,
    initials: "HZ",
    avatarColor: "#43558f",
    name: "Hana Zaki",
    position: "Project Coordinator",
    status: "Interview",
    scores: { technical: 72, communication: 89, problemSolving: 77, cultureFit: 93 },
  },
];

const statusStyle: Record<CandidateStatus, { bg: string; dot: string; text: string }> = {
  Interview: { bg: "#f0ebf8", dot: "#6b3fa0", text: "#6b3fa0" },
  Reviewed: { bg: "#eaf2ff", dot: "#1553c7", text: "#1553c7" },
  Shortlisted: { bg: "#e8f8ef", dot: "#1a7f4e", text: "#1a7f4e" },
};

function ScoreRow({ label, value }: Readonly<{ label: string; value: number }>) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-20 text-[11.5px] text-[#8ba8c4]">{label}</span>
      <div className="h-1 flex-1 overflow-hidden rounded bg-[#dde8f4]">
        <div className="h-full rounded bg-[#0c409f]" style={{ width: `${value}%` }} />
      </div>
      <span className="w-8 text-right text-[11.5px] font-semibold text-[#0d1117]">{value}%</span>
    </div>
  );
}

function CandidateCard({ candidate }: Readonly<{ candidate: Candidate }>) {
  const style = statusStyle[candidate.status];
  const avg = Math.round(
    (candidate.scores.technical +
      candidate.scores.communication +
      candidate.scores.problemSolving +
      candidate.scores.cultureFit) /
      4,
  );

  return (
    <article
      className="relative rounded-[14px] border border-[#aac8e3] p-[18px]"
      style={{
        backgroundImage: "linear-gradient(160deg, #ffffff 70%, #d8ecf8 100%)",
      }}
    >
      <div className="mb-3 flex items-start gap-3">
        <div
          className="flex h-[42px] w-[42px] items-center justify-center rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: candidate.avatarColor }}
        >
          {candidate.initials}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold text-[#0d1117]">{candidate.name}</h3>
          <p className="text-xs text-[#8ba8c4]">{candidate.position}</p>
          <span
            className="inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold"
            style={{ backgroundColor: style.bg, color: style.text }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: style.dot }} />
            {candidate.status}
          </span>
        </div>
      </div>

      <div className="space-y-[7px]">
        <ScoreRow label="Technical" value={candidate.scores.technical} />
        <ScoreRow label="Communication" value={candidate.scores.communication} />
        <ScoreRow label="Problem Solving" value={candidate.scores.problemSolving} />
        <ScoreRow label="Culture Fit" value={candidate.scores.cultureFit} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#dde8f4] pt-3.5">
        <span className="text-[13px] font-extrabold text-[#0c409f]">{avg}% avg</span>
        <button
          type="button"
          className="rounded-[7px] border border-[#dde8f4] px-3.5 py-1.5 text-xs font-semibold text-[#4a5568] hover:bg-white"
        >
          View Profile
        </button>
      </div>

      {candidate.highlight && (
        <div
          className="absolute right-4 top-3 rounded-full px-2 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.38px] text-white"
          style={{ backgroundImage: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)" }}
        >
          ⭐ {candidate.highlight}
        </div>
      )}
    </article>
  );
}

export default function CandidatesPage() {
  const [positionFilter, setPositionFilter] = useState("All Positions");
  const allPositions = useMemo(
    () => ["All Positions", ...new Set(candidates.map((candidate) => candidate.position))],
    [],
  );

  const visibleCandidates = useMemo(
    () =>
      positionFilter === "All Positions"
        ? candidates
        : candidates.filter((candidate) => candidate.position === positionFilter),
    [positionFilter],
  );

  return (
    <div className="flex flex-1 flex-col bg-[#f5f7ff]">
      <AdminPageHeader title="Top Candidates" subtitle="Monday, 8 April 2026" />

      <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[15.5px] font-bold text-[#0d1117]">Top Candidates</h2>
            <p className="text-[12.5px] text-[#8ba8c4]">Scored and ranked across all positions</p>
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={positionFilter}
              onChange={(event) => setPositionFilter(event.target.value)}
              className="h-8 appearance-none rounded-lg border border-[#dde8f4] bg-[#f4f8fc] py-1.5 pl-3 pr-8 text-[13px] text-[#4a5568] outline-none"
            >
              {allPositions.map((position) => (
                <option key={position}>{position}</option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4a5568]"
            />
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </section>
      </main>
    </div>
  );
}
