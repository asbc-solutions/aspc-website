import HeadingSection from "@/app/shared/HeadingSection";
import CountUp from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import portfolio from "@/app/assets/portfolio.jpeg";
import Wave from "react-wavify";
import PortfolioCard from "@/app/_components/portfolio/PortfolioCard";
import ReadyTo from "@/app/_components/home/ReadyTo";
import FadeInSection from "@/app/_components/animation/FadeInSection";

const page = () => {
  return (
    <>
      <HeadingSection
        textHeading="our work"
        paragraph="Explore case studies, delivered solutions, and client transformations"
      />
      <Wave
        fill="#1B2472"
        paused={false}
        style={{
          display: "flex",
          transform: "scaleY(-1)",
          transformOrigin: "center",
        }}
        options={{
          height: 100,
          amplitude: 25,
          speed: 0.15,
          points: 3,
        }}
      />

      <FadeInSection>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch justify-center">
          {/* Content Section */}
          <div className="bg-secondary-dark dark:bg-slate-900 text-white dark:text-slate-200 p-6 sm:p-8 lg:p-10 flex flex-col items-start justify-center gap-4 flex-1">
            {/* badge */}
            <span className="bg-primary dark:bg-blue-600 text-white dark:text-slate-100 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
              Featured Project
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl max-w-3xl font-bold leading-tight">
              Al-Rashid Retail ERP Transformation
            </h1>
            <span className="bg-secondary/20 dark:bg-blue-900/40 capitalize text-secondary dark:text-blue-300 px-3 py-1 rounded-full w-fit text-xs sm:text-sm font-medium">
              retail
            </span>

            {/* Challenge and Solution */}
            <div className="space-y-4 w-full">
              <div>
                <p className="uppercase text-secondary text-xs sm:text-sm font-semibold tracking-wide">
                  challenge
                </p>
                <p className="text-sm sm:text-base text-gray-100">
                  Legacy system integration across 50+ stores
                </p>
              </div>
              <div>
                <p className="uppercase text-secondary dark:text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">
                  Solution
                </p>
                <p className="text-sm sm:text-base text-gray-100 dark:text-slate-300">
                  Cloud-native ERP with real-time inventory
                </p>
              </div>
            </div>

            {/* results */}
            <div className="flex flex-col gap-3 items-start justify-center w-full">
              <p className="text-secondary dark:text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                Results
              </p>
              {/* Responsive Results Grid */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full flex-wrap">
                <div className="inline-flex items-center gap-1">
                  <CountUp
                    from={0}
                    to={40}
                    direction="up"
                    duration={1}
                    className="count-up-text text-2xl sm:text-3xl font-semibold text-white"
                    startWhen
                  />
                  <span className="text-2xl sm:text-3xl font-semibold text-white">
                    %
                  </span>
                </div>
                <div className="inline-flex items-center gap-1">
                  <CountUp
                    from={0}
                    to={99.9}
                    direction="up"
                    duration={1}
                    className="count-up-text text-2xl sm:text-3xl font-semibold text-white"
                    startWhen
                  />
                  <span className="text-2xl sm:text-3xl font-semibold text-white">
                    %
                  </span>
                </div>
                <div className="inline-flex items-center gap-1">
                  <CountUp
                    from={0}
                    to={200}
                    direction="up"
                    duration={1}
                    className="count-up-text text-2xl sm:text-3xl font-semibold text-white"
                    startWhen
                  />
                  <span className="text-2xl sm:text-3xl font-semibold text-white">
                    %
                  </span>
                </div>
              </div>
            </div>

            <Button className="bg-white dark:bg-blue-600 text-primary dark:text-white hover:bg-gray-100 dark:hover:bg-blue-700 rounded-full mt-2 text-sm sm:text-base font-semibold">
              Read Full Case Study <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

            {/* Image Section */}
            <div className="relative w-full lg:w-auto lg:flex-1 h-64 sm:h-80 lg:h-auto overflow-hidden">
              <Image
                src={portfolio}
                alt="portfolio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="flex flex-col items-center justify-center gap-3 text-center py-10">
          <h1 className="text-3xl font-bold max-w-3xl dark:text-white">
            Case Studies
          </h1>
          <p className="uppercase text-primary dark:text-blue-400 text-xs font-bold">
            Explore our success stories across various industries
          </p>
        </div>
      </FadeInSection>
      <FadeInSection>
        <div className="container mx-auto px-4 md:px-8 pb-10">
          {/* card */}
          <PortfolioCard />
        </div>
      </FadeInSection>

      <FadeInSection>
        <ReadyTo
          heading="Have a Project in Mind?"
          paragraph="Let's discuss how we can help you achieve your goals. Contact us today for a
          free consultation."
          btnTextOne="Start Your Project "
          btnTextTwo="Explore Our Services"
          className="py-20"
          LinkOne="contact-us"
          LinkTwo="services"
        />
      </FadeInSection>
    </>
  );
};

export default page;
