import { getAdminPositions, getPositionApplications } from "@/app/api/admin.api";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ApplicationsTable } from "./ApplicationsTable";

export default async function ApplicationsPage() {
  let positions;
  try {
    positions = await getAdminPositions();
    // console.log("[applications] positions fetched:", JSON.stringify(positions, null, 2));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load positions.";
    return (
      <div className="flex flex-1 flex-col bg-[#f5f7ff]">
        <AdminPageHeader title="All Applications" />
        <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
          <ErrorBanner message={message} />
        </main>
      </div>
    );
  }

  if (positions.length === 0) {
    return (
      <div className="flex flex-1 flex-col bg-[#f5f7ff]">
        <AdminPageHeader title="All Applications" />
        <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
          <div>
            <h2 className="text-lg font-bold text-[#0d1240]">All Applications</h2>
            <p className="text-sm text-[#6b7280]">0 submissions</p>
          </div>
          <EmptyState message="No open positions found. Create a position first." />
        </main>
      </div>
    );
  }

  const results = await Promise.allSettled(
    positions.map((p) => getPositionApplications(p.id)),
  );

  // console.log("[applications] raw results per position:", JSON.stringify(results, null, 2));

  const applications = results.flatMap((r) =>
    r.status === "fulfilled" ? r.value : [],
  );

  // console.log("[applications] final applications count:", applications.length);

  const fetchErrors = results
    .filter((r): r is PromiseRejectedResult => r.status === "rejected")
    .map((r) => String((r.reason as Error)?.message ?? r.reason));

  return (
    <div className="flex flex-1 flex-col bg-[#f5f7ff]">
      <AdminPageHeader title="All Applications" />

      <main className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div>
          <h2 className="text-lg font-bold text-[#0d1240]">All Applications</h2>
          <p className="text-sm text-[#6b7280]">{applications.length} submissions</p>
        </div>

        {fetchErrors.length > 0 && (
          <ErrorBanner
            message={`Some positions failed to load: ${fetchErrors.join(" | ")}`}
          />
        )}

        <ApplicationsTable applications={applications} />
      </main>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-[rgba(0,0,0,0.06)] bg-white py-20 text-center shadow-sm">
      <p className="text-sm font-medium text-[#6b7280]">{message}</p>
    </div>
  );
}
