import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse bg-slate-600 dark:bg-slate-800 rounded-md bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton }
