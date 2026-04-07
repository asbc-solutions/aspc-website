import HeadingSection from "@/app/shared/HeadingSection";
import SolutionTabs from "@/app/_components/solutions/SolutionTabs";
import Wave from "react-wavify";
import ReadyTo from "@/app/_components/home/ReadyTo";
import FadeInSection from "@/app/_components/animation/FadeInSection";

const page = () => {
  return (
    <div>
      <HeadingSection textHeading="Software Solutions & Products" />
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
        <SolutionTabs />
      </FadeInSection>

      <FadeInSection>
        <ReadyTo
          heading="Need a Custom Solution?"
          paragraph="Our team of experts can build tailored software solutions that perfectly match your unique business requirements."
          btnTextOne="Discuss Your Project"
          className="py-30 bg-[linear-gradient(#1B2472)]! "
        />
      </FadeInSection>
    </div>
  );
};

export default page;
