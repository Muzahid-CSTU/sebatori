import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

const linkGroups = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "Upcoming Events", href: "/events" },
      { name: "Login", href: "/login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-emerald-50/70 dark:bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12">

          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="SebaTori logo"
                width={42}
                height={42}
                className="size-9 object-contain sm:size-11"
              />

              <div>
                <h2 className="text-lg font-bold leading-tight text-emerald-700 dark:text-emerald-400 sm:text-xl">
                  SebaTori
                </h2>
                <p className="text-[9px] font-medium uppercase tracking-widest text-muted-foreground">
                  Community Action
                </p>
              </div>
            </Link>

            <p className="mt-3 max-w-md text-xs leading-6 text-muted-foreground sm:mt-4 sm:text-sm sm:leading-7">
              Bringing people together through community events,
              volunteering, and meaningful acts of kindness.
              Together, we can create a better tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-bold sm:mb-4 sm:text-base">
              Quick Links
            </h3>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1 sm:gap-y-3">
              {linkGroups[0].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
                  >
                    <ArrowUpRight className="size-3.5 shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="mb-3 text-sm font-bold sm:mb-4 sm:text-base">
              Get in Touch
            </h3>

            <div className="space-y-3 text-xs leading-5 text-muted-foreground sm:space-y-4 sm:text-sm sm:leading-6">
              <p className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                Have questions? Contact our team through the platform.
              </p>

              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                Building stronger communities, together.
              </p>

              <p className="flex items-start gap-2">
                <Heart className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                Every act of kindness matters.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-7 border-t border-emerald-200/70 pt-5 text-center dark:border-border sm:mt-10 sm:pt-6">
          <p className="text-[11px] text-muted-foreground sm:text-xs">
            © {new Date().getFullYear()} SebaTori. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
