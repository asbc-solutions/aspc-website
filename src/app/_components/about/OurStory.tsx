const timelineData = [
  {
    year: "2014",
    title: "company founded",
    description: "Started as a small software consultancy in Mansoura",
  },
  {
    year: "2016",
    title: "First Enterprise Client",
    description: "Secured our first Fortune 500 partnership",
  },
  {
    year: "2018",
    title: "Regional Expansion",
    description: "Opened offices in Riyadh and Dubai",
  },
  {
    year: "2020",
    title: "Cloud Transformation",
    description: "Launched our cloud-native product suite",
  },
  {
    year: "2022",
    title: "200+ Projects",
    description: "Milestone of delivering over 200 successful projects",
  },
  {
    year: "2024",
    title: "Industry Leader",
    description: "Recognized as top IT solutions provider in the region",
  },
];

const OurStory = () => {
  return (
    <div className="container py-20 mx-auto bg-main flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <p className="uppercase text-primary text-xs font-bold">Our Journey</p>
        <h1 className="text-4xl font-bold max-w-2xl">Our Story</h1>
      </div>

      {/* timeline with vertical progress bar */}
      <div className="flex gap-8 items-stretch max-w-3xl w-full">
        {/* vertical progress bar with dots */}
        <div className="flex flex-col items-center">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-1 min-h-32"
            >
              {/* dot */}
              <div className="w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md"></div>
              {/* connecting line */}
              {index < timelineData.length && (
                <div className="w-1 flex-1 bg-linear-to-b from-primary to-primary opacity-30"></div>
              )}
            </div>
          ))}
        </div>

        {/* timeline cards */}
        <div className="flex flex-col gap-8 w-full">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 items-start justify-start bg-white p-8 rounded-lg w-3xl hover:shadow-lg transition-shadow duration-300"
            >
              <h1 className="text-primary text-3xl font-bold">{item.year}</h1>
              <h2 className="text-xl capitalize text-primary-dark font-bold">
                {item.title}
              </h2>
              <p className="text-secondary text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurStory;
