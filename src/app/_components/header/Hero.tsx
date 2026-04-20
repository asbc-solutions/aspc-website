import { Button } from "@/components/ui/button";
import FloatingLines from "@/components/FloatingLines";
import { ArrowRight } from "lucide-react";

type HeroButton = {
  label: string;
  icon?: React.ReactNode;
  className: string;
};

type HeroProps = {
  tag?: string;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  buttons?: HeroButton[];
  headClassName?: string;
  /** Override the outer wrapper height class. Defaults to "h-screen". */
  wrapperClassName?: string;
  /** Override the inner content min-height class. Defaults to "min-h-screen". */
  innerClassName?: string;
  /** Override the description wrapper classes. */
  descriptionClassName?: string;
};

const defaultButtons: HeroButton[] = [
  {
    label: "Start Your Project",
    icon: <ArrowRight />,
    className:
      "flex w-full items-center justify-center gap-2 rounded-full bg-white dark:bg-black/10 dark:text-white dark:border-white/30 p-5 font-semibold text-black sm:w-auto",
  },
  {
    label: "Explore Solutions",
    className:
      "flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 dark:bg-white p-5 font-semibold dark:text-black sm:w-auto",
  },
];

const Hero = ({
  tag = "Software Solutions",
  heading = "Transforming Ideas Into Enterprise Solutions",
  description = "We build scalable software ecosystems that empower businesses across the Arab world to thrive in the digital age.",
  buttons = defaultButtons,
  headClassName = "",
  wrapperClassName = "h-screen",
  innerClassName = "min-h-screen",
  descriptionClassName = "max-w-sm px-2 text-sm font-normal text-secondary dark:text-white sm:max-w-2xl sm:text-base",
}: HeroProps) => {
  return (
    <div className={`relative w-full overflow-hidden bg-linear-to-br from-primary-dark via-secondary-dark to-primary ${wrapperClassName}`}>
      <div className="absolute inset-0">
        <FloatingLines
          enabledWaves={["top", "bottom", "middle"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="normal"
        />
      </div>

      <div className="relative">
        <div className={`text-white flex flex-col items-center justify-center gap-4 px-4 pt-24 pb-10 text-center sm:gap-5 sm:px-6 sm:pt-28 lg:px-8 ${innerClassName}`}>
          <Button className="group uppercase flex items-center justify-center gap-2 rounded-full border md:p-5 border-white/30 bg-white/10 dark:bg-black/10 text-xs font-medium text-primary-foreground backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/15 hover:border-white/45 px-5 py-2.5 sm:text-sm">
            <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-secondary dark:text-indigo-600" />
            <span>{tag}</span>
          </Button>

          <h1
            className={`max-w-md text-3xl font-bold leading-tight sm:max-w-3xl sm:text-5xl lg:max-w-4xl lg:text-7xl ${headClassName}`}
          >
            {heading}
          </h1>

          <div className={descriptionClassName}>
            {typeof description === "string" ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>

          {buttons.length > 0 && (
            <div className="flex w-full flex-col items-center gap-3 px-4 sm:w-auto sm:flex-row sm:gap-5 sm:px-0">
              {buttons.map(({ label, icon, className }) => (
                <Button key={label} className={className}>
                  {label} {icon}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
