import HeadingSection from "@/app/shared/HeadingSection";
import CultureCard from "@/app/_components/careers/CultureCard";
import CareersOpenPositions from "@/app/_components/careers/CareersOpenPositions";
import { Rocket, Users, BookOpen } from "lucide-react";
import Wave from "react-wavify";
import ReadyTo from "@/app/_components/home/ReadyTo";
import FadeInSection from "@/app/_components/animation/FadeInSection";
import { Suspense } from "react";
import { getJobsData } from "@/app/api/jobs.api";
import { Spinner } from "@/components/ui/spinner";

const cultureData = [
  {
    id: 1,
    icon: Rocket,
    title: "Growth-Focused Environment",
    description:
      "Continuous learning, mentorship programs, and clear career development paths to help you reach your full potential.",
  },
  {
    id: 2,
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Work alongside talented individuals who are passionate about making an impact in the Arab digital landscape.",
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Inclusive & Empowering",
    description:
      "We believe in creating an environment where every voice matters and innovation thrives through diversity.",
  },
];

const Page = () => {
  const jobsPromise = getJobsData().then((jobs) => {
    return jobs;
  });

  return (
    <>
      <HeadingSection
        textHeading="Join the Beacon"
        paragraph="We're building the infrastructure of the Arab digital future. Come build with us."
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
        <div className="flex flex-col items-center justify-center gap-3 text-center py-10">
          <p className="uppercase text-primary dark:text-blue-400 text-xs font-bold">
            Why Work With Us
          </p>
          <h1 className="text-3xl font-bold max-w-3xl dark:text-white">
            Our Culture
          </h1>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {cultureData.map((item) => (
              <CultureCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="flex flex-col items-center justify-center gap-3 text-center py-10">
          <h1 className="text-3xl font-bold max-w-3xl dark:text-white">
            Open Positions 
          </h1>
          <p className="uppercase text-primary dark:text-blue-400 text-xs font-bold">
            Find your next career opportunity with ASPC
          </p>
        </div>
      </FadeInSection>

      <Suspense
        fallback={
          <FadeInSection>
            <div className="container mx-auto flex flex-col items-center justify-center gap-2 py-20 text-center text-muted-foreground">
              <Spinner className="size-12 " />
            </div>
          </FadeInSection>
        }
      >
        <CareersOpenPositions jobsPromise={jobsPromise} />
      </Suspense>

      <FadeInSection>
        <ReadyTo
          heading="Don't See a Role That Fits?"
          paragraph="We're always looking for talented individuals. Send us your resume and we'll keep you in mind for futur opportunities."
          btnTextOne="Send Your Resume"
          className="py-20"
        />
      </FadeInSection>
    </>
  );
};

export default Page;
