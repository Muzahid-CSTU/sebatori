
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Password validation
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter (A-Z).");
      return;
    }

    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter (a-z).");
      return;
    }

    if (!hasMinLength) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL || undefined,
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Registration successful!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign-up failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  const validationItems = [
    {
      valid: hasUppercase,
      label: "At least one uppercase letter (A-Z)",
    },
    {
      valid: hasLowercase,
      label: "At least one lowercase letter (a-z)",
    },
    {
      valid: hasMinLength,
      label: "Minimum 6 characters length",
    },
  ];

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Join SebaTori and make a difference in your community.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="photoURL" className="text-sm font-medium">
              Photo URL
            </label>

            <input
              id="photoURL"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={6}
              required
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            />

            <div className="space-y-1.5 pt-1 text-xs">
              {validationItems.map((item) => (
                <p
                  key={item.label}
                  className={`flex items-center gap-2 ${
                    item.valid
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="text-sm">
                    {item.valid ? "✓" : "○"}
                  </span>
                  {item.label}
                </p>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading || googleLoading}
          className="w-full rounded-lg border px-4 py-2.5 font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
