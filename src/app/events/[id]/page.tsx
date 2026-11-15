
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/events/${id}`);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Event not found."
              : "Failed to load event details."
          );
        }

        const data: Event = await response.json();
        setEvent(data);
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

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const formattedDate = event?.eventDate
    ? new Date(
        `${event.eventDate.slice(0, 10)}T12:00:00`
      ).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Date not available";

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">
          Loading event details...
        </p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md rounded-xl border bg-card p-8 text-center">
          <h1 className="text-2xl font-bold">
            Event Not Found
          </h1>

          <p className="mt-3 text-muted-foreground">
            {error || "This event could not be found."}
          </p>

          <Button
            className="mt-6"
            onClick={() => router.push("/events")}
          >
            Back to Events
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/events"
          className="mb-5 inline-flex text-sm font-medium text-primary hover:underline"
        >
          ← Back to Upcoming Events
        </Link>

        <article className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:p-6">
            {/* Left: Image, Tag and Title */}
            <div className="flex min-w-0 flex-col gap-4">
              <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-xl bg-muted sm:min-h-[360px] lg:min-h-[400px]">
                {event.thumbnail ? (
                  <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    priority
                    sizes="(max-width: 1023px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    No image available
                  </p>
                )}
              </div>

              <div className="pb-2">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {event.eventType}
                </span>

                <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  {event.title}
                </h1>
              </div>
            </div>

            {/* Right: Other Information */}
            <div className="flex min-w-0 flex-col rounded-xl bg-muted/30 p-4 sm:p-6 lg:p-7">
              <div className="space-y-5">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">
                    📅
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                      Event Date
                    </p>
                    <p className="mt-1 font-medium">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">
                    📍
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                      Location
                    </p>
                    <p className="mt-1 break-words font-medium">
                      {event.location}
                    </p>
                  </div>
                </div>

                {/* Organizer */}
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">
                    👤
                  </span>

                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                      Organized By
                    </p>
                    <p className="mt-1 break-all font-medium">
                      {event.createdBy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <section className="mt-6 border-t pt-5">
                <h2 className="text-lg font-semibold">
                  About This Event
                </h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
                  {event.description}
                </p>
              </section>

              {/* Join Event */}
              <section className="mt-6 border-t pt-5 lg:mt-auto lg:pt-6">
                <h2 className="text-lg font-semibold">
                  Interested in Joining?
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Join this community event and help make a
                  positive impact.
                </p>

                <Button
                  type="button"
                  className="mt-4 w-full"
                  onClick={() => {
                    alert(
                      "Join Event will work after login and join functionality are implemented."
                    );
                  }}
                >
                  Join Event
                </Button>
              </section>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
