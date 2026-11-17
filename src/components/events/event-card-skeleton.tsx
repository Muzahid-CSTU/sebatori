
export default function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      {/* Image placeholder */}
      <div className="aspect-[4/3] animate-pulse bg-muted" />

      <div className="space-y-3 p-3 sm:p-5">
        {/* Event type */}
        <div className="h-3 w-20 animate-pulse rounded bg-muted" />

        {/* Title */}
        <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />

        {/* Location */}
        <div className="h-4 w-3/5 animate-pulse rounded bg-muted" />

        {/* Date */}
        <div className="h-4 w-2/5 animate-pulse rounded bg-muted" />

        {/* Button placeholder */}
        <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
      </div>
    </div>
  );
}
