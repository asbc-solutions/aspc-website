"use client";

import {
  ArrowLeft,
  GripVertical,
  List,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldChoice = {
  id?: number;
  label: string;
  sort_order: number;
};

type FormField = {
  id: number;
  position_id: number;
  label: string;
  type: { value: number; label: string };
  is_required: boolean;
  sort_order: number;
  choices: { id: number; label: string; sort_order: number }[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const FIELD_TYPES = [
  { value: 1, label: "Text" },
  { value: 2, label: "Textarea" },
  { value: 3, label: "Number" },
  { value: 4, label: "Radio" },
  { value: 6, label: "Multi Choice" },
];

const TYPE_BADGE: Record<number, { bg: string; text: string }> = {
  1: { bg: "#eff6ff", text: "#1d4ed8" },
  2: { bg: "#f0fdf4", text: "#15803d" },
  3: { bg: "#fef9c3", text: "#854d0e" },
  4: { bg: "#fdf4ff", text: "#7e22ce" },
  6: { bg: "#fff7ed", text: "#c2410c" },
};

// ─── Schema ───────────────────────────────────────────────────────────────────

const fieldSchema = z.object({
  label: z.string().min(1, "Label is required"),
  type: z.coerce.number().int().min(1),
  is_required: z.boolean(),
  sort_order: z.coerce.number().int().min(1),
});

type FieldFormValues = z.infer<typeof fieldSchema>;

// ─── Utility ──────────────────────────────────────────────────────────────────

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

// ─── Field Modal ──────────────────────────────────────────────────────────────

function FieldModal({
  open,
  field,
  positionId,
  onClose,
  onSuccess,
}: Readonly<{
  open: boolean;
  field: FormField | null;
  positionId: string;
  onClose: () => void;
  onSuccess: () => void;
}>) {
  const isEditing = field !== null;
  const [choices, setChoices] = useState<FieldChoice[]>([]);
  const [choiceError, setChoiceError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FieldFormValues>({
    resolver: zodResolver(fieldSchema) as Resolver<FieldFormValues>,
    defaultValues: { label: "", type: 1, is_required: true, sort_order: 1 },
  });

  const typeValue = Number(watch("type"));
  const needsChoices = typeValue === 4 || typeValue === 6;

  useEffect(() => {
    if (!open) return;
    if (field) {
      reset({
        label: field.label,
        type: field.type.value,
        is_required: field.is_required,
        sort_order: field.sort_order,
      });
      setChoices(
        field.choices.map((c) => ({
          id: c.id,
          label: c.label,
          sort_order: c.sort_order,
        })),
      );
    } else {
      reset({ label: "", type: 1, is_required: true, sort_order: 1 });
      setChoices([]);
    }
    setChoiceError("");
  }, [open, field, reset]);

  const addChoice = () =>
    setChoices((prev) => [
      ...prev,
      { label: "", sort_order: prev.length + 1 },
    ]);

  const updateChoice = (index: number, label: string) =>
    setChoices((prev) =>
      prev.map((c, i) => (i === index ? { ...c, label } : c)),
    );

  const removeChoice = (index: number) =>
    setChoices((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((c, i) => ({ ...c, sort_order: i + 1 })),
    );

  const onSubmit = async (data: FieldFormValues) => {
    if (
      needsChoices &&
      choices.filter((c) => c.label.trim()).length === 0
    ) {
      setChoiceError("Add at least one choice for this field type.");
      return;
    }
    setChoiceError("");

    const body = {
      ...data,
      choices: needsChoices
        ? choices
            .filter((c) => c.label.trim())
            .map((c, i) => ({
              ...(c.id !== undefined ? { id: c.id } : {}),
              label: c.label.trim(),
              sort_order: i + 1,
            }))
        : [],
    };

    try {
      const endpoint = isEditing
        ? `/api/admin/careers/positions/${positionId}/fields/${field.id}`
        : `/api/admin/careers/positions/${positionId}/fields`;
      const res = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        setError("root", {
          message:
            isRecord(payload) && typeof payload.message === "string"
              ? payload.message
              : "Failed to save field.",
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

  const inputClass =
    "rounded-lg border border-[rgba(0,0,0,0.12)] px-3 py-2 text-sm outline-none focus:border-[#1e3fb0]";
  const selectClass =
    "rounded-lg border border-[rgba(0,0,0,0.12)] bg-white px-3 py-2 text-sm outline-none focus:border-[#1e3fb0]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[rgba(0,0,0,0.08)] px-6 py-4">
          <h3 className="text-lg font-semibold text-[#0d1240]">
            {isEditing ? "Edit Field" : "Add Field"}
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-4 px-6 py-5 sm:grid-cols-2">
              {errors.root?.message && (
                <div className="col-span-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                  {errors.root.message}
                </div>
              )}

              <label className="col-span-full flex flex-col gap-1.5 text-sm text-[#374151]">
                <span>Label</span>
                <input
                  {...register("label")}
                  className={inputClass}
                  placeholder="e.g. Full Name"
                />
                {errors.label && (
                  <span className="text-xs text-red-600">
                    {errors.label.message}
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1.5 text-sm text-[#374151]">
                <span>Type</span>
                <select {...register("type")} className={selectClass}>
                  {FIELD_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm text-[#374151]">
                <span>Sort Order</span>
                <input
                  type="number"
                  {...register("sort_order")}
                  min={1}
                  className={inputClass}
                />
              </label>

              <label className="col-span-full flex cursor-pointer items-center gap-3 text-sm text-[#374151]">
                <input
                  type="checkbox"
                  {...register("is_required")}
                  className="h-4 w-4 rounded border-[#d6e6ff] accent-[#1e3fb0]"
                />
                <span>Required field</span>
              </label>

              {needsChoices && (
                <div className="col-span-full flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#374151]">
                      Choices
                    </span>
                    <button
                      type="button"
                      onClick={addChoice}
                      className="flex items-center gap-1 text-xs font-semibold text-[#1e3fb0] hover:underline"
                    >
                      <Plus size={13} />
                      Add Choice
                    </button>
                  </div>
                  {choices.length === 0 && (
                    <p className="rounded-lg border border-dashed border-[rgba(0,0,0,0.12)] py-3 text-center text-xs text-[#9ca3af]">
                      No choices yet. Click &quot;Add Choice&quot; to start.
                    </p>
                  )}
                  {choices.map((choice, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <GripVertical
                        size={14}
                        className="shrink-0 text-[#9ca3af]"
                      />
                      <input
                        value={choice.label}
                        onChange={(e) => updateChoice(index, e.target.value)}
                        className={`flex-1 ${inputClass}`}
                        placeholder={`Choice ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeChoice(index)}
                        className="shrink-0 text-[#9ca3af] hover:text-red-500"
                        aria-label="Remove choice"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {choiceError && (
                    <span className="text-xs text-red-600">{choiceError}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-[rgba(0,0,0,0.08)] px-6 py-4">
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
                "Add Field"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Field Row Skeleton ───────────────────────────────────────────────────────

function FieldRowSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-4 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white px-4 py-3 shadow-sm">
      <Skeleton className="h-5 w-8 rounded" />
      <Skeleton className="h-4 flex-1 rounded" />
      <Skeleton className="h-5 w-20 rounded-full" />
      <Skeleton className="h-5 w-12 rounded-full" />
      <div className="ml-auto flex gap-3">
        <Skeleton className="h-3.5 w-3.5 rounded" />
        <Skeleton className="h-3.5 w-3.5 rounded" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PositionFieldsPage() {
  const { positionId } = useParams<{ positionId: string }>();

  const [positionTitle, setPositionTitle] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalField, setModalField] = useState<FormField | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fieldToDelete, setFieldToDelete] = useState<FormField | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const loadFields = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/admin/careers/positions/${positionId}/fields`,
        { cache: "no-store" },
      );
      const payload: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          isRecord(payload) && typeof payload.message === "string"
            ? payload.message
            : "Failed to load fields.",
        );
      }
      const list: unknown[] = isRecord(payload) && Array.isArray(payload.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : [];
      setFields(list as FormField[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load fields.");
      setFields([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPositionTitle = async () => {
    try {
      const res = await fetch("/api/admin/careers/positions", {
        cache: "no-store",
      });
      const payload: unknown = await res.json().catch(() => null);
      const list: unknown[] =
        isRecord(payload) && Array.isArray(payload.data) ? payload.data : [];
      const found = list.find(
        (p) => isRecord(p) && String(p.id) === String(positionId),
      );
      if (isRecord(found) && typeof found.title === "string") {
        setPositionTitle(found.title);
      }
    } catch { /* silent */ }
  };

  useEffect(() => {
    if (!positionId) return;
    void Promise.all([loadFields(), loadPositionTitle()]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionId]);

  const handleConfirmDelete = async () => {
    if (!fieldToDelete) return;
    setDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch(
        `/api/admin/careers/positions/${positionId}/fields/${fieldToDelete.id}`,
        { method: "DELETE" },
      );
      const payload: unknown = await res.json().catch(() => null);
      if (!res.ok) {
        setDeleteError(
          isRecord(payload) && typeof payload.message === "string"
            ? payload.message
            : "Failed to delete field.",
        );
        return;
      }
      setFieldToDelete(null);
      await loadFields();
    } catch {
      setDeleteError("Could not reach the server.");
    } finally {
      setDeleting(false);
    }
  };

  const sorted = [...fields].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <>
      <div className="flex flex-1 flex-col bg-[#f5f7ff]">
        <AdminPageHeader
          title={
            positionTitle
              ? `Form Fields — ${positionTitle}`
              : "Form Fields"
          }
        />

        <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
          {/* Top bar */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/positions"
                className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#0d1240]"
              >
                <ArrowLeft size={15} />
                Back to Positions
              </Link>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: "#1e3fb0" }}
              onClick={() => {
                setModalField(null);
                setIsModalOpen(true);
              }}
            >
              <Plus size={15} />
              Add Field
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Field list */}
          <div className="flex flex-col gap-3">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <FieldRowSkeleton key={i} />
              ))
            ) : sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[rgba(0,0,0,0.1)] bg-white py-16 text-center shadow-sm">
                <List size={32} className="text-[#cbd5e1]" />
                <p className="text-sm font-medium text-[#6b7280]">
                  No fields yet. Click &quot;Add Field&quot; to start.
                </p>
              </div>
            ) : (
              sorted.map((field) => {
                const badge = TYPE_BADGE[field.type.value] ?? {
                  bg: "#f1f5f9",
                  text: "#475569",
                };
                return (
                  <div
                    key={field.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white px-4 py-3 shadow-sm"
                  >
                    <span className="w-6 shrink-0 text-center text-xs font-bold text-[#9ca3af]">
                      {field.sort_order}
                    </span>

                    <span className="flex-1 text-sm font-semibold text-[#0d1240]">
                      {field.label}
                      {field.is_required && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                    </span>

                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: badge.bg,
                        color: badge.text,
                      }}
                    >
                      {field.type.label}
                    </span>

                    {field.choices.length > 0 && (
                      <span className="hidden text-xs text-[#9ca3af] sm:inline">
                        {field.choices.length} choices
                      </span>
                    )}

                    <div className="ml-auto flex items-center gap-3 text-[#9ca3af]">
                      <button
                        type="button"
                        className="hover:text-[#6b7280]"
                        aria-label="Edit field"
                        onClick={() => {
                          setModalField(field);
                          setIsModalOpen(true);
                        }}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        className="hover:text-red-500"
                        aria-label="Delete field"
                        onClick={() => {
                          setDeleteError("");
                          setFieldToDelete(field);
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>

      <FieldModal
        open={isModalOpen}
        field={modalField}
        positionId={positionId}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => void loadFields()}
      />

      {fieldToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => {
            if (!deleting) setFieldToDelete(null);
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0d1240]">
                Delete field
              </h3>
              <button
                type="button"
                onClick={() => setFieldToDelete(null)}
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
                &quot;{fieldToDelete.label}&quot;
              </span>
              ? This action cannot be undone.
            </p>
            {deleteError && (
              <p className="mt-2 text-sm text-red-600">{deleteError}</p>
            )}
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setFieldToDelete(null)}
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
