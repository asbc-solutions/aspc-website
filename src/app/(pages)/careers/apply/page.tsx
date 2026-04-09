import HeadingSection from "@/app/shared/HeadingSection";
import React from "react";
import Wave from "react-wavify";
import FadeInSection from "@/app/_components/animation/FadeInSection";
import ApplyForm from "@/app/_components/careers/ApplyForm";

const page = () => {
  return (
    <div>
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
        <section className="container flex justify-center mx-auto max-w-5xl px-4 pb-16">
          <ApplyForm />
        </section>
      </FadeInSection>
    </div>
  );
};

export default page;
