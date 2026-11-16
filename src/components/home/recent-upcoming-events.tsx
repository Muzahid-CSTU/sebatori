
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
    <section className="px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
              Recent Upcoming Events
            </h2>

            <p className="mt-2 max-w-xl text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-base sm:leading-7">
              Discover opportunities to volunteer, connect,
              and support your community.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground sm:h-10 sm:w-auto sm:text-sm"
          >
            View All Events
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-xl border bg-muted sm:h-96"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl border bg-card p-5 text-center sm:p-8">
            <p className="text-xs text-destructive sm:text-sm">
              {error}
            </p>

            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              Please make sure the backend server is running.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-xl border bg-card px-4 py-12 text-center sm:px-6 sm:py-16">
            <h3 className="text-lg font-semibold sm:text-xl">
              No Upcoming Events
            </h3>

            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              No events are scheduled at the moment.
              Please check back soon.
            </p>
          </div>
        )}

        {/* Event Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
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
