
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { Event } from "@/components/events/event-card";

const API_URL = "http://localhost:8000";

export default function ManageEventsPage() {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [saving, setSaving] = useState(false);

  const email = session?.user?.email?.trim().toLowerCase();

  useEffect(() => {
    if (sessionLoading) return;

    if (!email) {
      setLoading(false);
      return;
    }

    const fetchMyEvents = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/my-events?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch your events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
        toast.error("Could not load your events.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [email, sessionLoading]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingEvent || !email) return;

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/events/${editingEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: email,
            title: editingEvent.title,
            description: editingEvent.description,
            eventType: editingEvent.eventType,
            thumbnail: editingEvent.thumbnail,
            location: editingEvent.location,
            eventDate: editingEvent.eventDate,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event");
      }

      setEvents((previousEvents) =>
        previousEvents.map((event) =>
          event._id === editingEvent._id ? editingEvent : event
        )
      );

      setEditingEvent(null);
      toast.success("Event updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!email) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/events/${eventId}?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event");
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== eventId)
      );

      if (editingEvent?._id === eventId) {
        setEditingEvent(null);
      }

      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Delete failed"
      );
    }
  };

  if (sessionLoading || loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading your events...</p>
      </main>
    );
  }

  if (!email) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please Login</h1>
          <p className="mt-2 text-muted-foreground">
            Login to manage your events.
          </p>
          <Link
            href="/login"
            className="mt-5 inline-block rounded-lg bg-primary px-6 py-3 text-primary-foreground"
          >
            Login Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            Manage Events
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage the events you have created.
          </p>
        </div>

        <Link
          href="/create-event"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
        >
          + Create Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center sm:p-12">
          <h2 className="text-lg font-semibold">
            You haven't created any events yet.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first event and bring people together.
          </p>
          <Link
            href="/create-event"
            className="mt-5 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Create an Event
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {events.map((event) => (
            <div
              key={event._id}
              className="overflow-hidden rounded-xl border bg-card"
            >
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <img
                  src={event.thumbnail}
                  alt={event.title}
                  className="h-40 w-full rounded-lg object-cover sm:h-28 sm:w-40"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-primary">
                    {event.eventType}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.location}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.eventDate}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => setEditingEvent({ ...event })}
                    className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="rounded-lg border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingEvent?._id === event._id && (
                <form
                  onSubmit={handleUpdate}
                  className="space-y-4 border-t bg-muted/30 p-4 sm:p-6"
                >
                  <h3 className="text-lg font-semibold">Edit Event</h3>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Event Title
                    </label>
                    <input
                      required
                      value={editingEvent.title}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          title: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={editingEvent.description}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          description: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Event Type
                      </label>
                      <input
                        required
                        value={editingEvent.eventType}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            eventType: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Location
                      </label>
                      <input
                        required
                        value={editingEvent.location}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            location: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Event Date
                      </label>
                      <input
                        required
                        type="date"
                        value={editingEvent.eventDate.slice(0, 10)}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            eventDate: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Thumbnail URL
                      </label>
                      <input
                        required
                        type="url"
                        value={editingEvent.thumbnail}
                        onChange={(e) =>
                          setEditingEvent({
                            ...editingEvent,
                            thumbnail: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingEvent(null)}
                      className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-muted"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
