import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  id: number;
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
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <h3 className="text-lg md:text-xl font-bold">{title}</h3>
          <span className="px-2 py-0.5 text-sm bg-secondary text-primary rounded-full w-fit">
            {department}
          </span>
        </div>
        <Button className="flex items-center whitespace-nowrap rounded-full">
          Apply now <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Footer - Job Details */}
      <div className="flex flex-wrap gap-4 pt-4  ">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Briefcase className="w-4 h-4 text-primary" />
          <span>{type}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default JobCard;
