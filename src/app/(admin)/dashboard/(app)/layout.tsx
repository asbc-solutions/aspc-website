import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminAppShell } from "@/components/admin/admin-app-shell";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-token";

export default async function AdminAppShellLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!token) {
    redirect("/");
  }

  return <AdminAppShell sidebar={sidebar}>{children}</AdminAppShell>;
}
