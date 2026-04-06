import Image from "next/image";
import imgMan from "@/app/assets/imgMan.png";

const OurTeam = () => {
  const teamMembers = [
    { id: 1, name: "Ahmed Hassan", role: "CEO & Founder" },
    { id: 2, name: "Fatima Al-Rashid", role: "Chief Technology Officer" },
    { id: 3, name: "Mohammad Ali", role: "Head of Development" },
    { id: 4, name: "Sarah Johnson", role: "Product Manager" },
    { id: 5, name: "Omar Abdullah", role: "Senior Architect" },
    { id: 6, name: "Layla Ibrahim", role: "UX/UI Lead" },
    { id: 7, name: "Hassan Karim", role: "DevOps Engineer" },
    { id: 8, name: "Noor Elsayed", role: "Marketing Director" },
  ];

  return (
    <div className="container py-20 mx-auto flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <p className="uppercase text-primary dark:text-blue-400 text-xs font-bold">
          The People Behind ASPC
        </p>
        <h1 className="text-4xl font-bold max-w-2xl dark:text-white">
          Our team
        </h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full items-center">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg dark:bg-slate-800"
          >
            <Image
              src={imgMan}
              alt={member.name}
              priority={false}
              className="w-24 h-24 rounded-full grayscale hover:grayscale-0 transition-all duration-300 object-cover"
            />
            <h1 className="font-bold text-lg text-center dark:text-white">
              {member.name}
            </h1>
            <p className="text-secondary dark:text-slate-400 text-center text-sm">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
