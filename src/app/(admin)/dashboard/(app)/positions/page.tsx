"use client";

import { Bell, Briefcase, Calendar, ChevronDown, MapPin, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type PositionStatus = "Active" | "Paused";

type Position = {
  id: number;
  title: string;
  department: string;
  location: string;
  workType: string;
  level: string;
  applicants: number;
  maxApplicants: number;
  status: PositionStatus;
  postedDate: string;
};

type PositionForm = {
  title: string;
  department: string;
  location: string;
  workType: string;
  level: string;
  status: PositionStatus;
  description: string;
};

const statusStyles: Record<PositionStatus, { bg: string; dot: string; text: string }> = {
  Active: { bg: "#dcfce7", dot: "#22c55e", text: "#15803d" },
  Paused: { bg: "#ffedd5", dot: "#f97316", text: "#c2410c" },
};

const defaultForm: PositionForm = {
  title: "",
  department: "",
  location: "",
  workType: "Hybrid",
  level: "Mid-level",
  status: "Active",
  description: "",
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const textOr = (value: unknown, fallback = "") =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback;

const toStatus = (value: unknown): PositionStatus =>
  typeof value === "string" && value.toLowerCase() === "paused" ? "Paused" : "Active";

const toDateLabel = (value: unknown) => {
  if (typeof value !== "string" || value.length === 0) {
    return "-";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const normalizePosition = (raw: unknown): Position | null => {
  if (!isRecord(raw)) {
    return null;
  }

  const id = typeof raw.id === "number" ? raw.id : null;
  const title = textOr(raw.title);
  if (id === null || !title) {
    return null;
  }

  const workTypeValue = isRecord(raw.work_type) ? raw.work_type.label : raw.work_type;
  const employmentTypeValue = isRecord(raw.employment_type) ? raw.employment_type.label : raw.employment_type;
  const statusValue = isRecord(raw.status) ? raw.status.label : raw.status;

  const workType = textOr(workTypeValue, "Not set");
  const level = textOr(raw.experience, textOr(employmentTypeValue, "Not set"));
  const status = toStatus(statusValue);

  let applicants = 0;
  if (typeof raw.applications_count === "number") {
    applicants = raw.applications_count;
  } else if (typeof raw.applicants === "number") {
    applicants = raw.applicants;
  }
  const maxApplicants = typeof raw.max_applicants === "number" ? raw.max_applicants : 100;

  return {
    id,
    title,
    department: textOr(raw.department, "General"),
    location: textOr(raw.location, "Not specified"),
    workType,
    level,
    applicants,
    maxApplicants,
    status,
    postedDate: toDateLabel(raw.created_at),
  };
};

function PositionModal({
  open,
  isEditing,
  form,
  saving,
  onClose,
  onChange,
  onSubmit,
}: Readonly<{
  open: boolean;
  isEditing: boolean;
  form: PositionForm;
  saving: boolean;
  onClose: () => void;
  onChange: (field: keyof PositionForm, value: string) => void;
  onSubmit: () => void;
}>) {
  if (!open) {
    return null;
  }

  const modalTitle = isEditing ? "Edit Position" : "Add Position";
  let submitLabel = "Create Position";
  if (isEditing) {
    submitLabel = "Save Changes";
  }
  if (saving) {
    submitLabel = "Saving...";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#0d1240]">{modalTitle}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-[#6b7280] hover:bg-[#f3f4f6]"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-[#374151]">
            <span>Title</span>
            <input
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              className="rounded-lg border border-[rgba(0,0,0,0.12)] px-3 py-2 outline-none focus:border-[#1e3fb0]"
              placeholder="Senior Software Engineer"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-[#374151]">
            <span>Department</span>
            <input
              value={form.department}
              onChange={(e) => onChange("department", e.target.value)}
              className="rounded-lg border border-[rgba(0,0,0,0.12)] px-3 py-2 outline-none focus:border-[#1e3fb0]"
              placeholder="Engineering"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-[#374151]">
            <span>Location</span>
            <input
              value={form.location}
              onChange={(e) => onChange("location", e.target.value)}
              className="rounded-lg border border-[rgba(0,0,0,0.12)] px-3 py-2 outline-none focus:border-[#1e3fb0]"
              placeholder="Cairo, Egypt"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-[#374151]">
            <span>Work Type</span>
            <input
              value={form.workType}
              onChange={(e) => onChange("workType", e.target.value)}
              className="rounded-lg border border-[rgba(0,0,0,0.12)] px-3 py-2 outline-none focus:border-[#1e3fb0]"
              placeholder="Hybrid"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-[#374151]">
            <span>Level</span>
            <input
              value={form.level}
              onChange={(e) => onChange("level", e.target.value)}
              className="rounded-lg border border-[rgba(0,0,0,0.12)] px-3 py-2 outline-none focus:border-[#1e3fb0]"
              placeholder="Mid-level"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-[#374151]">
            <span>Status</span>
            <select
              value={form.status}
              onChange={(e) => onChange("status", e.target.value)}
              className="rounded-lg border border-[rgba(0,0,0,0.12)] bg-white px-3 py-2 outline-none focus:border-[#1e3fb0]"
            >
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
          </label>
          <label className="col-span-full flex flex-col gap-1.5 text-sm text-[#374151]">
            <span>Description</span>
            <textarea
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
              className="min-h-24 rounded-lg border border-[rgba(0,0,0,0.12)] px-3 py-2 outline-none focus:border-[#1e3fb0]"
              placeholder="Write a brief role description..."
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[rgba(0,0,0,0.08)] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[rgba(0,0,0,0.12)] px-4 py-2 text-sm font-semibold text-[#374151]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={onSubmit}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            style={{ backgroundColor: "#1e3fb0" }}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function PositionCard({
  position,
  onEdit,
  onDelete,
}: Readonly<{
  position: Position;
  onEdit: (position: Position) => void;
  onDelete: (position: Position) => void;
}>) {
  const stat = statusStyles[position.status];
  const pct = Math.min(100, (position.applicants / Math.max(position.maxApplicants, 1)) * 100);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#1e3fb0]">
          {position.department}
        </span>
        <div className="flex items-center gap-3 text-[#9ca3af]">
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
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: stat.dot }} />
          {position.status}
        </span>
        <span className="text-xs text-[#9ca3af]">{position.postedDate}</span>
      </div>
    </div>
  );
}

export default function PositionsPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [form, setForm] = useState<PositionForm>(defaultForm);
  const [saving, setSaving] = useState(false);

  const loadPositions = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/careers/positions", { cache: "no-store" });
      const payload: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          isRecord(payload) && typeof payload.message === "string"
            ? payload.message
            : "Failed to load positions.";
        throw new Error(message);
      }

      let rawList: unknown[] = [];
      if (isRecord(payload) && Array.isArray(payload.data)) {
        rawList = payload.data;
      } else if (Array.isArray(payload)) {
        rawList = payload;
      }

      const normalized = rawList.map(normalizePosition).filter((item): item is Position => item !== null);
      setPositions(normalized);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to load positions.");
      setPositions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPositions();
  }, []);

  const departments = useMemo(
    () => Array.from(new Set(positions.map((positionItem) => positionItem.department))).filter(Boolean),
    [positions],
  );

  const filtered = positions.filter((positionItem) => {
    const matchSearch = positionItem.title.toLowerCase().includes(search.toLowerCase());
    const matchDept = department === "All Departments" || positionItem.department === department;
    const matchStatus = status === "All Status" || positionItem.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  const openCreateModal = () => {
    setEditingPosition(null);
    setForm(defaultForm);
    setIsModalOpen(true);
  };

  const openEditModal = (positionItem: Position) => {
    setEditingPosition(positionItem);
    setForm({
      title: positionItem.title,
      department: positionItem.department,
      location: positionItem.location,
      workType: positionItem.workType,
      level: positionItem.level,
      status: positionItem.status,
      description: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!saving) {
      setIsModalOpen(false);
    }
  };

  const handleFormChange = (field: keyof PositionForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.department.trim()) {
      setError("Title and department are required.");
      return;
    }

    setSaving(true);
    setError("");

    const body = {
      title: form.title.trim(),
      department: form.department.trim(),
      location: form.location.trim(),
      work_type: form.workType.trim(),
      employment_type: form.level.trim(),
      experience: form.level.trim(),
      status: form.status,
      description: form.description.trim(),
    };

    try {
      const endpoint = editingPosition
        ? `/api/admin/careers/positions/${editingPosition.id}`
        : "/api/admin/careers/positions";
      const method = editingPosition ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          isRecord(payload) && typeof payload.message === "string"
            ? payload.message
            : "Failed to save position.";
        throw new Error(message);
      }

      setIsModalOpen(false);
      setEditingPosition(null);
      setForm(defaultForm);
      await loadPositions();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to save position.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (positionItem: Position) => {
    const confirmed = globalThis.window.confirm(`Delete "${positionItem.title}"?`);
    if (!confirmed) {
      return;
    }

    setError("");
    try {
      const res = await fetch(`/api/admin/careers/positions/${positionItem.id}`, {
        method: "DELETE",
      });
      const payload: unknown = await res.json().catch(() => null);

      if (!res.ok) {
        const message =
          isRecord(payload) && typeof payload.message === "string"
            ? payload.message
            : "Failed to delete position.";
        throw new Error(message);
      }

      await loadPositions();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to delete position.");
    }
  };

  const activeRolesCount = positions.filter((positionItem) => positionItem.status === "Active").length;

  let positionsContent: React.ReactNode;
  if (loading) {
    positionsContent = (
      <div className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white py-20 text-center text-sm text-[#6b7280] shadow-sm">
        Loading positions...
      </div>
    );
  } else if (filtered.length > 0) {
    positionsContent = (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((positionItem) => (
          <PositionCard
            key={positionItem.id}
            position={positionItem}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ))}
      </div>
    );
  } else {
    positionsContent = (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white py-20 text-center shadow-sm">
        <Briefcase size={36} className="text-[#cbd5e1]" />
        <p className="text-sm font-medium text-[#6b7280]">No positions match your filters</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-1 flex-col bg-[#f5f7ff]">
        <header className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] bg-white px-8 py-4">
          <div>
            <h1 className="text-xl font-bold text-[#0d1240]"> Positions</h1>
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
            {/* <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: "#1e3fb0" }}
              onClick={openCreateModal}
            >
              <Plus size={15} />
              Add Position
            </button> */}
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-6 p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#0d1240]">Open Positions</h2>
              <p className="text-sm text-[#6b7280]">{activeRolesCount} active roles</p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: "#1e3fb0" }}
              onClick={openCreateModal}
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
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search positions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-9 pr-4 text-sm text-[#374151] placeholder-[#9ca3af] outline-none focus:border-[#1e3fb0] focus:ring-1 focus:ring-[#1e3fb0]"
              />
            </div>

            <div className="relative">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="appearance-none rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#f9fafb] py-2 pl-3 pr-8 text-sm text-[#374151] outline-none focus:border-[#1e3fb0]"
              >
                <option>All Departments</option>
                {departments.map((departmentName) => (
                  <option key={departmentName}>{departmentName}</option>
                ))}
              </select>
              <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b7280]" />
            </div>

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

          {positionsContent}
        </main>
      </div>

      <PositionModal
        open={isModalOpen}
        isEditing={Boolean(editingPosition)}
        form={form}
        saving={saving}
        onClose={closeModal}
        onChange={handleFormChange}
        onSubmit={handleSave}
      />
    </>
  );
}
