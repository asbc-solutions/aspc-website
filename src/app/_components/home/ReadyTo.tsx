import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const ReadyTo = ({
  heading,
  paragraph,
  btnTextOne,
  btnTextTwo,
  className = "",
}: {
  heading: string;
  paragraph: string;
  btnTextOne: string;
  btnTextTwo?: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-7 bg-[linear-gradient(103.09deg,#0C409F_0%,#2845B5_50%,#4A6FFF_100%)] ${className}`}
    >
      <h1 className="text-5xl text-white font-bold leading-tight text-center max-w-2xl">
        {heading}
      </h1>
      <p className="text-white/80 line-clamp-2 font-normal text-lg text-center max-w-2xl">
        {paragraph}
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button className="flex items-center rounded-full gap-2 bg-white text-primary font-semibold p-5 ">
          {btnTextOne}
          <ArrowRight />
        </Button>
        {btnTextTwo && (
          <Button
            className={`flex items-center rounded-full gap-2 bg-transparent text-white p-5  border border-white/30 font-semibold ${btnTextTwo ? "flex" : "hidden"}`}
          >
            {btnTextTwo}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReadyTo;
