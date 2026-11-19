import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

export type Event = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  createdBy?: string;
};

type EventCardProps = {
  event: Event;
  actionLabel?: string;
  href?: string;
};

export default function EventCard({
  event,
  actionLabel = "View Event",
  href,
}: EventCardProps) {
  const detailsHref = href ?? `/events/${event._id}`;

  const formattedDate = new Date(
    `${event.eventDate.slice(0, 10)}T12:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-2xl">

      {/* Event Thumbnail */}
      <Link
        href={detailsHref}
        className="relative block aspect-[16/10] overflow-hidden bg-muted"
      >
        {event.thumbnail ? (
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground sm:text-sm">
            No image available
          </div>
        )}
      </Link>

      {/* Event Information */}
      <div className="flex flex-1 flex-col p-3 sm:p-6">

        {/* Category and Date */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4 sm:gap-3">
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-secondary-foreground sm:px-4 sm:py-1.5 sm:text-xs">
            {event.eventType}
          </span>

          {/* Highlighted Date */}
          <span className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary sm:gap-1.5 sm:rounded-lg sm:px-3 sm:py-1.5 sm:text-xs">
            <CalendarDays className="size-3 shrink-0 sm:size-3.5" />
            {formattedDate}
          </span>
        </div>

        {/* Event Title */}
        <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-tight sm:text-xl">
          {event.title}
        </h3>

        {/* Event Description */}
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-6">
          {event.description}
        </p>

        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground sm:mt-4 sm:gap-2 sm:text-sm">
          <MapPin className="size-3.5 shrink-0 text-primary sm:size-4" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        {/* View Event Button */}
        <div className="mt-auto pt-4 sm:pt-6">
          <Link
            href={detailsHref}
            className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:h-11 sm:gap-2 sm:px-4 sm:text-sm"
          >
            {actionLabel}
            <ArrowRight className="size-3.5 sm:size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
