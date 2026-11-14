
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  CalendarDays,
  LogIn,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  {
    label: "Upcoming Events",
    href: "/events",
    icon: CalendarDays,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-[#E8F5EF] dark:border-slate-700 dark:bg-slate-900">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[60px] w-full max-w-7xl items-center justify-between px-3 sm:h-[68px] sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="SebaTori home"
          className="flex w-fit min-w-0 shrink items-center gap-2 sm:gap-2.5"
        >
          <Image
            src="/logo.png"
            alt="SebaTori logo"
            width={44}
            height={44}
            priority
            className="size-8 shrink-0 rounded-lg object-contain sm:size-11 sm:rounded-xl"
          />

          <span className="flex min-w-0 flex-col">
            <span className="whitespace-nowrap text-sm font-extrabold leading-tight tracking-tight text-emerald-700 dark:text-emerald-400 sm:text-xl">
              SebaTori
            </span>

            <span className="whitespace-nowrap text-[7px] font-medium tracking-[0.1em] text-muted-foreground sm:text-[9px] sm:tracking-[0.12em]">
              COMMUNITY ACTION
            </span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center justify-center md:flex">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Theme toggle */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-full sm:size-10"
            aria-label={
              mounted && theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
            onClick={() => {
              if (mounted) {
                setTheme(theme === "dark" ? "light" : "dark");
              }
            }}
          >
            {!mounted ? (
              <Moon className="size-4" aria-hidden="true" />
            ) : theme === "dark" ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </Button>

          {/* Desktop and tablet Login */}
          <Link
            href="/login"
            className="hidden h-10 min-w-[92px] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 sm:inline-flex"
          >
            <LogIn className="size-4 shrink-0" aria-hidden="true" />
            <span>Login</span>
          </Link>

          {/* Mobile menu */}
          <div className="shrink-0 md:hidden">
            <Sheet>
              <SheetTrigger
                aria-label="Open navigation menu"
                className="inline-flex size-8 items-center justify-center rounded-lg border border-input bg-background sm:size-10 sm:rounded-xl"
              >
                <Menu
                  className="size-4 sm:size-5"
                  aria-hidden="true"
                />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[280px] sm:w-[340px]"
              >
                <SheetHeader className="border-b pb-5 text-left">
                  <SheetTitle>
                    <span className="flex items-center gap-3">
                      <Image
                        src="/logo.png"
                        alt="SebaTori logo"
                        width={40}
                        height={40}
                        className="size-10 rounded-lg object-contain"
                      />

                      <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                        SebaTori
                      </span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 pt-6">
                  {/* Home */}
                  <Link
                    href="/"
                    aria-current={
                      pathname === "/" ? "page" : undefined
                    }
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                      pathname === "/"
                        ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : "text-foreground"
                    }`}
                  >
                    Home
                  </Link>

                  {/* Navigation links */}
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                          active
                            ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "text-foreground"
                        }`}
                      >
                        <Icon
                          className="size-4"
                          aria-hidden="true"
                        />
                        {item.label}
                      </Link>
                    );
                  })}

                  <div className="my-3 border-t" />

                  {/* Mobile Login */}
                  <Link
                    href="/login"
                    className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                  >
                    <LogIn className="size-4" aria-hidden="true" />
                    Login
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
