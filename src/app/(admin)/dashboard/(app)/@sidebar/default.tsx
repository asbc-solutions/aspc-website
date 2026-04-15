import { AdminSessionNav } from "./AdminSessionNav";
import { SidebarNav } from "./SidebarNav";

export default function AdminSidebarDefault() {
  return (
    <aside
      className="flex w-64 shrink-0 flex-col min-h-screen justify-between border-r"
      style={{ backgroundColor: "#071848" }}
    >
      {/* Logo + company */}
      <div className="flex items-center gap-3 px-5 py-6">
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

      {/* Navigation (client — needs usePathname for active state) */}
      <SidebarNav />

      {/* Footer — user info + sign out */}
      <div
        className="border-t px-4 py-4 flex items-center justify-between"
        style={{ borderColor: "#0f2460" }}
      >
        <div className=" flex items-center gap-3">
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
    </aside>
  );
}
