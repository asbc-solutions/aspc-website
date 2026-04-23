"use client";

import {
  Briefcase,
  Calendar,
  ChevronDown,
  ListChecks,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

// ─── Options ─────────────────────────────────────────────────────────────────

const WORK_TYPE_OPTIONS = [
  { label: "On-site", value: 1 },
  { label: "Hybrid", value: 2 },
  { label: "Remote", value: 3 },
];

const EMPLOYMENT_TYPE_OPTIONS = [
  { label: "Full-time", value: 1 },
  { label: "Part-time", value: 2 },
  { label: "Contract", value: 3 },
  { label: "Internship", value: 4 },
];

const STATUS_OPTIONS = [
  { label: "Active", value: 1 },
  { label: "Paused", value: 2 },
];

// ─── Schema ───────────────────────────────────────────────────────────────────

const positionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  work_type: z.coerce.number().int().min(1),
  employment_type: z.coerce.number().int().min(1),
  experience: z.string().min(1, "Experience is required"),
  description: z.string().min(1, "Description is required"),
  status: z.coerce.number().int().min(1),
});

type PositionFormValues = z.infer<typeof positionSchema>;

// ─── Types ────────────────────────────────────────────────────────────────────

type PositionStatus = "Active" | "Paused";

type Position = {
  id: number;
  title: string;
  description: string;
  department: string;
  location: string;
  workType: string;
  workTypeId: number;
  level: string;
  employmentTypeId: number;
  applicants: number;
  maxApplicants: number;
  status: PositionStatus;
  statusId: number;
  postedDate: string;
};

// ─── Utilities ────────────────────────────────────────────────────────────────

const statusStyles: Record<
  PositionStatus,
  { bg: string; dot: string; text: string }
> = {
  Active: { bg: "#dcfce7", dot: "#22c55e", text: "#15803d" },
  Paused: { bg: "#ffedd5", dot: "#f97316", text: "#c2410c" },
};

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const textOr = (v: unknown, fallback = "") =>
  typeof v === "string" && v.trim().length > 0 ? v : fallback;

const toStatus = (v: unknown): PositionStatus =>
  typeof v === "string" && v.toLowerCase() === "paused" ? "Paused" : "Active";

const toDateLabel = (v: unknown) => {
  if (typeof v !== "string" || !v) return "-";
  const d = new Date(v);
  return Number.isNaN(d.getTime())
    ? "-"
    : d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

const normalizePosition = (raw: unknown): Position | null => {
  if (!isRecord(raw)) return null;

  const id = typeof raw.id === "number" ? raw.id : null;
  const title = textOr(raw.title);
  if (id === null || !title) return null;

  const workTypeObj = isRecord(raw.work_type) ? raw.work_type : null;
  const employmentTypeObj = isRecord(raw.employment_type)
    ? raw.employment_type
    : null;
  const statusObj = isRecord(raw.status) ? raw.status : null;

  const workTypeLabel = textOr(
    workTypeObj ? workTypeObj.label : raw.work_type,
    "Not set",
  );
  const workTypeId =
    workTypeObj && typeof workTypeObj.id === "number" ? workTypeObj.id : 0;

  const employmentTypeLabel = textOr(
    employmentTypeObj ? employmentTypeObj.label : raw.employment_type,
    "Not set",
  );
  const employmentTypeId =
    employmentTypeObj && typeof employmentTypeObj.id === "number"
      ? employmentTypeObj.id
      : 0;

  const statusLabel = textOr(
    statusObj ? statusObj.label : raw.status,
    "active",
  );
  const statusId =
    statusObj && typeof statusObj.id === "number"
      ? statusObj.id
      : statusLabel.toLowerCase() === "paused"
        ? 2
        : 1;
  const status = toStatus(statusLabel);

  let applicants = 0;
  if (typeof raw.applications_count === "number")
    applicants = raw.applications_count;
  else if (typeof raw.applicants === "number") applicants = raw.applicants;

  return {
    id,
    title,
    description: textOr(raw.description, ""),
    department: textOr(raw.department, "General"),
    location: textOr(raw.location, "Not specified"),
    workType: workTypeLabel,
    workTypeId,
    level: textOr(raw.experience, textOr(employmentTypeLabel, "Not set")),
    employmentTypeId,
    applicants,
    maxApplicants:
      typeof raw.max_applicants === "number" ? raw.max_applicants : 100,
    status,
    statusId,
    postedDate: toDateLabel(raw.created_at),
  };
};

// ─── Position card skeleton ───────────────────────────────────────────────────

function PositionCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[rgba(0,0,0,0.06)] animate-pulse  p-5 shadow-sm">
      {/* row 1 – department badge + action icons */}
      <div className="flex items-center justify-between ">
        <Skeleton className="h-6 w-28 rounded-full" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-3.75 w-3.75 rounded" />
          <Skeleton className="h-3.75 w-3.75 rounded" />
        </div>
      </div>

      {/* row 2 – title + meta (location / work-type / level) */}
      <div>
        <Skeleton className="h-5 w-3/4 rounded" />
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <Skeleton className="h-3 w-24 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </div>

      {/* row 3 – progress bar + applicants count */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-1.5 flex-1 rounded-full" />
        <Skeleton className="h-3.5 w-20 rounded" />
      </div>

      {/* row 4 – status badge + posted date */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-3 w-24 rounded" />
      </div>
    </div>
  );
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
  fullWidth,
}: Readonly<{
  label: string;
  error?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}>) {
  return (
    <label
      className={`flex flex-col gap-1.5 text-sm text-[#374151]${fullWidth ? " col-span-full" : ""}`}
    >
      <span>{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

const inputClass =
  "rounded-lg border border-[rgba(0,0,0,0.12)] px-3 py-2 outline-none focus:border-[#1e3fb0]";
const selectClass =
  "rounded-lg border border-[rgba(0,0,0,0.12)] bg-white px-3 py-2 outline-none focus:border-[#1e3fb0]";

// ─── Position modal ───────────────────────────────────────────────────────────

function PositionModal({
  open,
  position,
  onClose,
  onSuccess,
}: Readonly<{
  open: boolean;
  position: Position | null;
  onClose: () => void;
  onSuccess: () => void;
}>) {
  const isEditing = position !== null;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PositionFormValues>({
    resolver: zodResolver(positionSchema) as Resolver<PositionFormValues>,
    defaultValues: {
      title: "",
      department: "",
      work_type: 1,
      employment_type: 1,
      experience: "",
      description: "",
      status: 1,
    },
  });

  useEffect(() => {
    if (!open) return;
    const values = position
      ? {
          title: position.title,
          department: position.department,
          work_type: position.workTypeId || 1,
          employment_type: position.employmentTypeId || 1,
          experience: position.level,
          description: position.description,
          status: position.statusId || 1,
        }
      : {
          title: "",
          department: "",
          work_type: 1,
          employment_type: 1,
          experience: "",
          description: "",
          status: 1,
        };
    reset(values);
  }, [open, position, reset]);

  const onSubmit = async (data: PositionFormValues) => {
    try {
      const endpoint = isEditing
        ? `/api/admin/careers/positions/${position.id}`
        : "/api/admin/careers/positions";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        setError("root", {
          message:
            isRecord(payload) && typeof payload.message === "string"
              ? payload.message
              : "Failed to save position.",
        });
        return;
      }

      onSuccess();
      onClose();
    } catch {
      setError("root", { message: "Could not reach the server." });
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#0d1240]">
            {isEditing ? "Edit Position" : "Add Position"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f3f4f6]"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
            {errors.root?.message && (
              <div className="col-span-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                {errors.root.message}
              </div>
            )}

            <Field label="Title" error={errors.title?.message}>
              <input
                {...register("title")}
                className={inputClass}
                placeholder="Senior Software Engineer"
              />
            </Field>

            <Field label="Department" error={errors.department?.message}>
              <input
                {...register("department")}
                className={inputClass}
                placeholder="Engineering"
              />
            </Field>

            <Field label="Work Type">
              <select {...register("work_type")} className={selectClass}>
                {WORK_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Employment Type">
              <select {...register("employment_type")} className={selectClass}>
                {EMPLOYMENT_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Experience" error={errors.experience?.message}>
              <input
                {...register("experience")}
                className={inputClass}
                placeholder="3-5 years"
              />
            </Field>

            <Field label="Status">
              <select {...register("status")} className={selectClass}>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Description"
              error={errors.description?.message}
              fullWidth
            >
              <textarea
                {...register("description")}
                className={`min-h-24 ${inputClass}`}
                placeholder="Write a brief role description..."
              />
            </Field>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[rgba(0,0,0,0.08)] px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-[rgba(0,0,0,0.12)] px-4 py-2 text-sm font-semibold text-[#374151] disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: "#1e3fb0" }}
            >
              {isSubmitting ? (
                <Spinner className="mx-auto" />
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Create Position"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Position card ────────────────────────────────────────────────────────────

function PositionCard({
  position,
  onEdit,
  onDelete,
}: Readonly<{
  position: Position;
  onEdit: (p: Position) => void;
  onDelete: (p: Position) => void;
}>) {
  const stat = statusStyles[position.status];
  const pct = Math.min(
    100,
    (position.applicants / Math.max(position.maxApplicants, 1)) * 100,
  );

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#1e3fb0]">
          {position.department}
        </span>
        <div className="flex items-center gap-3 text-[#9ca3af]">
          <Link
            href={`/dashboard/positions/${position.id}/fields`}
            className="hover:text-[#1e3fb0]"
            aria-label="Manage form fields"
          >
            <ListChecks size={15} />
          </Link>
          <button
            type="button"
            className="hover:text-[#6b7280]"
            aria-label="Edit position"
            onClick={() => onEdit(position)}
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            className="hover:text-red-500"
            aria-label="Delete position"
            onClick={() => onDelete(position)}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

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

      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
          style={{ backgroundColor: stat.bg, color: stat.text }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: stat.dot }}
          />
          {position.status}
        </span>
        <span className="text-xs text-[#9ca3af]">{position.postedDate}</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PositionsPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalPosition, setModalPosition] = useState<Position | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [positionToDelete, setPositionToDelete] = useState<Position | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const loadPositions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/careers/positions", {
        cache: "no-store",
      });
      const payload: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          isRecord(payload) && typeof payload.message === "string"
            ? payload.message
            : "Failed to load positions.",
        );
      }

      let rawList: unknown[] = [];
      if (isRecord(payload) && Array.isArray(payload.data))
        rawList = payload.data;
      else if (Array.isArray(payload)) rawList = payload;

      setPositions(
        rawList.map(normalizePosition).filter((p): p is Position => p !== null),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load positions.",
      );
      setPositions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPositions();
  }, []);

  const departments = useMemo(
    () =>
      Array.from(new Set(positions.map((p) => p.department))).filter(Boolean),
    [positions],
  );

  const filtered = positions.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDept =
      department === "All Departments" || p.department === department;
    const matchStatus =
      statusFilter === "All Status" || p.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const activeRolesCount = positions.filter(
    (p) => p.status === "Active",
  ).length;

  const handleConfirmDelete = async () => {
    if (!positionToDelete) return;
    setDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch(
        `/api/admin/careers/positions/${positionToDelete.id}`,
        {
          method: "DELETE",
        },
      );
      const payload: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        setDeleteError(
          isRecord(payload) && typeof payload.message === "string"
            ? payload.message
            : "Failed to delete position.",
        );
        return;
      }

      setPositionToDelete(null);
      await loadPositions();
    } catch {
      setDeleteError("Could not reach the server.");
    } finally {
      setDeleting(false);
    }
  };

  let positionsContent: React.ReactNode;
  if (loading) {
    positionsContent = (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PositionCardSkeleton key={i} />
        ))}
      </div>
    );
  } else if (filtered.length > 0) {
    positionsContent = (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PositionCard
            key={p.id}
            position={p}
            onEdit={(pos) => {
              setModalPosition(pos);
              setIsModalOpen(true);
            }}
            onDelete={(pos) => {
              setDeleteError("");
              setPositionToDelete(pos);
            }}
          />
        ))}
      </div>
    );
  } else {
    positionsContent = (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white py-20 text-center shadow-sm">
        <Briefcase size={36} className="text-[#cbd5e1]" />
        <p className="text-sm font-medium text-[#6b7280]">
          No positions match your filters
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col bg-[#f5f7ff]">
        <AdminPageHeader title="Positions" />

        <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#0d1240]">
                Open Positions
              </h2>
              <p className="text-sm text-[#6b7280]">
                {activeRolesCount} active roles
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: "#1e3fb0" }}
              onClick={() => {
                setModalPosition(null);
                setIsModalOpen(true);
              }}
            >
              <Plus size={15} />
              Add Position
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-4 shadow-sm">
            <div className="relative min-w-50 flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
              />
              <input
                type="text"
                placeholder="Search positions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-9 pr-4 text-sm text-[#374151] placeholder-[#9ca3af] outline-none focus:border-[#1e3fb0] focus:ring-1 focus:ring-[#1e3fb0]"
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="appearance-none rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-3 pr-8 text-sm text-[#374151] outline-none focus:border-[#1e3fb0]"
              >
                <option>All Departments</option>
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-3 pr-8 text-sm text-[#374151] outline-none focus:border-[#1e3fb0]"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Paused</option>
              </select>
              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]"
              />
            </div>
          </div>

          {positionsContent}
        </main>
      </div>

      <PositionModal
        open={isModalOpen}
        position={modalPosition}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => void loadPositions()}
      />

      {positionToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => {
            if (!deleting) setPositionToDelete(null);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0d1240]">
                Delete position
              </h3>
              <button
                type="button"
                onClick={() => setPositionToDelete(null)}
                disabled={deleting}
                className="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] disabled:opacity-60"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-3 text-sm text-[#4b5563]">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                &quot;{positionToDelete.title}&quot;
              </span>
              ? This action cannot be undone.
            </p>
            {deleteError && (
              <p className="mt-2 text-sm text-red-600">{deleteError}</p>
            )}
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPositionToDelete(null)}
                disabled={deleting}
                className="rounded-lg border border-[rgba(0,0,0,0.12)] px-4 py-2 text-sm font-semibold text-[#374151] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                style={{ backgroundColor: "#dc2626" }}
              >
                {deleting ? <Spinner className="mx-auto" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
