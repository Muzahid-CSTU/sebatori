
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import EventCard from "@/components/events/event-card";
import type { Event } from "@/components/events/event-card";
import EventCardSkeleton from "@/components/events/event-card-skeleton";

const API_URL = "https://sebatori-server.vercel.app";

const CATEGORIES = [
  "All",
  "Cleanup",
  "Plantation",
  "Donation",
  "Community Service",
  "Other",
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError("");

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
          .filter(
            (event) =>
              typeof event.eventDate === "string" &&
              event.eventDate.slice(0, 10) >= todayString
          )
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

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" ||
        event.eventType?.toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesSearch =
        !query ||
        event.title?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              SebaTori Community
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Upcoming Events
            </h1>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Discover meaningful volunteer initiatives scheduled
              for upcoming dates. Past events are automatically
              excluded so you can focus on active drives that need support.
            </p>
          </div>

          <Button asChild className="shrink-0">
            <Link href="/create-event">
              <CalendarDays className="mr-2 size-4" />
              Create Event
            </Link>
          </Button>
        </div>

        {/* Category Filter and Search */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events or areas..."
              aria-label="Search events by title or location"
              className="h-10 w-full rounded-xl border border-input bg-background pl-9 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

            <p className="mt-2 text-sm text-destructive">
              {error}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Please make sure the backend server is running.
            </p>

            <Button
              className="mt-5"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="rounded-xl border bg-card px-6 py-16 text-center">
            <CalendarDays className="mx-auto size-10 text-muted-foreground" />

            <h2 className="mt-4 text-xl font-semibold">
              {events.length === 0
                ? "No Upcoming Events"
                : "No Matching Events"}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {events.length === 0
                ? "There are no upcoming events right now. Be the first to organize one!"
                : "Try another category or search term to find an event."}
            </p>

            {events.length > 0 && (
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            )}

            <div>
              <Button asChild className="mt-6">
                <Link href="/create-event">Create an Event</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Event Count and Event Grid */}
        {!loading && !error && filteredEvents.length > 0 && (
          <>
            <p className="mb-5 text-sm text-muted-foreground">
              Showing {filteredEvents.length} of {events.length}{" "}
              upcoming{" "}
              {events.length === 1 ? "event" : "events"}
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
