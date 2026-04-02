import { Gauge, Globe, Handshake, ShieldCheck } from "lucide-react";

const processSteps = [
  {
    icon: <Globe className="text-white" />,
    title: "Arab-Market Native",
    description:
      "Deep understanding of regional business practices, cultural nuances, and compliance requirements across the Arab world.",
  },
  {
    icon: <Gauge className="text-white" />,
    title: "Arab-Market Native",
    description:
      "Deep understanding of regional business practices, cultural nuances, and compliance requirements across the Arab world.",
  },
  {
    icon: <ShieldCheck className="text-white" />,
    title: "Arab-Market Native",
    description:
      "Deep understanding of regional business practices, cultural nuances, and compliance requirements across the Arab world.",
  },
  {
    icon: <Handshake className="text-white" />,
    title: "Arab-Market Native",
    description:
      "Deep understanding of regional business practices, cultural nuances, and compliance requirements across the Arab world.",
  },
];

const WhyUs = () => {
  return (
    <div className=" py-20 bg-[#1B2472]">
      <div className="container mx-auto ">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="uppercase text-secondary text-xs font-bold">
            Why Choose ASPC
          </p>
          <h1 className="text-4xl text-white font-bold max-w-2xl ">
            What Sets Us Apart
          </h1>

          <p className="text-secondary max-w-2xl">
            We combine global expertise with local insight to deliver solutions
            that truly matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-6 bg-[#2A3A8A] rounded-lg"
            >
              <div className="bg-linear-to-br from-[#2845B5] to-[#4A6FFF] p-2 rounded-xl mb-4">
                {step.icon}
              </div>
              <h2 className="text-xl text-white font-bold mb-2">
                {step.title}
              </h2>
              <p className="text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
