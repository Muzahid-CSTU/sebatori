
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  HeartHandshake,
  Mail,
  MapPin,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Login", href: "/login" },
];

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-[#E8F5EF] text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="SebaTori home"
            >
              <Image
                src="/logo.png"
                alt="SebaTori logo"
                width={48}
                height={48}
                className="size-11 rounded-xl object-contain"
              />

              <span>
                <span className="block text-xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-400">
                  SebaTori
                </span>
                <span className="block text-[10px] font-medium tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  COMMUNITY ACTION
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              Bringing people together through community events,
              volunteering, and meaningful acts of kindness.
              Together, we can create a better tomorrow.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Quick Links
            </h2>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
                  >
                    <ArrowUpRight className="size-3.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Our Community
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Discover opportunities to volunteer, support local
              initiatives, and make a positive impact in your community.
            </p>

            <Link
              href="/events"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              <CalendarDays className="size-4" />
              Explore Events
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Get in Touch
            </h2>

            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm leading-6">
                <Mail className="mt-1 size-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <span className="text-slate-600 dark:text-slate-400">
                  Have questions? Contact our team through the platform.
                </span>
              </li>

              <li className="flex items-start gap-3 text-sm leading-6">
                <MapPin className="mt-1 size-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <span className="text-slate-600 dark:text-slate-400">
                  Building stronger communities, together.
                </span>
              </li>

              <li className="flex items-start gap-3 text-sm leading-6">
                <HeartHandshake className="mt-1 size-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <span className="text-slate-600 dark:text-slate-400">
                  Every act of kindness matters.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-emerald-200 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left dark:border-slate-700 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} SebaTori. All rights reserved.
          </p>

          <p className="flex items-center justify-center gap-1.5">
            Made for a better community
          </p>
        </div>
      </div>
    </footer>
  );
}
