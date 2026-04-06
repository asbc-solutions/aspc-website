import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2 } from "lucide-react";

const SolutionCard = () => {
  return (
    <Card className="max-w-md rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-lg ring-primary/10 dark:ring-blue-500/10">
      <CardContent className="space-y-5 p-3 items-start ">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-blue-900/40 text-primary dark:text-blue-400">
          <Building2 className="size-6" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-primary dark:text-blue-300 text-start">
            ASPC ERP Suite
          </h3>
          <p className="text-sm text-primary/70 dark:text-slate-300">
            Enterprise resource planning for Arab businesses
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-primary/50 dark:text-blue-300/70">
            Enterprise
          </span>
          <span className="rounded-full bg-primary/10 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-primary/50 dark:text-blue-300/70">
            Bilingual
          </span>
          <span className="rounded-full bg-primary/10 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-primary/50 dark:text-blue-300/70">
            Cloud-Ready
          </span>
        </div>

        <div className="flex items-center justify-around gap-2">
          <Button
            variant="link"
            className="px-0 text-primary dark:text-blue-400 dark:hover:text-blue-300"
          >
            Learn More
          </Button>
          <Button className="rounded-lg px-4 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700">
            Request Demo
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolutionCard;
