import CountUp from "@/components/CountUp";

const Statistics = () => {
  return (
    <div className="bg-white dark:bg-slate-950 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center sm:gap-10 lg:grid-cols-4 lg:gap-6">
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center">
              <CountUp
                from={0}
                to={200}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-4xl font-bold text-primary dark:text-blue-400 sm:text-5xl"
                startWhen
              />
              <span className="text-4xl font-bold text-primary dark:text-blue-400 sm:text-5xl">
                +
              </span>
            </div>
            <p className="mt-2 text-xs text-primary/50 dark:text-slate-400 sm:text-sm">
              Projects Delivered
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center">
              <CountUp
                from={0}
                to={50}
                direction="up"
                duration={1}
                className="count-up-text text-4xl font-bold text-primary dark:text-blue-400 sm:text-5xl"
                startWhen
              />
              <span className="text-4xl font-bold text-primary dark:text-blue-400 sm:text-5xl">
                +
              </span>
            </div>
            <p className="mt-2 text-xs text-primary/50 dark:text-slate-400 sm:text-sm">
              Enterprise Clients
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center">
              <CountUp
                from={0}
                to={10}
                direction="up"
                duration={1}
                className="count-up-text text-4xl font-bold text-primary dark:text-blue-400 sm:text-5xl"
                startWhen
              />
              <span className="text-4xl font-bold text-primary dark:text-blue-400 sm:text-5xl">
                +
              </span>
            </div>
            <p className="mt-2 text-xs text-primary/50 dark:text-slate-400 sm:text-sm">
              Years Experience
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center">
              <CountUp
                from={0}
                to={100}
                direction="up"
                duration={1}
                className="count-up-text text-4xl font-bold text-primary dark:text-blue-400 sm:text-5xl"
                startWhen
              />
              <span className="text-4xl font-bold text-primary dark:text-blue-400 sm:text-5xl">
                %
              </span>
            </div>
            <p className="mt-2 text-xs text-primary/50 dark:text-slate-400 sm:text-sm">
              Client Satisfaction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
