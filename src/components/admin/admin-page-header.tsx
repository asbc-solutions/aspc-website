"use client";

import { Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

type AdminPageHeaderProps = {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
};

export function AdminPageHeader({
  title,
  subtitle = "Monday, 8 April 2026",
  rightSlot,
}: Readonly<AdminPageHeaderProps>) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[rgba(0,0,0,0.06)] bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold text-[#0d1240] sm:text-xl">{title}</h1>
        <p className="text-xs text-[#6b7280]">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <SidebarTrigger
          className="h-9 w-9 rounded-full border border-[rgba(0,0,0,0.08)] text-[#6b7280] hover:bg-gray-50 md:hidden"
          aria-label="Open menu"
        />
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white text-[#6b7280] hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        {rightSlot}
      </div>
    </header>
  );
}
