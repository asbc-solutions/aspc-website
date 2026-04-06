// props types

interface OurVisionProps {
  icon: React.ReactNode;
  heading: string;
  description: string;
  className?: string;
}

const OurVision = ({
  icon,
  heading,
  description,
  className,
}: OurVisionProps) => {
  return (
    <div
      className={`p-6 flex flex-col gap-3 items-start justify-center border dark:border-slate-700 rounded-lg max-w-md ${className}`}
    >
      <div className="bg-linear-to-br from-[#2845B5] dark:from-blue-700 to-[#4A6FFF] dark:to-blue-500 p-2 rounded-xl">
        {icon}
      </div>
      <h1 className="dark:text-white">{heading}</h1>
      <p className="dark:text-slate-300">{description}</p>
    </div>
  );
};

export default OurVision;
