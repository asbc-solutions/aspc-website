const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200/70 dark:bg-slate-800 ${className ?? ""}`} />
);

export default function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-10 space-y-4">
        <SkeletonBlock className="h-10 w-3/4 max-w-xl rounded-xl" />
        <SkeletonBlock className="h-4 w-full max-w-2xl" />
        <SkeletonBlock className="h-4 w-5/6 max-w-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkeletonBlock className="h-44 w-full" />
        <SkeletonBlock className="h-44 w-full" />
        <SkeletonBlock className="h-52 w-full md:col-span-2" />
      </div>
    </div>
  );
}
