"use client"

import { ArrowRight, Mail, HeartHandshake } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-16 lg:px-16">

          {/* Background Decoration */}
          <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full border-[40px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full border-[40px] border-white/5" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-white/15">
              <Mail className="size-7" />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
              Stay Connected
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Good Things Happen When We Stay Connected.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-primary-foreground/80">
              Get updates about upcoming community events, volunteer
              opportunities, and inspiring stories of positive change.
            </p>

            {/* Newsletter Form - Design Only */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl bg-background p-2 sm:flex-row sm:rounded-full"
            >
              <div className="flex flex-1 items-center gap-3 px-4">
                <Mail className="size-5 shrink-0 text-muted-foreground" />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="h-11 w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:rounded-full"
              >
                Subscribe
                <ArrowRight className="size-4" />
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-primary-foreground/70">
              Together, let's make a positive difference.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
