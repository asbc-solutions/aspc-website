import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CircleCheck,
  CodeXml,
  Database,
  LayoutGrid,
  Lock,
  Server,
  Zap,
} from "lucide-react";

const servicesData = [
  {
    heading: "Custom Software Development",
    icon: <CodeXml className="text-white text-2xl w-12 h-12 p-1" />,
    description:
      "We design and build bespoke software solutions tailored to your unique business requirements. Our expert team works closely with you to understand your workflows, challenges, and goals, delivering applications that drive operational excellence and competitive advantage.",
    serviceArr: [
      "Full-stack development",
      "API integration",
      "Mobile apps ",
      "Cloud-native architecture",
      "Agile methodology",
    ],
  },
  {
    heading: "Software Licensing & Warehouse",
    icon: <Server className="text-white text-2xl w-12 h-12 p-1" />,
    description:
      "Access enterprise software licenses at competitive prices with dedicated support. We maintain strategic partnerships with Microsoft, Oracle, SAP, and other leading vendors, ensuring you get the right licenses with proper compliance and cost optimization.",
    serviceArr: [
      "Microsoft licensing",
      "Oracle solutions",
      "Volume discounts  ",
      "Compliance management",
    ],
  },
  {
    heading: "IT Infrastructure",
    icon: <Zap className="text-white text-2xl w-12 h-12 p-1" />,
    description:
      "Build a robust, scalable IT foundation for your business. From cloud migration and server management to network optimization and disaster recovery, we ensure your infrastructure supports growth while maintaining security and performance.",
    serviceArr: [
      "Cloud migration",
      "Server management",
      "Network optimization",
      "Disaster recovery",
      "24/7 monitoring",
    ],
  },
  {
    heading: "Cybersecurity Solutions",
    icon: <Lock className="text-white text-2xl w-12 h-12 p-1" />,
    description:
      "Protect your digital assets with comprehensive security solutions. We implement multi-layered defense strategies, conduct vulnerability assessments, ensure regulatory compliance, and provide 24/7 monitoring to safeguard your organization from evolving threats.",
    serviceArr: [
      "Security audits",
      "Firewall configuration",
      "Penetration testing",
      "ISO 27001 compliance",
      "Incident response",
    ],
  },
  {
    heading: "ERP & CRM Systems",
    icon: <Database className="text-white text-2xl w-12 h-12 p-1" />,
    description:
      "Streamline operations and enhance customer relationships with integrated enterprise solutions. We specialize in implementing and customizing leading ERP and CRM platforms to optimize your business processes and drive growth.",
    serviceArr: [
      "SAP implementation",
      "Oracle solutions",
      "Custom development",
      "Training & support",
    ],
  },
  {
    heading: "Digital Transformation",
    icon: <LayoutGrid className="text-white text-2xl w-12 h-12 p-1" />,
    description:
      "Navigate your digital journey with confidence. Our end-to-end transformation strategies help modernize legacy systems, automate workflows, and adopt emerging technologies, ensuring your business stays ahead in an ever-evolving digital landscape.",
    serviceArr: [
      "Process automation",
      "Digital strategy",
      "Change management",
      "Technology roadmap",
      "ROI optimization",
    ],
  },
];

const ReusableService = () => {
  return (
    <div className="flex  items-center justify-center @container mx-auto gap-10 flex-col ">
      {servicesData.map((service, index) => (
        <div
          key={index}
          className={`flex w-full items-center justify-around gap-10 flex-col py-20 px-5 ${
            index % 2 !== 0
              ? "lg:flex-row-reverse bg-main dark:bg-slate-900"
              : "lg:flex-row"
          }`}
        >
          <div className="relative shadow-xl shadow-[#1B2472]/20 dark:shadow-blue-900/30 rounded-lg p-10 flex items-center gap-5 bg-white dark:bg-slate-800">
            <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#AAC8E3] dark:bg-blue-400" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1B2472] dark:bg-blue-600" />
            <span className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#1B2472] dark:bg-blue-600" />
            <span className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#AAC8E3] dark:bg-blue-400" />
            <div className="bg-linear-to-br from-[#1B2472] dark:from-blue-700 to-[#4A6FFF] dark:to-blue-500 p-2 rounded-xl">
              {service.icon}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center gap-5">
            <span className="rounded-full px-2 bg-primary/20 dark:bg-blue-900/40 text-sm text-primary dark:text-blue-300 font-semibold">
              0{index + 1}
            </span>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {service.heading}
            </h1>
            <p className="max-w-lg text-primary/70 dark:text-slate-400">
              {service.description}
            </p>
            <div>
              <div className="flex flex-col items-start gap-2">
                {service.serviceArr.map((service, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 justify-center"
                  >
                    <CircleCheck
                      size={32}
                      strokeWidth={1}
                      className="fill-primary dark:fill-blue-500 text-white dark:text-white"
                    />
                    <p className="text-slate-700 dark:text-slate-200">
                      {service}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Button className="rounded-full py-5 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700">
              Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReusableService;
