import OurStory from "@/app/_components/about/OurStory";
import OurVision from "@/app/_components/about/OurVision";
import FadeInSection from "@/app/_components/animation/FadeInSection";
import SocialMedia from "@/app/_components/event/SocialMedia";
import HeadingSection from "@/app/shared/HeadingSection";
import { Lightbulb, Target } from "lucide-react";
import Wave from "react-wavify";

const page = () => {
  return (
    <>
      <HeadingSection textHeading="welcome to ASBC" />
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

      {/* our vision component */}
      <FadeInSection>
        <div className="container mx-auto flex items-center justify-center gap-5  px-4 pb-16 md:pb-20 flex-col lg:flex-row">
          <OurVision
            icon={<Target />}
            heading="Our mission"
            className="bg-secondary-dark dark:bg-slate-800 text-white dark:text-slate-100 dark:border-slate-700"
            description="To empower Arabian businesses with world-class software solutions, enabling digital transformation at every scale."
          />
          <OurVision
            icon={<Lightbulb className="text-white" />}
            heading="Our Vision"
            className="border-secondary dark:border-slate-700 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            description="To be the most trusted software beacon across the Arab world — guiding companies to technology that truly works."
          />
        </div>
      </FadeInSection>

      {/* social media links section */}
      <SocialMedia />

    </>
  );
};

export default page;
