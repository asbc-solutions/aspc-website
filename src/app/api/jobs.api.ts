export type JobPosition = {
  id: number;
  title: string;
  department: string;
  work_type: { value: number; label: string };
  employment_type: { value: number; label: string };
  status: { value: number; label: string };
  experience: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export const getJobsData = async (): Promise<JobPosition[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/careers/positions`,
    );
    const payload = await res.json();
    return payload.data;
  } catch {
    return [];
  }
};
