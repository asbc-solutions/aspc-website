const HeadingSection = ({
  textHeading,
  paragraph,
}: {
  textHeading: string;
  paragraph?: string;
}) => {
  return (
    <div
      className="flex flex-col gap-5 items-center justify-center text-center  text-secondary pt-30 py-15 "
      style={{
        background:
          "linear-gradient(0deg, var(--color-blue-28, #1B2472), var(--color-blue-28, #1B2472)), radial-gradient(70.71% 70.71% at 50% 50%, rgba(170, 200, 227, 0.3) 3.54%, rgba(170, 200, 227, 0) 3.54%)",
      }}
    >
      <h1 className="text-3xl text-white capitalize font-bold sm:text-4xl lg:text-5xl">
        {textHeading}
      </h1>
      <p>{paragraph}</p>
    </div>
  );
};

export default HeadingSection;
