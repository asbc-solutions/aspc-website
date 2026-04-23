const ServiceComp = ({
  heading,
  description,
  icon,
}: {
  heading: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-start justify-start gap-5 flex-col w-full bg-white dark:bg-slate-800 rounded-lg p-5">
      <div className="bg-linear-to-br from-[#2845B5] dark:from-blue-700 to-[#4A6FFF] dark:to-blue-500 p-2 rounded-xl">
        {icon}
      </div>
      <h1 className="dark:text-white">{heading}</h1>
      <p className="dark:text-slate-300">{description}</p>
    </div>
  );
};

export default ServiceComp;
