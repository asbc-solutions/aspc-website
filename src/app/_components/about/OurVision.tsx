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
      className={`p-6 flex flex-col gap-3 items-start justify-center border  rounded-lg max-w-md ${className}`}
    >
      <div className="bg-linear-to-br from-[#2845B5] to-[#4A6FFF] p-2 rounded-xl">
        {icon}
      </div>
      <h1>{heading}</h1>
      <p>{description}</p>
    </div>
  );
};

export default OurVision;
