import { Lightbulb, Code, CircleCheckBig, Rocket, Search } from "lucide-react";

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Process = () => {
  const processSteps: ProcessStep[] = [
    {
      icon: <Search className="text-primary" />,
      title: "Discovery",
      description:
        "We dive deep into understanding your business needs, challenges, and objectives.",
    },
    {
      icon: <Lightbulb className="text-primary" />,
      title: "Strategy",
      description:
        "Our experts craft a tailored roadmap aligned with your goals and timeline.",
    },
    {
      icon: <Code className="text-primary" />,
      title: "Development",
      description:
        "Agile development with regular updates and collaborative iterations.",
    },
    {
      icon: <CircleCheckBig className="text-primary" />,
      title: "QA Testing",
      description:
        "Rigorous testing to ensure flawless performance and security compliance.",
    },
    {
      icon: <Rocket className="text-primary" />,
      title: "Launch & Support",
      description:
        "Seamless deployment with ongoing maintenance and dedicated support.",
    },
  ];

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <p className="uppercase text-primary text-xs font-bold">Our Process</p>
        <h1 className="text-4xl font-bold max-w-2xl ">
          How We Bring Your Vision to Life
        </h1>

        <p className="text-primary/50 max-w-2xl">
          A proven methodology that ensures quality, transparency, and
          successful outcomes every time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {processSteps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2 mt-10"
          >
            <div className="relative w-max">
              <div className="border-2 border-primary/50 rounded-full p-3">
                {step.icon}
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
            </div>
            <h1 className="text-xl font-semibold">{step.title}</h1>
            <p className="text-primary/50 text-sm text-center line-clamp-3">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
