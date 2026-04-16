"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type AdminAppShellProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export function AdminAppShell({ sidebar, children }: Readonly<AdminAppShellProps>) {
  return (
    <SidebarProvider>
      {sidebar}
      <SidebarInset className="min-h-dvh min-w-0 flex-1">{children}</SidebarInset>
    </SidebarProvider>
  );
}
