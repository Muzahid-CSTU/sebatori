
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import type { Event } from "@/components/events/event-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const API_URL = "http://localhost:8000";

export default function ManageEventsPage() {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(
    null
  );

  const email = session?.user?.email?.trim().toLowerCase();

  // Fetch only the logged-in user's events
  useEffect(() => {
    if (sessionLoading) return;

    if (!email) {
      setLoading(false);
      return;
    }

    const fetchMyEvents = async () => {
      try {
        setLoading(true);

        const { data: tokenData, error: tokenError } =
          await authClient.token();

        if (tokenError || !tokenData?.token) {
          throw new Error(
            "Unable to get authentication token. Please log in again."
          );
        }

        const response = await fetch(`${API_URL}/my-events`, {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || result.msg || "Failed to fetch your events."
          );
        }

        setEvents(result);
      } catch (error) {
        console.error("Fetch events error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Could not load your events."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [email, sessionLoading]);

  // Update event
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingEvent || !email) return;

    try {
      setSaving(true);

      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          "Unable to get authentication token. Please log in again."
        );
      }

      const response = await fetch(
        `${API_URL}/events/${editingEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify({
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
        throw new Error(
          result.message || result.msg || "Failed to update event."
        );
      }

      setEvents((previousEvents) =>
        previousEvents.map((event) =>
          event._id === editingEvent._id ? editingEvent : event
        )
      );

      setEditingEvent(null);
      toast.success("Event updated successfully!");
    } catch (error) {
      console.error("Update event error:", error);
      toast.error(
        error instanceof Error ? error.message : "Update failed."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete event
  const handleDelete = async (eventId: string) => {
    if (!email || deletingEventId) return;

    try {
      setDeletingEventId(eventId);

      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          "Unable to get authentication token. Please log in again."
        );
      }

      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.msg || "Failed to delete event."
        );
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== eventId)
      );

      if (editingEvent?._id === eventId) {
        setEditingEvent(null);
      }

      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Delete event error:", error);
      toast.error(
        error instanceof Error ? error.message : "Delete failed."
      );
    } finally {
      setDeletingEventId(null);
    }
  };

  // Loading skeleton
  if (sessionLoading || loading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="h-4 w-64 max-w-full animate-pulse rounded bg-muted" />
          </div>

          <div className="h-11 w-32 animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center"
            >
              <div className="h-40 w-full shrink-0 animate-pulse rounded-lg bg-muted sm:h-28 sm:w-40" />

              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              </div>

              <div className="flex gap-2 sm:shrink-0">
                <div className="h-9 w-16 animate-pulse rounded-lg bg-muted" />
                <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // Login required
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
            You haven&apos;t created any events yet.
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
                    type="button"
                    onClick={() => setEditingEvent({ ...event })}
                    className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Edit
                  </button>

                  <AlertDialog>
                    <AlertDialogTrigger
                      className="rounded-lg border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                    >
                      Delete
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete this event?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                          Are you sure you want to delete &quot;
                          {event.title}&quot;? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                          disabled={deletingEventId !== null}
                          onClick={() => handleDelete(event._id)}
                          className="bg-destructive text-white hover:bg-destructive/90"
                        >
                          {deletingEventId === event._id
                            ? "Deleting..."
                            : "Delete Event"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
                        min={new Date().toISOString().slice(0, 10)}
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
