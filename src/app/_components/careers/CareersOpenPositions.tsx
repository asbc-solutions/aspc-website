"use client";

import { use, useMemo, useState } from "react";
import FadeInSection from "@/app/_components/animation/FadeInSection";
import JobCard from "@/app/_components/careers/JobCard";
import type { JobPosition } from "@/app/api/jobs.api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function CareersOpenPositions({
  jobsPromise,
}: Readonly<{
  jobsPromise: Promise<JobPosition[]>;
}>) {
  const jobs = use(jobsPromise);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [tabsApi, setTabsApi] = useState<CarouselApi>();

  const departments = useMemo(() => {
    const unique = new Set(
      jobs
        .map((job) => job.department?.trim())
        .filter((department): department is string => Boolean(department)),
    );

    return ["All", ...Array.from(unique)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (selectedDepartment === "All") {
      return jobs;
    }

    return jobs.filter((job) => job.department === selectedDepartment);
  }, [jobs, selectedDepartment]);

  const handleDepartmentClick = (department: string, index: number) => {
    setSelectedDepartment(department);
    tabsApi?.scrollTo(index);
  };

  return (
    <FadeInSection>
      <div className="container mx-auto flex flex-col items-center justify-center gap-2">
        <div className="w-full max-w-4xl px-4">
          <Carousel
            setApi={setTabsApi}
            opts={{
              align: "start",
              dragFree: true,
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 p-0 px-0 items-center justify-center">
              {departments.map((department, index) => {
                const isActive = selectedDepartment === department;

                return (
                  <CarouselItem key={department} className="basis-auto pl-2">
                    <button
                      type="button"
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => handleDepartmentClick(department, index)}
                      className={`rounded-full px-5 py-2.5 text-sm font-medium leading-5 whitespace-nowrap transition-colors ${
                        isActive
                          ? "bg-[#0C409F] text-white shadow-[0px_4px_6px_-1px_rgba(12,64,159,0.2),0px_2px_4px_-2px_rgba(12,64,159,0.2)]"
                          : "border border-[#E5E7EB] bg-white text-[#6B7DB3]"
                      }`}
                    >
                      {department}
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

         
        </div>

        <div className="w-full px-4 py-12">
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {filteredJobs.length ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  department={job.department}
                  description={job.description}
                  location={job.work_type.label}
                  type={job.employment_type.label}
                />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">
                No open positions found for this department right now.
              </div>
            )}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
