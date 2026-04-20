"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, FileText, LayoutDashboard, Users, type LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
};

type SidebarCounts = {
  positions?: number;
  applications?: number;
};

function buildNavSections(counts: SidebarCounts): { label: string; items: NavItem[] }[] {
  return [
    {
      label: "Overview",
      items: [
        { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      ],
    },
    {
      label: "Recruitment",
      items: [
        { href: "/dashboard/positions", icon: Briefcase, label: "Open Positions", badge: counts.positions },
        { href: "/dashboard/applications", icon: FileText, label: "All Applications", badge: counts.applications },
        { href: "/dashboard/candidates", icon: Users, label: "Top Candidates" },
      ],
    },
  ];
}

export function SidebarNav({ counts = {} }: { counts?: SidebarCounts }) {
  const pathname = usePathname();
  const navSections = buildNavSections(counts);

  return (
    <nav className="flex-1 px-3 py-2">
      {navSections.map((section) => (
        <div key={section.label} className="mb-5">
          <p
            className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "#6b8cca" }}
          >
            {section.label}
          </p>
          <ul className="flex flex-col gap-0.5">
            {section.items.map(({ href, icon: Icon, label, badge }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: isActive ? "#1e3fb0" : undefined,
                      color: isActive ? "#ffffff" : "#c8d9f5",
                    }}
                  >
                    <Icon
                      size={17}
                      className="shrink-0"
                      style={{ opacity: isActive ? 1 : 0.7 }}
                    />
                    <span className="flex-1">{label}</span>
                    {badge !== undefined && (
                      <span
                        className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold text-white"
                        style={{ backgroundColor: isActive ? "#2563eb" : "#1e40af" }}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
