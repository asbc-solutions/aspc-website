import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Box, Zap, Globe } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import erp from "@/app/assets/erp.png";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  image: StaticImageData;
  icon: React.ReactNode;
}

const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "Al-Rashid Retail ERP",
    description: "Complete retail management transformation",
    category: "retail",
    badge: "ERP",
    image: erp,
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Scalable online marketplace solution",
    category: "ecommerce",
    badge: "Platform",
    image: erp,
    icon: <Box className="w-6 h-6" />,
  },
  {
    id: "3",
    title: "IoT Integration System",
    description: "Real-time data collection and analytics",
    category: "technology",
    badge: "IoT",
    image: erp,
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "4",
    title: "Global Distribution Network",
    description: "Supply chain optimization platform",
    category: "logistics",
    badge: "SCM",
    image: erp,
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: "5",
    title: "Financial Management Suite",
    description: "Enterprise accounting and reporting",
    category: "finance",
    badge: "Finance",
    image: erp,
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    id: "6",
    title: "Healthcare Portal",
    description: "Patient management and telemedicine",
    category: "healthcare",
    badge: "Health",
    image: erp,
    icon: <Zap className="w-6 h-6" />,
  },
];

interface PortfolioCardProps {
  data?: PortfolioItem[];
}

const PortfolioCard = ({ data = portfolioData }: PortfolioCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {data.map((item) => (
        <div
          key={item.id}
          className="group flex flex-col items-start h-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
        >
          {/* Image Container */}
          <div className="relative w-full h-48 sm:h-40 overflow-hidden rounded-t-2xl flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-300">
            <Image
              src={item.image}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              alt={item.title}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors rounded-t-2xl flex flex-col justify-between p-3 sm:p-4 dark:bg-blue-600/40 dark:group-hover:bg-blue-600/50">
              <span className="bg-primary text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold w-fit shadow-md">
                {item.badge}
              </span>
              <span className="bg-secondary/20 border border-secondary/50 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-medium w-fit self-end capitalize">
                {item.category}
              </span>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
            {/* Icon and Title */}
            <div className="flex items-start gap-3">
              <div className="bg-linear-to-br from-primary to-blue-600 p-2.5 text-white rounded-xl shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                {item.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-secondary-dark leading-snug group-hover:text-primary transition-colors">
                {item.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
              {item.description}
            </p>

            {/* Button */}
            <Button
              variant="link"
              className="inline-flex justify-start gap-2 text-primary hover:text-primary/80 p-0 h-auto font-semibold text-sm sm:text-base"
            >
              View Case Study
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioCard;
