
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API_URL = "process.env.NEXT_PUBLIC_API_URL";

const initialFormData = {
  title: "",
  description: "",
  eventType: "Cleanup",
  thumbnail: "",
  location: "",
  eventDate: "",
};

export default function CreateEventPage() {
  const router = useRouter();

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const userEmail = session?.user?.email?.trim().toLowerCase();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userEmail) {
      toast.error("Please login before creating an event.");
      return;
    }

    if (formData.eventDate <= minDate) {
      toast.error("Please select a future event date.");
      return;
    }

    try {
      setLoading(true);

      const { data: tokenData, error: tokenError } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Unable to get JWT token. Please log in again.");
      }

      const jwtToken = tokenData.token;

      const eventData = {
        ...formData,
      };

      const response = await fetch(`${API_URL}/add-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.msg || "Failed to create event."
        );
      }

      toast.success("Event created successfully!");

      setFormData(initialFormData);

      router.push("/manage-events");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      toast.error("Failed to create event", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();

  const minDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  
  if (sessionLoading) {
    return (
      <main className="min-h-screen bg-muted/40 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Header Skeleton */}
          <div className="mb-8 space-y-3 text-center">
            <div className="mx-auto h-4 w-40 animate-pulse rounded bg-muted" />
            <div className="mx-auto h-9 w-56 max-w-full animate-pulse rounded bg-muted sm:h-10 sm:w-72" />
            <div className="mx-auto h-4 w-full max-w-md animate-pulse rounded bg-muted" />
          </div>

          {/* Form Skeleton */}
          <div className="space-y-6 rounded-xl border bg-card p-5 shadow-sm sm:p-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
              </div>
            ))}

            {/* Creator Email */}
            <div className="space-y-2">
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
            </div>

            {/* Submit Button */}
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (!userEmail) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please Login</h1>

          <p className="mt-2 text-muted-foreground">
            You need to login before creating an event.
          </p>

          <Button
            className="mt-5"
            onClick={() => router.push("/login")}
          >
            Login Now
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            SebaTori Community
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Create an Event
          </h1>

          <p className="mt-3 text-muted-foreground">
            Bring your community together and make a positive impact.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border bg-card p-5 shadow-sm sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>

            <Input
              id="title"
              name="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              name="description"
              placeholder="Describe your event..."
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>

            <Select
              value={formData.eventType}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  eventType: value ?? "",
                })
              }
            >
              <SelectTrigger id="eventType" className="w-full">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Cleanup">Cleanup</SelectItem>
                <SelectItem value="Plantation">Plantation</SelectItem>
                <SelectItem value="Donation">Donation</SelectItem>
                <SelectItem value="Community Service">
                  Community Service
                </SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate">Event Date</Label>

            <Input
              id="eventDate"
              name="eventDate"
              type="date"
              min={minDate}
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">
              Thumbnail Image URL
            </Label>

            <Input
              id="thumbnail"
              name="thumbnail"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.thumbnail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>

            <Input
              id="location"
              name="location"
              placeholder="Enter event location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="createdBy">Creator Email</Label>

            <Input
              id="createdBy"
              type="email"
              value={userEmail}
              readOnly
              disabled
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating Event..." : "Create Event"}
          </Button>
        </form>
      </div>
    </main>
  );
}
