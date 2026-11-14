
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[550px] items-center overflow-hidden bg-emerald-950 sm:min-h-[600px]">
      {/* Full background image */}
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
      />

      {/* Overlay for readable text */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/80 to-white/20 dark:from-slate-950/95 dark:via-slate-950/75 dark:to-slate-950/30" />

      {/* Hero content */}
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-800 backdrop-blur-sm dark:border-emerald-800 dark:bg-slate-900/70 dark:text-emerald-300">
            <HeartHandshake className="size-4" />
            Make a Difference Together
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-7xl dark:text-white">
            Small Acts,
            <span className="block text-emerald-700 dark:text-emerald-400">
              Big Impact.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-700 sm:text-lg dark:text-slate-200">
            Discover meaningful community events, connect with passionate
            volunteers, and take action to create a better world with SebaTori.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-emerald-700"
            >
              Explore Events
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 text-sm font-semibold text-slate-800 backdrop-blur-sm transition-colors hover:bg-white dark:border-slate-600 dark:bg-slate-900/70 dark:text-white dark:hover:bg-slate-800"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
