<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SebaTori — client

Community-service event site. Next.js **16.4.6** App Router, React 19, Tailwind CSS v4, shadcn/ui `base-nova` style (Base UI, not Radix). `README.md` is unmodified create-next-app boilerplate — trust `package.json` and this file instead.

## Commands

Use npm (`package-lock.json` is the lockfile).

- `npm run dev` — Turbopack is the default builder in Next 16; no flag needed.
- `npm run build` / `npm start`
- `npm run lint` — ESLint flat config; `next lint` no longer exists in Next 16.
- `npx tsc --noEmit` — there is **no** `typecheck` script; run this before finishing.
- No test runner is configured. Verify with `npx tsc --noEmit` + `npm run lint`, plus `npm run build` when touching routing or CSS.

Baseline lint is currently red on `src/components/navbar.tsx` (`react-hooks/set-state-in-effect` from the `setMounted(true)` hydration guard). Don't copy that pattern: gate theme-dependent UI with Tailwind `dark:` classes or `useSyncExternalStore` instead of a `mounted` effect.

## Architecture

- App shell: `src/app` (`layout.tsx` holds fonts, metadata, `ThemeProvider`, `Navbar`, `Toaster`; `page.tsx` renders `Hero`). Alias `@/*` → `src/*`.
- `src/components/` = page sections (`navbar`, `hero`); `src/components/ui/` = shadcn primitives.
- Routes: `/`, `/events`, `/events/[id]`, `/create-event`, `/signup`. `/login` is linked from the navbar but not implemented yet.
- Next 16 deltas that bite: `params`/`searchParams` are Promises, route typing uses the global `PageProps<'/path'>` / `LayoutProps<'/path'>` helpers (no import — see `layout.tsx`), and `middleware.ts` is now `proxy.ts`.

## Auth

- Better Auth with email + password and the MongoDB adapter: server config `src/lib/auth.ts`, browser client `src/lib/auth-client.ts`, handler `src/app/api/auth/[...all]/route.ts`.
- `.env` (gitignored) needs `MONGODB_URI` (the same database as `../server`) and `BETTER_AUTH_SECRET`. Without `MONGODB_URI`, every `/api/auth/*` request returns 500.
- Signup password rules live in two places: uppercase/lowercase checks are client-side in `src/app/signup/signup-form.tsx`, while the 6-character minimum is server-side via `emailAndPassword.minPasswordLength: 6` in `src/lib/auth.ts` (Better Auth defaults to 8).
- `/signup` is a server wrapper (`src/app/signup/page.tsx`, `force-dynamic`) around the `SignupForm` client component. `src/lib/google-oauth.ts` is the single source of truth for Google credentials; the provider only registers when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are non-empty, and the form shows an inline setup card (no credentials yet → no confusing redirect).
- Google redirect URI to authorize in Google Cloud: `http://localhost:3000/api/auth/callback/google`. After the OAuth redirect, `SocialAuthToast` (mounted on `/`) shows the success toast from `?auth=google`; OAuth errors come back to `/signup` via `errorCallbackURL` and surface as a toast.
- Toasts use `sonner` via `@/components/ui/sonner`; `<Toaster />` is mounted in the root layout.

## UI conventions (differ from most shadcn projects)

- **Compose with `render`, not `asChild`:** `<Button render={<Link href="/login" />}>Login</Button>`. Base UI parts also use `render` (e.g. `SheetTrigger`).
- Import the class helper from the **`cn` package**: `import { cn } from "cn"`. Generated `ui/` files do this; `src/lib/utils.ts` only re-exports it.
- Base UI naming, not Radix: `SheetPrimitive.Backdrop`, and animation hooks are `data-starting-style` / `data-ending-style` (not `data-state`).
- Add primitives with `npx shadcn add <component>`; `components.json` points components to `src/components/ui`, utils to `src/lib/utils`, hooks to `src/hooks`.
- Tailwind v4: there is **no `tailwind.config.*`**. Design tokens and dark palette live in `src/app/globals.css` (`@theme inline`, `:root` / `.dark` variables); `next.config.ts` registers the `@tailwindcss/turbopack` loader for CSS. Dark mode is the `.dark` class applied by `next-themes` (default light).
