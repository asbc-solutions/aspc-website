import CountUp from "@/components/CountUp";

const Statistics = () => {
  return (
    <div className="grid grid-cols-2 gap-8 px-4 py-12 text-center sm:gap-10 sm:px-6 md:py-16 lg:grid-cols-4 lg:gap-6 lg:px-8 lg:py-20">
      <div className="flex flex-col items-center">
        {/* <h1 className="text-5xl text-primary font-bold text-center">200+</h1> */}
        <div className="inline-flex items-center">
          <CountUp
            from={0}
            to={200}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text text-4xl font-bold text-primary sm:text-5xl"
            startWhen
          />
          <span className="text-4xl font-bold text-primary sm:text-5xl">+</span>
        </div>
        <p className="mt-2 text-xs text-primary/50 sm:text-sm">
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
            className="count-up-text text-4xl font-bold text-primary sm:text-5xl"
            startWhen
          />
          <span className="text-4xl font-bold text-primary sm:text-5xl">+</span>
        </div>
        <p className="mt-2 text-xs text-primary/50 sm:text-sm">
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
            className="count-up-text text-4xl font-bold text-primary sm:text-5xl"
            startWhen
          />
          <span className="text-4xl font-bold text-primary sm:text-5xl">+</span>
        </div>
        <p className="mt-2 text-xs text-primary/50 sm:text-sm">
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
            className="count-up-text text-4xl font-bold text-primary sm:text-5xl"
            startWhen
          />
          <span className="text-4xl font-bold text-primary sm:text-5xl">%</span>
        </div>
        <p className="mt-2 text-xs text-primary/50 sm:text-sm">
          Client Satisfaction
        </p>
      </div>
    </div>
  );
};

export default Statistics;
