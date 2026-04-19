import OurVision from "@/app/_components/about/OurVision";
import FadeInSection from "@/app/_components/animation/FadeInSection";
import SocialMedia from "@/app/_components/event/SocialMedia";
import Hero from "@/app/_components/header/Hero";
import { Lightbulb, Target } from "lucide-react";

const aboutDescription = (
  <div className="space-y-3 text-center max-w-full! md:text-xl  text-base leading-relaxed text-white">
    <p>
      is a forward-thinking software house dedicated to delivering innovative
      and scalable digital solutions for businesses of all sizes. Since our
      establishment in <span className="font-bold">2015</span>, we have been
      empowering organizations to transform their ideas into high-performance
      digital products.
    </p>
    <p>
      We specialize in <span className="font-bold">custom</span> software
      development, web and mobile applications, enterprise systems, and seamless
      technology integration.<span className="font-bold"> Our solutions </span>
      are designed to enhance efficiency, drive growth, and create real business
      impact.
    </p>
    <p>
      Serving clients locally and across the{" "}
      <span className="font-bold">Middle East</span>, we combine technical
      expertise with a deep understanding of market needs to deliver solutions
      that are both reliable and future-ready.
    </p>
  </div>
);

const page = () => {
  return (
    <>
      <FadeInSection>
        <Hero
          tag="About Us"
          heading="Arabian Solutions Beacon"
          headClassName="max-w-full!"
          description={aboutDescription}
          buttons={[]}
        />
      </FadeInSection>

      {/* our vision component */}
      <FadeInSection>
        <div className="container mx-auto flex items-center justify-center gap-5 px-4 py-16 md:py-20 flex-col lg:flex-row">
          <OurVision
            icon={<Target />}
            heading="Our mission"
            className="bg-secondary-dark text-white"
            description="To empower Arabian businesses with world-class software solutions, enabling digital transformation at every scale."
          />
          <OurVision
            icon={<Lightbulb className="text-white" />}
            heading="Our Vision"
            className="border-secondary text-slate-700"
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
