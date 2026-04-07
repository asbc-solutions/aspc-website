import Hero from "./_components/header/Hero";
import FeaturedSolution from "./_components/home/FeaturedSolution";
import Partners from "./_components/home/Partners";
import Process from "./_components/home/Process";
import ReadyTo from "./_components/home/ReadyTo";
import Serviece from "./_components/home/Serviece";
import Statistics from "./_components/home/Statistics";
import WhyUs from "./_components/home/WhyUs";
import FadeInSection from "./_components/animation/FadeInSection";

export default function Home() {
  return (
    <>
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <Statistics />
      </FadeInSection>
      <FadeInSection>
        <Serviece />
      </FadeInSection>
      <FadeInSection>
        <FeaturedSolution />
      </FadeInSection>
      <FadeInSection>
        <Process />
      </FadeInSection>
      <FadeInSection>
        <WhyUs />
      </FadeInSection>
      <FadeInSection>
        <Partners />
      </FadeInSection>
      <FadeInSection>
        <ReadyTo
          heading="Ready to Build Something Great?"
          paragraph="  Let's discuss how ASPC can transform your business with innovative
          software solutions tailored to your needs."
          btnTextOne="Start Your Project "
          btnTextTwo="Schedule a Call"
          className="py-30"
        />
      </FadeInSection>
    </>
  );
}
