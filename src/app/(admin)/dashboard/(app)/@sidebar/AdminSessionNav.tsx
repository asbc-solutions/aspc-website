"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

const navItemClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800";

async function fetchSessionAuthenticated(): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/session", { credentials: "same-origin" });
    const data: unknown = await res.json().catch(() => null);
    return Boolean(
      data &&
        typeof data === "object" &&
        (data as { authenticated?: unknown }).authenticated === true,
    );
  } catch {
    return false;
  }
}

export function AdminSessionNav() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const ok = await fetchSessionAuthenticated();
      if (!cancelled) {
        startTransition(() => setAuthenticated(ok));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signOut = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    setAuthenticated(false);
    router.push("/dashboard/admin/auth");
    router.refresh();
  };

  if (authenticated === null) {
    return (
      <div
        className={`${navItemClass} animate-pulse text-transparent`}
        aria-hidden
      >
        …
      </div>
    );
  }

  if (authenticated) {
    return (
      <button
        type="button"
        onClick={() => void signOut()}
        className={`${navItemClass} w-full text-left`}
      >
        Sign out
      </button>
    );
  }

  return (
    <Link href="/dashboard/admin/auth" className={navItemClass}>
      Sign in
    </Link>
  );
}
