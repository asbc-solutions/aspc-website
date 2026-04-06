import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const ReadyTo = ({
  heading,
  paragraph,
  btnTextOne,
  btnTextTwo,
  className = "",
}: {
  heading: string;
  paragraph: string;
  btnTextOne: string;
  btnTextTwo?: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 md:gap-7 bg-[linear-gradient(103.09deg,#0C409F_0%,#2845B5_50%,#4A6FFF_100%)] dark:bg-[linear-gradient(103.09deg,#0a2966_0%,#1a3a8a_50%,#1e40af_100%)] px-4 py-12 md:py-16 ${className}`}
    >
      <h1 className="text-3xl md:text-5xl text-white dark:text-slate-50 font-bold leading-tight text-center max-w-2xl">
        {heading}
      </h1>
      <p className="text-white/80 dark:text-slate-300 font-normal text-base md:text-lg text-center max-w-2xl leading-relaxed">
        {paragraph}
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 w-full md:w-auto">
        <Button className="flex items-center rounded-full gap-2 bg-white dark:bg-slate-100 text-primary dark:text-blue-900 font-semibold px-6 py-3 md:p-5 w-full md:w-auto justify-center hover:bg-slate-50 dark:hover:bg-slate-200">
          {btnTextOne}
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
        </Button>
        {btnTextTwo && (
          <Button
            className={`flex items-center rounded-full gap-2 bg-transparent dark:bg-transparent text-white dark:text-slate-100 px-6 py-3 md:p-5 border border-white/30 dark:border-slate-400/30 font-semibold w-full md:w-auto justify-center hover:bg-white/10 dark:hover:bg-slate-700/30`}
          >
            {btnTextTwo}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReadyTo;
