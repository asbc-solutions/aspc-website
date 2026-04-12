import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminToken,
} from "@/lib/admin-token";

export default async function AdminAppShellLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!secret || !token || !verifyAdminToken(token, secret)) {
    redirect("/");
  }

  return (
    <div className="flex min-h-dvh">
      {sidebar}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
