"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Event } from "@/components/events/event-card";
import EventCard from "@/components/events/event-card";

const API_URL = "process.env.NEXT_PUBLIC_API_URL";

export default function JoinedEventsPage() {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const email = session?.user?.email?.trim().toLowerCase();

  useEffect(() => {
    if (sessionLoading) return;

    if (!email) {
      setLoading(false);
      return;
    }

    const fetchJoinedEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const { data: tokenData, error: tokenError } =
          await authClient.token();

        if (tokenError || !tokenData?.token) {
          throw new Error(
            "Unable to get authentication token. Please log in again."
          );
        }

        const response = await fetch(`${API_URL}/joined-events`, {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ||
              result.msg ||
              "Failed to fetch joined events."
          );
        }

        setEvents(result);
      } catch (err) {
        console.error("Fetch joined events error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Could not load your joined events."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [email, sessionLoading]);

  if (sessionLoading || loading) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-muted-foreground">
          Loading your joined events...
        </p>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please Login</h1>

          <p className="mt-2 text-muted-foreground">
            Login to see the events you have joined.
          </p>

          <Link
            href="/login"
            className="mt-5 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Login Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Your Activities
        </p>

        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          Joined Events
        </h1>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Explore the events you have joined and get ready to make an impact.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 p-6 text-center">
          <p className="text-destructive">{error}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center sm:p-12">
          <h2 className="text-lg font-semibold">
            You haven&apos;t joined any events yet.
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Find an event and become part of the community.
          </p>

          <Link
            href="/events"
            className="mt-5 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-5 text-sm text-muted-foreground">
            You have joined {events.length}{" "}
            {events.length === 1 ? "event" : "events"}.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
