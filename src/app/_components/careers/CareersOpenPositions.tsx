import { use } from "react";
import FadeInSection from "@/app/_components/animation/FadeInSection";
import JobCard from "@/app/_components/careers/JobCard";
import type { JobPosition } from "@/app/api/jobs.api";

export default function CareersOpenPositions({
  jobsPromise,
}: Readonly<{
  jobsPromise: Promise<JobPosition[]>;
}>) {
  const jobs = use(jobsPromise);
  // console.log(jobs);

  return (
    <FadeInSection>
      <div className="container mx-auto flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center gap-3 text-center py-10">
          <h1 className="text-3xl font-bold max-w-3xl dark:text-white flex items-center gap-3">
            Open Positions{" "}
            <span className="py-2 px-4 text-sm border bg-primary dark:bg-blue-600 rounded-lg text-white dark:text-slate-100 flex justify-center items-center">
              {jobs.length}
            </span>
          </h1>
          <p className="uppercase text-primary dark:text-blue-400 text-xs font-bold">
            Find your next career opportunity with ASPC
          </p>
        </div>
        <div className="w-full px-4 py-12">
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                department={job.department}
                description={job.description}
                location={job.work_type.label}
                type={job.employment_type.label}
              />
            ))}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
