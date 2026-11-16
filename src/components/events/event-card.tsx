
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}
      </Link>

      {/* Event Information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category and Date */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
            {event.eventType}
          </span>

          {/* Highlighted Date */}
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <CalendarDays className="size-3.5" />
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {event.description}
        </p>

        {/* Location */}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        {/* View Event Button */}
        <div className="mt-auto pt-6">
          <Link
            href={detailsHref}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {actionLabel}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
