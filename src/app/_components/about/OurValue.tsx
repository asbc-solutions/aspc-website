import {
  Target,
  Lightbulb,
  Users,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";

const OurValue = () => {
  const values = [
    {
      id: 1,
      title: "Innovation",
      description:
        "Continuously pushing boundaries with cutting-edge technology",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: 2,
      title: "Excellence",
      description:
        "Delivering superior solutions through quality and precision",
      icon: <Target className="w-8 h-8" />,
      color: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: 3,
      title: "Collaboration",
      description: "Building strong partnerships with our clients and team",
      icon: <Users className="w-8 h-8" />,
      color: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: 4,
      title: "Speed",
      description: "Rapid deployment and quick time-to-market solutions",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      id: 5,
      title: "Reliability",
      description: "Dependable systems you can trust with your business",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      id: 6,
      title: "Growth",
      description: "Empowering your business with scalable solutions",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
  ];

  return (
    <div className="container bg-main dark:bg-slate-950 py-20 mx-auto flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <p className="uppercase text-primary dark:text-blue-400 text-xs font-bold">
          What We Stand For
        </p>
        <h1 className="text-4xl font-bold max-w-2xl dark:text-white">
          Our Values
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {values.map((value) => (
          <div
            key={value.id}
            className={`${value.color} dark:bg-slate-800 ${value.borderColor} dark:border-slate-700 border-2 rounded-xl p-6 flex flex-col items-start justify-start gap-4 hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="text-primary dark:text-blue-400">{value.icon}</div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-primary-dark dark:text-white">
                {value.title}
              </h3>
              <p className="text-secondary dark:text-slate-300 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurValue;
