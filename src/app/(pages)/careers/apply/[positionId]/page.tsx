import HeadingSection from "@/app/shared/HeadingSection";
import Wave from "react-wavify";
import FadeInSection from "@/app/_components/animation/FadeInSection";
import ApplyForm from "@/app/_components/careers/ApplyForm";
import { getJobPositionById, getJobsData } from "@/app/api/jobs.api";

type ApplyPageProps = {
  params: Promise<{ positionId: string }>;
};

const Page = async ({ params }: ApplyPageProps) => {
  const { positionId } = await params;
  const primaryPosition = await getJobPositionById(positionId);
  const fallbackPositionFromList = (await getJobsData()).find(
    (job) => String(job.id) === positionId,
  );
  const position =
    primaryPosition ??
    (fallbackPositionFromList
      ? { ...fallbackPositionFromList, form_fields: [] }
      : null) ??
    null;

  return (
    <div>
      <HeadingSection
        textHeading={
          position ? `Apply for ${position.title}` : "Position Not Found"
        }
        paragraph="Complete the form below and our recruitment team will contact you soon."
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
        <section className="container flex justify-center mx-auto max-w-5xl px-4 pb-16">
          {position ? (
            <ApplyForm position={position} />
          ) : (
            <div className="w-full rounded-xl border border-[#d6e6ff] bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
              <h2 className="text-xl font-semibold text-[#0D1240] dark:text-white">
                We could not load this position
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Please go back to careers and choose an available position.
              </p>
            </div>
          )}
        </section>
      </FadeInSection>
    </div>
  );
};

export default Page;
