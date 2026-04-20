"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

const SolutionCard = ({ icon: Icon, title, description, tags }: SolutionCardProps) => {
  return (
    <Card className="h-full rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-lg ring-1 ring-primary/10 dark:ring-blue-500/10">
      <CardContent className="flex flex-col gap-5 p-3 h-full">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-blue-900/40 text-primary dark:text-blue-400 shrink-0">
          <Icon className="size-6" />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-xl font-bold text-primary dark:text-blue-300 text-start">
            {title}
          </h3>
          <p className="text-sm text-primary/70 dark:text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 dark:bg-blue-900/40 px-3 py-1 text-xs font-semibold text-primary/50 dark:text-blue-300/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
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
