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
    <div className="flex items-start justify-start gap-5 flex-col w-80 bg-white rounded-lg p-5">
      <div className="bg-linear-to-br from-[#2845B5] to-[#4A6FFF] p-2 rounded-xl">
        {icon}
      </div>
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>
  );
};

export default ServiceComp;
