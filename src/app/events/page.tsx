
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:8000";

type Event = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  createdBy: string;
};

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/events`);

        if (!response.ok) {
          throw new Error("Failed to load events.");
        }

        const data: Event[] = await response.json();

        const today = new Date();
        const todayString = [
          today.getFullYear(),
          String(today.getMonth() + 1).padStart(2, "0"),
          String(today.getDate()).padStart(2, "0"),
        ].join("-");

        const upcomingEvents = data
          .filter((event) => event.eventDate.slice(0, 10) >= todayString)
          .sort((a, b) =>
            a.eventDate.localeCompare(b.eventDate)
          );

        setEvents(upcomingEvents);
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
    <main className="min-h-screen bg-muted/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              SebaTori Community
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Upcoming Events
            </h1>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Discover community events, connect with volunteers,
              and make a positive impact.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => {
              window.location.href = "/create-event";
            }}
          >
            Create an Event
          </Button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">
              Loading upcoming events...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-destructive/30 bg-card p-8 text-center">
            <h2 className="text-lg font-semibold">
              Unable to Load Events
            </h2>

            <p className="mt-2 text-sm text-destructive">
              {error}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Please make sure the backend server is running.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-xl border bg-card px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">
              No Upcoming Events
            </h2>

            <p className="mt-2 text-muted-foreground">
              There are no upcoming events right now.
              Be the first to organize one!
            </p>

            <Button
              type="button"
              className="mt-6"
              onClick={() => {
                window.location.href = "/create-event";
              }}
            >
              Create an Event
            </Button>
          </div>
        )}

        {/* Event Grid */}
        {!loading && !error && events.length > 0 && (
          <>
            <p className="mb-5 text-sm text-muted-foreground">
              {events.length} upcoming{" "}
              {events.length === 1 ? "event" : "events"}
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    {event.thumbnail ? (
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image available
                      </div>
                    )}
                  </div>

                  {/* Event Information */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {event.eventType}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {new Date(
                          `${event.eventDate.slice(0, 10)}T12:00:00`
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold leading-snug">
                      {event.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {event.description}
                    </p>

                    <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                      <span aria-hidden="true">📍</span>
                      <span>{event.location}</span>
                    </p>

                    {/* View Event */}
                    <div className="mt-auto pt-5">
                      <Link
                        href={`/events/${event._id}`}
                        className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        View Event
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
