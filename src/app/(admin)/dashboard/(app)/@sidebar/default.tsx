import { getAdminPositions } from "@/app/api/admin.api";
import { AdminSessionNav } from "./AdminSessionNav";
import { SidebarNav } from "./SidebarNav";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

export default async function AdminSidebarDefault() {
  let positionsCount: number | undefined;
  let applicationsCount: number | undefined;

  try {
    const positions = await getAdminPositions();
    positionsCount = positions.filter(
      (p) => p.status.label.toLowerCase() === "active",
    ).length;
    const appsSum = positions.reduce(
      (sum, p) => sum + (p.applications_count ?? 0),
      0,
    );
    // Only show badge if the field is present in the API response
    const hasField = positions.some((p) => p.applications_count !== undefined);
    if (hasField) applicationsCount = appsSum;
  } catch {
    // leave as undefined — badges simply won't render
  }

  return (
    <Sidebar className="border-r-0" style={{ backgroundColor: "#071848" }}>
      {/* Logo + company */}
      <SidebarHeader className="px-5 py-6">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-semibold leading-tight text-white">
              Arabian Solutions
            </p>
            <p
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: "#6b8cca" }}
            >
              HR Admin
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation (client — needs usePathname for active state) */}
      <SidebarContent>
        <SidebarNav counts={{ positions: positionsCount, applications: applicationsCount }} />
      </SidebarContent>

      {/* Footer — user info + sign out */}
      <SidebarFooter>
        <div
          className="flex items-center justify-between border-t px-4 py-4"
          style={{ borderColor: "#0f2460" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: "#2563eb" }}
            >
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs" style={{ color: "#6b8cca" }}>
                HR Manager
              </p>
            </div>
          </div>
          <AdminSessionNav />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
