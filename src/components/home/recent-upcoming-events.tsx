
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import EventCard from "@/components/events/event-card";
import type { Event } from "@/components/events/event-card";

const API_URL = "http://localhost:8000";

export default function RecentUpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/upcoming-events`);

        if (!response.ok) {
          throw new Error("Failed to load upcoming events.");
        }

        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Make a Difference
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Upcoming Events
            </h2>

            <p className="mt-3 max-w-xl text-muted-foreground">
              Discover opportunities to volunteer, connect,
              and support your community.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View All Events
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-96 animate-pulse rounded-xl border bg-muted"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border bg-card p-8 text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-xl border bg-card px-6 py-16 text-center">
            <h3 className="text-xl font-semibold">
              No Upcoming Events
            </h3>

            <p className="mt-2 text-muted-foreground">
              No events are scheduled at the moment.
              Please check back soon.
            </p>
          </div>
        )}

        {/* Event Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
