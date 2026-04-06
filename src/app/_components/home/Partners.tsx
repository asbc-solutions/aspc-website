/* eslint-disable react/no-unescaped-entities */
import { Quote } from "lucide-react";
import PartnerCarousel from "./PartnerCarousel";

const Partners = () => {
  return (
    <div className=" bg-main dark:bg-slate-950 px-5 py-20 ">
      <div className="container mx-auto flex flex-col items-center justify-center gap-3 text-center">
        <p className="uppercase text-primary dark:text-blue-400 text-xs font-bold">
          Trusted By Industry Leaders
        </p>
        <h1 className="text-4xl text-primary-dark dark:text-white font-bold max-w-2xl ">
          Our Partners & Clients
        </h1>
      </div>
      <PartnerCarousel />
      <div className="mx-auto mt-14 w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl dark:shadow-slate-900/50 md:p-12">
        <div className="relative">
          <Quote className="absolute top-0 -left-5 md:-left-10 md:-top-2 w-7 h-7 md:h-10 md:w-10 text-primary/20 dark:text-blue-500/20" />
          <p className="text-base leading-8 text-primary-dark/90 dark:text-slate-200 md:text-lg">
            "ASPC transformed our entire IT infrastructure in record time. Their
            team's expertise and dedication to understanding our unique needs
            made all the difference. We've seen a 40% improvement in operational
            efficiency since implementing their solutions."
          </p>
        </div>
        <div className="mt-8 flex items-center justify-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary dark:bg-blue-600 text-2xl text-white">
            MA
          </div>
          <div>
            <p className="font-semibold text-primary-dark dark:text-white">
              Mohammed Al-Qahtani
            </p>
            <p className="text-sm text-primary/70 dark:text-slate-400">
              CTO, Al Rashid Group
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
