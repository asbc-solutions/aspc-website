import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface JobCardProps {
  title: string;
  department: string;
  description: string;
  location: "Onsite" | "Remote" | "Hybrid";
  type: "Full-time" | "Part-time";
}

const JobCard = ({
  title,
  department,
  description,
  location,
  type,
}: JobCardProps) => {
  return (
    <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4 bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <h3 className="text-lg md:text-xl font-bold dark:text-white">
            {title}
          </h3>
          <span className="px-2 py-0.5 text-sm bg-secondary dark:bg-blue-900 text-primary dark:text-blue-200 rounded-full w-fit">
            {department}
          </span>
        </div>
        <Link href={`/careers/apply`}>
          <Button className="flex items-center whitespace-nowrap rounded-full dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700">
            Apply now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Footer - Job Details */}
      <div className="flex flex-wrap gap-4 pt-4  ">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
          <MapPin className="w-4 h-4 text-primary dark:text-blue-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
          <Briefcase className="w-4 h-4 text-primary dark:text-blue-400" />
          <span>{type}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default JobCard;
