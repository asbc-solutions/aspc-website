import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import features from "@/app/assets/features.png";
import FeatureColumns from "./FeatureColumns";

const FeaturedSolution = () => {
  return (
    <div className="bg-[#0D1240] dark:bg-slate-900 text-white py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-5 w-full lg:flex-1">
          <p className="uppercase text-xs dark:text-blue-300">
            Featured Solution
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Enterprise Resource Planning,{" "}
            <span className="text-blue-500 dark:text-blue-400">Reimagined</span>
          </h1>
          <p className="text-secondary dark:text-slate-300">
            Our flagship ERP solution integrates all facets of your business
            operations into a single, intelligent platform. From finance and HR to
            supply chain and customer relations, experience seamless workflow
            automation like never before.
          </p>
          <FeatureColumns />
          <Button className="w-fit rounded-full py-5 px-3">
            Request Demo <ArrowRight />
          </Button>
        </div>
        <div className="w-full flex justify-center lg:flex-1">
          <Image
            src={features}
            alt="Featured Solution"
            className="w-full max-w-sm sm:max-w-md lg:max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedSolution;
