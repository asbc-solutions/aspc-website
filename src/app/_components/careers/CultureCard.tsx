import { LucideIcon } from "lucide-react";

interface CultureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CultureCard = ({ icon: Icon, title, description }: CultureCardProps) => {
  return (
    <div className="flex flex-col bg-main dark:bg-slate-800 items-center justify-start gap-4 text-center p-6 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300">
      <Icon className="w-8 h-8 text-primary dark:text-blue-400" />
      <h3 className="text-xl font-bold dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default CultureCard;
