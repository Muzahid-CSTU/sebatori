
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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

const API_URL = "http://localhost:8000";

const initialFormData = {
  title: "",
  description: "",
  eventType: "Cleanup",
  thumbnail: "",
  location: "",
  eventDate: "",
  createdBy: "",
};

export default function CreateEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

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
    setMessage("");
    setMessageType("");

    if (new Date(formData.eventDate) <= new Date()) {
      toast.error("Please select a future event date.");
      setMessage("Please select a future event date.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/add-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      toast.success("Event created successfully!");

      setFormData(initialFormData);

      setTimeout(() => {
        router.push("/events");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";

      toast.error("Failed to create event", {
        description: errorMessage,
      });

      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

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
                setFormData({ ...formData, eventType: value ?? "" })
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
            <Label htmlFor="thumbnail">Thumbnail Image URL</Label>
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
              name="createdBy"
              type="email"
              placeholder="you@example.com"
              value={formData.createdBy}
              onChange={handleChange}
              required
            />
          </div>

          {message && messageType === "error" && (
            <p
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Event..." : "Create Event"}
          </Button>
        </form>
      </div>
    </main>
  );
}
