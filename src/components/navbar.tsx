
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  CalendarDays,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserRound,
  PlusCircle,
  ClipboardList,
  CalendarCheck,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
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

const privateNavigation = [
  {
    label: "Create Event",
    href: "/create-event",
    icon: PlusCircle,
  },
  {
    label: "Manage Events",
    href: "/manage-events",
    icon: ClipboardList,
  },
  {
    label: "Joined Events",
    href: "/joined-events",
    icon: CalendarCheck,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => pathname === href;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed.");
        return;
      }

      toast.success("Logged out successfully.");
      closeMobileMenu();
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const profileImage =
  user?.image ||
  (user as typeof user & { photoURL?: string } | undefined)?.photoURL ||
  null;

  const displayName = user?.name || user?.email || "My Account";

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

          {/* Desktop authentication */}
          {!isPending &&
            (user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <details className="group relative">
                  <summary
                    title={displayName}
                    aria-label={`Profile menu for ${displayName}`}
                    className="flex cursor-pointer list-none items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={`${displayName}'s profile`}
                        width={38}
                        height={38}
                        referrerPolicy="no-referrer"
                        className="size-9 rounded-full border border-emerald-200 object-cover"
                      />
                    ) : (
                      <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                        <UserRound className="size-5" />
                      </span>
                    )}
                  </summary>

                  <div className="invisible absolute right-0 top-full z-50 mt-2 w-56 translate-y-1 rounded-xl border bg-background p-2 opacity-0 shadow-lg transition-all group-open:visible group-open:translate-y-0 group-open:opacity-100">
                    <div className="border-b px-3 py-2">
                      <p className="truncate text-sm font-semibold">
                        {displayName}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>

                    {privateNavigation.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted"
                        >
                          <Icon className="size-4" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </details>

                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 rounded-xl"
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  <LogOut className="size-4" />
                  {loggingOut ? "Logging out..." : "Logout"}
                </Button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden h-10 min-w-[92px] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-emerald-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 sm:inline-flex"
              >
                <LogIn className="size-4 shrink-0" />
                Login
              </Link>
            ))}

          {/* Mobile menu */}
          <div className="shrink-0 md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger
                aria-label="Open navigation menu"
                className="inline-flex size-8 items-center justify-center rounded-lg border border-input bg-background sm:size-10 sm:rounded-xl"
              >
                <Menu className="size-4 sm:size-5" aria-hidden="true" />
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
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    aria-current={pathname === "/" ? "page" : undefined}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                      pathname === "/"
                        ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : "text-foreground"
                    }`}
                  >
                    Home
                  </Link>

                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                          active
                            ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "text-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                        {item.label}
                      </Link>
                    );
                  })}

                  {!isPending && user && (
                    <>
                      <div className="my-3 border-t" />

                      <div className="flex items-center gap-3 px-4 py-2">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt={`${displayName}'s profile`}
                            width={40}
                            height={40}
                            referrerPolicy="no-referrer"
                            className="size-9 rounded-full border border-emerald-200 object-cover"
                          />
                        ) : (
                          <span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                            <UserRound className="size-5" />
                          </span>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {displayName}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {privateNavigation.map((item) => {
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                          >
                            <Icon className="size-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </>
                  )}

                  <div className="my-3 border-t" />

                  {!isPending &&
                    (user ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-center gap-2 rounded-xl"
                        onClick={handleLogout}
                        disabled={loggingOut}
                      >
                        <LogOut className="size-4" />
                        {loggingOut ? "Logging out..." : "Logout"}
                      </Button>
                    ) : (
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                        className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                      >
                        <LogIn className="size-4" />
                        Login
                      </Link>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
