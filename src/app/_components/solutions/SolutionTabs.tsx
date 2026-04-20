"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Building2,
  Users,
  Shield,
  Cloud,
  BarChart3,
  Lock,
  type LucideIcon,
} from "lucide-react";
import SolutionCard from "./SolutionCard";

interface Solution {
  id: string;
  category: "erp" | "crm" | "cyber-security" | "cloud";
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

const solutions: Solution[] = [
  {
    id: "erp-suite",
    category: "erp",
    icon: Building2,
    title: "ASPC ERP Suite",
    description:
      "Enterprise resource planning for Arab businesses, integrating finance, HR, supply chain, and operations into one intelligent platform.",
    tags: ["Enterprise", "Bilingual", "Cloud-Ready"],
  },
  {
    id: "hr-connect",
    category: "erp",
    icon: Users,
    title: "HRConnect ERP",
    description:
      "Streamline human resources management with automated payroll, attendance tracking, and employee lifecycle workflows.",
    tags: ["HR", "Payroll", "Automation"],
  },
  {
    id: "crm-platform",
    category: "crm",
    icon: BarChart3,
    title: "ASPC CRM Platform",
    description:
      "Centralize your customer relationships and accelerate sales pipelines with AI-driven insights and multi-channel communication.",
    tags: ["Sales", "Analytics", "Multi-Channel"],
  },
  {
    id: "customer-insights",
    category: "crm",
    icon: Users,
    title: "Customer Insights CRM",
    description:
      "Deep behavioral analytics and segmentation tools to help you understand, retain, and grow your customer base.",
    tags: ["Insights", "Segmentation", "Retention"],
  },
  {
    id: "secure-shield",
    category: "cyber-security",
    icon: Shield,
    title: "SecureShield",
    description:
      "End-to-end cybersecurity platform covering threat detection, vulnerability management, and compliance reporting.",
    tags: ["Threat Detection", "Compliance", "24/7 SOC"],
  },
  {
    id: "threat-detect",
    category: "cyber-security",
    icon: Lock,
    title: "ThreatDetect Pro",
    description:
      "Real-time intrusion detection and automated incident response powered by machine learning and behavioral analysis.",
    tags: ["AI-Powered", "Real-Time", "SIEM"],
  },
  {
    id: "cloud-ops",
    category: "cloud",
    icon: Cloud,
    title: "CloudOps Platform",
    description:
      "Manage your entire cloud infrastructure from a single pane of glass with cost optimization, auto-scaling, and DevOps pipelines.",
    tags: ["Multi-Cloud", "DevOps", "Cost Optimization"],
  },
  {
    id: "hybrid-cloud",
    category: "cloud",
    icon: BarChart3,
    title: "Hybrid Cloud Manager",
    description:
      "Seamlessly bridge on-premises and cloud workloads with unified governance, security, and performance monitoring.",
    tags: ["Hybrid", "Governance", "Migration"],
  },
];

const TAB_TRIGGER_CLASS =
  "rounded-full bg-white dark:bg-slate-700 px-3 md:px-5 py-2 text-xs md:text-sm text-primary dark:text-slate-300 cursor-pointer transition-colors hover:bg-primary hover:text-white dark:hover:bg-blue-600 dark:hover:text-white data-[state=active]:bg-primary dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:text-white whitespace-nowrap";

function SolutionCarousel({ items }: { items: Solution[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((solution) => (
            <CarouselItem
              key={solution.id}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <SolutionCard
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                tags={solution.tags}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows — outside the overflow container */}
        <div className="flex items-center justify-between mt-6 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={current === 0}
              className="size-9 rounded-full border border-primary/20 dark:border-blue-500/30 flex items-center justify-center text-primary dark:text-blue-400 transition hover:bg-primary hover:text-white dark:hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => api?.scrollNext()}
              disabled={current === count - 1}
              className="size-9 rounded-full border border-primary/20 dark:border-blue-500/30 flex items-center justify-center text-primary dark:text-blue-400 transition hover:bg-primary hover:text-white dark:hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-5 h-2 bg-primary dark:bg-blue-500"
                    : "size-2 bg-primary/20 dark:bg-blue-500/30 hover:bg-primary/40 dark:hover:bg-blue-500/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
}

const SolutionTabs = () => {
  const allSolutions = solutions;
  const byCat = (cat: Solution["category"]) =>
    solutions.filter((s) => s.category === cat);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
      <Tabs defaultValue="all" className="w-full flex flex-col items-start gap-6">
        <TabsList className="h-auto rounded-full bg-white dark:bg-slate-800 p-2 gap-2 md:gap-3 flex flex-nowrap overflow-x-auto scrollbar-none shadow-sm w-full">
          <TabsTrigger value="all" className={TAB_TRIGGER_CLASS}>
            All
          </TabsTrigger>
          <TabsTrigger value="erp" className={TAB_TRIGGER_CLASS}>
            ERP
          </TabsTrigger>
          <TabsTrigger value="crm" className={TAB_TRIGGER_CLASS}>
            CRM
          </TabsTrigger>
          <TabsTrigger value="cyber-security" className={TAB_TRIGGER_CLASS}>
            Cyber Security
          </TabsTrigger>
          <TabsTrigger value="cloud" className={TAB_TRIGGER_CLASS}>
            Cloud
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="w-full mt-0">
          <SolutionCarousel items={allSolutions} />
        </TabsContent>
        <TabsContent value="erp" className="w-full mt-0">
          <SolutionCarousel items={byCat("erp")} />
        </TabsContent>
        <TabsContent value="crm" className="w-full mt-0">
          <SolutionCarousel items={byCat("crm")} />
        </TabsContent>
        <TabsContent value="cyber-security" className="w-full mt-0">
          <SolutionCarousel items={byCat("cyber-security")} />
        </TabsContent>
        <TabsContent value="cloud" className="w-full mt-0">
          <SolutionCarousel items={byCat("cloud")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SolutionTabs;
