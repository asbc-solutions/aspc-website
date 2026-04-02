import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import features from "@/app/assets/features.png";
import FeatureColumns from "./FeatureColumns";

const FeaturedSolution = () => {
  return (
    <div className="bg-[#0D1240] text-white flex items-center justify-center gap-20 py-20 px-10 flex-col lg:flex-row">
      <div className="flex flex-col gap-5">
        <p className="uppercase text-xs">Featured Solution</p>
        <h1 className="text-4xl font-bold line-clamp-2">
          Enterprise Resource Planning,{" "}
          <span className="text-blue-500">Reimagined</span>
        </h1>
        <p className="text-secondary line-clamp-3">
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
      <Image src={features} alt="Featured Solution" className="w-200" />
    </div>
  );
};

export default FeaturedSolution;
