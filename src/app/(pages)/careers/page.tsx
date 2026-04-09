import HeadingSection from "@/app/shared/HeadingSection";
import CultureCard from "@/app/_components/careers/CultureCard";
import JobCard from "@/app/_components/careers/JobCard";
import { Rocket, Users, BookOpen } from "lucide-react";
import Wave from "react-wavify";
import ReadyTo from "@/app/_components/home/ReadyTo";
import FadeInSection from "@/app/_components/animation/FadeInSection";

const cultureData = [
  {
    id: 1,
    icon: Rocket,
    title: "Growth-Focused Environment",
    description:
      "Continuous learning, mentorship programs, and clear career development paths to help you reach your full potential.",
  },
  {
    id: 2,
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Work alongside talented individuals who are passionate about making an impact in the Arab digital landscape.",
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Inclusive & Empowering",
    description:
      "We believe in creating an environment where every voice matters and innovation thrives through diversity.",
  },
];

const jobsData = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    description:
      "Build scalable applications with modern tech stack, leading development of enterprise solutions.",
    location: "Remote" as const,
    type: "Full-time" as const,
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    description:
      "Drive product strategy and vision, working closely with engineering and design teams to deliver exceptional user experiences.",
    location: "Hybrid" as const,
    type: "Full-time" as const,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Design",
    description:
      "Create beautiful and intuitive user interfaces for our digital products that impact millions of users across the Arab world.",
    location: "Onsite" as const,
    type: "Full-time" as const,
  },
  {
    id: 4,
    title: "Backend Engineer",
    department: "Engineering",
    description:
      "Design and implement high-performance backend systems that power our platform at scale using cutting-edge technologies.",
    location: "Remote" as const,
    type: "Full-time" as const,
  },
  {
    id: 5,
    title: "Frontend Developer",
    department: "Engineering",
    description:
      "Build responsive and performant web applications using React, TypeScript, and modern frontend best practices.",
    location: "Remote" as const,
    type: "Full-time" as const,
  },
  {
    id: 6,
    title: "Data Analytics Specialist",
    department: "Analytics",
    description:
      "Analyze user behavior and business metrics to drive data-informed decision making and strategy across the organization.",
    location: "Hybrid" as const,
    type: "Full-time" as const,
  },
  {
    id: 7,
    title: "Marketing Manager",
    department: "Marketing",
    description:
      "Lead marketing initiatives and campaigns to build brand awareness and drive user acquisition for our innovative platform.",
    location: "Onsite" as const,
    type: "Full-time" as const,
  },
];

const page = () => {
  return (
    <>
      <HeadingSection
        textHeading="Join the Beacon"
        paragraph="We're building the infrastructure of the Arab digital future. Come build with us."
      />
      <Wave
        fill="#1B2472"
        paused={false}
        style={{
          display: "flex",
          transform: "scaleY(-1)",
          transformOrigin: "center",
        }}
        options={{
          height: 100,
          amplitude: 25,
          speed: 0.15,
          points: 3,
        }}
      />

      <FadeInSection>
        <div className="flex flex-col items-center justify-center gap-3 text-center py-10">
          <p className="uppercase text-primary dark:text-blue-400 text-xs font-bold">
            Why Work With Us
          </p>
          <h1 className="text-3xl font-bold max-w-3xl dark:text-white">
            Our Culture
          </h1>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {cultureData.map((item) => (
              <CultureCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className="container mx-auto flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center gap-3 text-center py-10">
            <h1 className="text-3xl font-bold max-w-3xl dark:text-white flex items-center gap-3">
              {"Open Positions "}
              <span className="py-2 px-4 text-sm border bg-primary dark:bg-blue-600 rounded-lg text-white dark:text-slate-100 flex justify-center items-center">
                10
              </span>
            </h1>
            <p className="uppercase text-primary dark:text-blue-400 text-xs font-bold">
              Find your next career opportunity with ASPC
            </p>
          </div>
          {/* positions */}
          <div className="w-full px-4 py-12">
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              {jobsData.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  department={job.department}
                  description={job.description}
                  location={job.location}
                  type={job.type}
                />
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
      <FadeInSection>
        <ReadyTo
          heading="Don't See a Role That Fits?"
          paragraph="We're always looking for talented individuals. Send us your resume and we'll keep you in mind for futur opportunities."
          btnTextOne="Send Your Resume"
          className="py-20"
        />
      </FadeInSection>
    </>
  );
};

export default page;
