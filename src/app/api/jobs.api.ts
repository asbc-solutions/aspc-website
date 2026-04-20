export type JobPosition = {
  id: number;
  title: string;
  department: string;
  work_type: { value: number; label: string };
  employment_type: { value: number; label: string };
  status: { value: number; label: string };
  experience: string;
  description: string;
  applications_count?: number;
  created_at: string;
  updated_at: string;
};

export type JobPositionFieldChoice = {
  id: number;
  label: string;
  sort_order: number;
};

export type JobPositionField = {
  id: number;
  position_id: number;
  label: string;
  type: { value: number; label: string };
  is_required: boolean;
  sort_order: number;
  choices: JobPositionFieldChoice[];
};

export type JobPositionDetails = JobPosition & {
  form_fields: JobPositionField[];
};

type ApiResponse<TData> = {
  status: boolean;
  message: string;
  data: TData;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isJobPositionDetails = (value: unknown): value is JobPositionDetails => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.department === "string" &&
    isRecord(value.work_type) &&
    typeof value.work_type.label === "string" &&
    isRecord(value.employment_type) &&
    typeof value.employment_type.label === "string" &&
    Array.isArray(value.form_fields)
  );
};

export type CareerApplicationAnswerInput = {
  form_field_id: number;
  value: string | number | boolean | string[];
};

export type SubmitPositionApplicationPayload = {
  answers: CareerApplicationAnswerInput[];
};

export type SubmittedPositionApplicationAnswer = {
  form_field_id: number;
  form_field_label: string;
  value: string | number | boolean | string[];
};

export type SubmitPositionApplicationResult = {
  id: number;
  position_id: number;
  position: JobPosition;
  status: { value: number; label: string };
  answers: SubmittedPositionApplicationAnswer[];
  created_at: string;
  updated_at: string;
};

export const getJobsData = async (): Promise<JobPosition[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/careers/positions`,
    );
    const payload: ApiResponse<JobPosition[]> = await res.json();
    return payload.data;
  } catch {
    return [];
  }
};

export const getJobPositionById = async (
  id: number | string,
): Promise<JobPositionDetails | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/careers/positions/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return null;
    }

    const payload: unknown = await res.json();

    if (isRecord(payload) && isJobPositionDetails(payload.data)) {
      return payload.data;
    }

    if (isJobPositionDetails(payload)) {
      return payload;
    }

    return null;
  } catch {
    return null;
  }
};

export const submitPositionApplication = async (
  positionId: number | string,
  body: SubmitPositionApplicationPayload,
): Promise<ApiResponse<SubmitPositionApplicationResult>> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/careers/positions/${positionId}/apply`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to submit application.");
  }

  return res.json();
};
