import { Button } from "@/components/ui/button";
import FloatingLines from "@/components/FloatingLines";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-red-300">
      {/* <div className="absolute inset-0">
        <FloatingLines
          enabledWaves={["top", "bottom", "middle"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={5}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="normal"
        />
      </div> */}

      <div className="relative">
        <div className="text-white flex min-h-screen flex-col items-center justify-center gap-4 px-4 pt-24 pb-10 text-center sm:gap-5 sm:px-6 sm:pt-28 lg:px-8">
          <Button className="group uppercase flex items-center justify-center gap-2 rounded-full border md:p-5 border-white/30 bg-white/10 dark:bg-black/10  text-xs font-medium text-primary-foreground backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/15 hover:border-white/45 px-5 py-2.5 sm:text-sm">
            <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-secondary dark:text-indigo-600" />
            <span>Software Solutions</span>
          </Button>
          <h1 className="max-w-md text-3xl font-bold leading-tight  sm:max-w-3xl sm:text-5xl lg:max-w-4xl lg:text-7xl">
            Transforming Ideas Into Enterprise Solutions
          </h1>
          <p className="max-w-sm px-2 text-sm font-normal text-secondary dark:text-white sm:max-w-2xl sm:text-base">
            We build scalable software ecosystems that empower businesses across
            the Arab world to thrive in the digital age.
          </p>
          <div className="flex w-full flex-col items-center gap-3 px-4 sm:w-auto sm:flex-row sm:gap-5 sm:px-0">
            <Button className="flex w-full items-center justify-center gap-2 rounded-full bg-white dark:bg-black/10 dark:text-white dark:border-white/30  p-5 font-semibold text-black sm:w-auto">
              Start Your Project <ArrowRight />
            </Button>
            <Button className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 dark:bg-white  p-5 font-semibold dark:text-black sm:w-auto">
              Explore Solutions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
