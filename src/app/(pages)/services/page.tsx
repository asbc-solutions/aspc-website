import ReadyTo from "@/app/_components/home/ReadyTo";
import ReusableService from "@/app/_components/services/ReusableService";
import HeadingSection from "@/app/shared/HeadingSection";
import Wave from "react-wavify";

const page = () => {
  return (
    <>
      <HeadingSection
        textHeading="our services"
        paragraph="Comprehensive IT solutions tailored to your business needs"
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

      <ReusableService />

      <ReadyTo
        heading="Ready to Transform Your Business"
        paragraph="Let's discuss how our services can help you achieve your goals. Contact us
        today for a free consultation."
        btnTextOne="Contact "
        btnTextTwo="Explore Solutions"
        className="py-20"
      />
    </>
  );
};

export default page;
