import Link from "next/link";
import { ArrowLeft, Home, LifeBuoy } from "lucide-react";

import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-[radial-gradient(80%_60%_at_50%_0%,rgba(27,36,114,0.14)_0%,rgba(27,36,114,0)_65%),linear-gradient(180deg,#f7f9ff_0%,#eef3ff_100%)] px-4 py-14">
      <div className="pointer-events-none absolute -left-20 top-12 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />

      <section className="relative w-full max-w-2xl rounded-3xl border border-primary/15 bg-white/90 p-8 text-center shadow-[0_20px_60px_-28px_rgba(27,36,114,0.45)] backdrop-blur md:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-secondary shadow-lg shadow-primary/25">
          <LifeBuoy className="h-8 w-8" />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">
          Error 404
        </p>
        <h1 className="text-balance text-4xl font-bold text-primary md:text-6xl">
          This page took a wrong turn.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary/70 md:text-lg">
          The page you requested does not exist or may have been moved.
          Let&apos;s get you back to a valid route.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="rounded-full px-5 py-5">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back To Home
            </Link>
          </Button>

          <Button asChild variant="outline" className="rounded-full px-5 py-5">
            <Link href="/contact-us">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
