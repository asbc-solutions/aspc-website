import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/admin-token";

export const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
