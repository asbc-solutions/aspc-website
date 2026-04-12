import Link from "next/link";

import { AdminSessionNav } from "./AdminSessionNav";

const navItemClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800";

export default function AdminSidebarDefault() {
  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Admin
        </p>
      </div>
      <nav className="flex flex-col gap-0.5 p-3">
        <Link href="/dashboard" className={navItemClass}>
          Overview
        </Link>
        <AdminSessionNav />
      </nav>
    </aside>
  );
}
