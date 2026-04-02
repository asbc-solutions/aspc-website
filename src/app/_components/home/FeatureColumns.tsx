import { ChartBar, Shield, Users, Zap } from "lucide-react";

const featureColumnsArr = [
  [
    { icon: ChartBar, label: "Real-time Analytics" },
    { icon: Zap, label: "Workflow Automation" },
  ],
  [
    { icon: Users, label: "Team Collaboration" },
    { icon: Shield, label: "Enterprise Security" },
  ],
];
const FeatureColumns = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
      {featureColumnsArr.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className="flex flex-col gap-3 sm:gap-4 flex-1 min-w-0"
        >
          {column.map((item) => {
            const Icon = item.icon;

            return (
              <p
                key={item.label}
                className="flex items-center gap-3 font-medium text-[#EAF5FF]"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
                  <Icon className="h-4 w-4" />
                </span>
                <span>{item.label}</span>
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FeatureColumns;
