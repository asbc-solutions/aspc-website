import Hero from "./_components/header/Hero";
import FeaturedSolution from "./_components/home/FeaturedSolution";
import Partners from "./_components/home/Partners";
import Process from "./_components/home/Process";
import ReadyTo from "./_components/home/ReadyTo";
import Serviece from "./_components/home/Serviece";
import Statistics from "./_components/home/Statistics";
import WhyUs from "./_components/home/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <Statistics />
      <Serviece />
      <FeaturedSolution />
      <Process />
      <WhyUs />
      <Partners />
      <ReadyTo
        heading="Ready to Build Something Great?"
        paragraph="  Let's discuss how ASPC can transform your business with innovativ
        software solutions tailored to your needs."
        btnTextOne="Start Your Project "
        btnTextTwo="Schedule a Call"
        className="py-30"
      />
    </>
  );
}
