import ServiceComp from "./ServiceComp";
import { CodeXml, LayoutGrid, Lock, Server, Zap } from "lucide-react";

const services = [
  {
    heading: "Custom Software Development",
    icon: <CodeXml className="text-white text-2xl w-8 h-8" />,
    description:
      "Tailored solutions designed to meet your unique business requirements and drive operational excellence.",
  },
  {
    heading: "Web Application Development",
    icon: <Server className="text-white text-2xl w-8 h-8" />,
    description:
      "Scalable and responsive web apps built for performance, security, and seamless user experiences.",
  },
  {
    heading: "Mobile App Development",
    icon: <Zap className="text-white text-2xl w-8 h-8" />,
    description:
      "Cross-platform and native mobile apps that help your business engage customers anytime, anywhere.",
  },
  {
    heading: "Cloud Integration Services",
    icon: <Lock className="text-white text-2xl w-8 h-8" />,
    description:
      "Modern cloud-ready architectures to improve flexibility, reduce costs, and simplify deployments.",
  },
  {
    heading: "UI/UX Design Solutions",
    icon: <LayoutGrid className="text-white text-2xl w-8 h-8" />,
    description:
      "User-centered design strategies focused on usability, accessibility, and visually clear interfaces.",
  },
  {
    heading: "Maintenance & Support",
    icon: <LayoutGrid className="text-white text-2xl w-8 h-8" />,
    description:
      "Ongoing monitoring, updates, and technical support to keep your systems stable and future-ready.",
  },
];

const Serviece = () => {
  return (
    <div className="bg-main flex items-center justify-center gap-10 py-20 flex-col">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <p className="uppercase text-primary text-xs font-bold">
            our services
          </p>
          <h1 className="text-4xl font-bold max-w-2xl ">
            Comprehensive IT Solutions for Your Business
          </h1>

          <p className="text-primary/50 max-w-2xl">
            From concept to deployment, we deliver end-to-end technology
            solutions tha drive growth and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 mt-10">
          {services.map((service) => (
            <ServiceComp
              key={service.heading}
              icon={service.icon}
              description={service.description}
              heading={service.heading}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Serviece;
