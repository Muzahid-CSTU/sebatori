
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import EventCard from "@/components/events/event-card";
import type { Event } from "@/components/events/event-card";
import EventCardSkeleton from "@/components/events/event-card-skeleton";

const API_URL = "http://localhost:8000";

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
          .sort((a, b) => a.eventDate.localeCompare(b.eventDate));

        setEvents(upcomingEvents);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
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

          <Button type="button">
            <Link href="/create-event">Create an Event</Link>
          </Button>
        </div>

        
        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        )}


        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-destructive/30 bg-card p-8 text-center">
            <h2 className="text-lg font-semibold">
              Unable to Load Events
            </h2>

            <p className="mt-2 text-sm text-destructive">{error}</p>

            <p className="mt-2 text-sm text-muted-foreground">
              Please make sure the backend server is running.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-xl border bg-card px-6 py-16 text-center">
            <CalendarDays className="mx-auto size-10 text-muted-foreground" />

            <h2 className="mt-4 text-xl font-semibold">
              No Upcoming Events
            </h2>

            <p className="mt-2 text-muted-foreground">
              There are no upcoming events right now.
              Be the first to organize one!
            </p>

            <Button className="mt-6">
              <Link href="/create-event">Create an Event</Link>
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
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
