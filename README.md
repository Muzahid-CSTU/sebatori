# SebaTori — Community Service Events Platform

**Assignment:** B14-A8 (Category Hermione)
**Live site:** _Not deployed yet — add the Vercel URL here: `https://your-project.vercel.app`_
**Repos:** `client` (this repo, Next.js) · `server` (Express + MongoDB, separate repo)

SebaTori is a community-driven event platform where people create, discover, join, and
manage social-service events — winter-clothes distribution, blanket drives, cleanups,
tree plantation, donation campaigns, and more.

_Status checked: 16 November 2026._

## Core features

- Email + password registration and login (Better Auth with the MongoDB adapter), plus Google sign-in support (needs OAuth credentials).
- Password validation with toast/inline errors: at least 6 characters, one uppercase, one lowercase.
- Light/dark theme toggle that themes the whole app.
- Upcoming Events grid (dynamic from MongoDB) with thumbnail, title, type, location, date, and a View Event page.
- Create Event form with event types, thumbnail URL, location, and future-date-only validation.
- Public event details page with organizer, schedule, location, and description.
- Responsive navbar with profile dropdown and mobile drawer, plus a designed footer.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI) |
| Auth | Better Auth (email/password + Google), MongoDB adapter |
| Backend | Express 5, MongoDB (native driver), CORS |
| Notifications | `sonner` toasts |
| Theme | `next-themes` (`.dark` class) |

## Implementation status

Legend: ✅ implemented · ⚠️ partial / needs work · ❌ not implemented yet · ➖ not applicable yet

### Layout & navigation

| Requirement | Status | Notes |
| --- | --- | --- |
| Navbar with logo/name | ✅ | `src/components/navbar.tsx`, `/logo.png` |
| Upcoming Events link | ✅ | `/events` |
| Conditional Login/Logout | ✅ | Login button when logged out; profile + Logout when logged in |
| Profile picture dropdown | ✅ | Create Event / Manage Events / Joined Events links |
| Display name on avatar hover | ✅ | Native tooltip via the avatar's `title` |
| Footer with relevant info | ✅ | `src/components/footer.tsx` — brand, quick links, contact, copyright |
| Responsive navbar (mobile drawer) | ✅ | Base UI `Sheet` |
| Dropdown pages actually exist | ❌ | `/manage-events` and `/joined-events` are linked but missing → 404 |

### Authentication

| Requirement | Status | Notes |
| --- | --- | --- |
| Login page: email + password | ✅ | `/login` |
| Login: Google (or GitHub) | ⚠️ | Code is implemented, but `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` are empty in `.env`, so the flow cannot complete |
| Login → Register link | ✅ | |
| Register: name, email, photoURL, password | ✅ | `/signup`; photoURL is stored as the user's image |
| Register → Login link | ✅ | |
| Password rules (≥6, uppercase, lowercase) | ✅ | Client-side checks + toast, server-side `minPasswordLength: 6` |
| Error message/toast on invalid password | ✅ | Inline error + toast |
| Success toast after login/registration | ✅ | `sonner`; Google success toast on `/` via `?auth=google` |
| No email verification | ✅ | `requireEmailVerification: false` |
| No forgot-password | ✅ | Not implemented (per assignment instructions) |

### Home page

| Requirement | Status | Notes |
| --- | --- | --- |
| Banner/hero section | ✅ | `src/components/hero.tsx` with `/hero.png` |
| Features section | ❌ | Not built |
| Recent 6 upcoming events via MongoDB `.limit()` | ❌ | Home renders only the hero; no `.limit()` query anywhere |
| Gallery (static community photos) | ❌ | No gallery assets or section |
| Newsletter section (design only) | ❌ | Not built |

### Events

| Requirement | Status | Notes |
| --- | --- | --- |
| Create Event page (private) | ⚠️ | Form works, but the route is **not protected** and the creator email is typed manually instead of read from the session |
| Event fields: title, description, type, thumbnail, location, date | ✅ | Type dropdown: Cleanup, Plantation, Donation, Community Service, Other |
| No past dates allowed | ✅ | `min` on the date input + future-date check |
| Store creator email with the event | ✅ | `createdBy` field (manual input) |
| Success message + redirect to Upcoming Events | ⚠️ | Inline success message exists, but there is **no redirect** to `/events` |
| Private route protection | ❌ | No `proxy.ts`/middleware; `/create-event` opens for logged-out users |
| Upcoming Events page (public) | ✅ | Fetches from the API, hides past events, sorts by date |
| Event cards: thumbnail, title, location, type, date, View Event | ✅ | 1/2/3-column responsive grid, equal-height cards |
| Only upcoming events shown | ✅ | Client-side date filter |
| Event details page (public) | ✅ | `/events/[id]` works without login |
| Join Event button | ❌ | Placeholder `alert()` — does not check login, save anything, or update UI |
| Store joined event + user in DB | ❌ | No join API/collection |
| Joined Events page (private), sorted by date | ❌ | Missing (navbar link 404) |
| Manage Events page (private) | ❌ | Missing (navbar link 404) |
| Update event | ❌ | No page/API |
| Delete event | ❌ | No API |
| Only owners can update/delete | ❌ | No ownership checks (nothing to enforce yet) |

### Backend (Express)

| Requirement | Status | Notes |
| --- | --- | --- |
| MongoDB connection | ✅ | `server/index.js`, database `sebatori`, collection `event` |
| `POST /add-event` | ✅ | Inserts the event document |
| `GET /events` | ✅ | Returns all events |
| `GET /events/:id` | ✅ | Returns one event, validates ObjectId |
| Join / joined-events endpoints | ❌ | |
| Update / delete endpoints | ❌ | |
| Server-side validation | ❌ | Validation lives only in the browser |
| JWT-protected APIs | ❌ | Server has no auth middleware; only Better Auth session cookies on the Next.js side |

### UI design requirements

| Requirement | Status | Notes |
| --- | --- | --- |
| Unique design (not copied) | ✅ | Custom emerald/community theme, SebaTori branding |
| Consistent heading style | ⚠️ | Consistent on events pages; `/login` uses a different scale and raw inputs |
| Balanced paragraph spacing | ✅ | |
| Uniform image sizes | ✅ | Event cards use a fixed `16/10` thumbnail ratio |
| Same button style as home | ⚠️ | Login uses raw `<button>`, other pages use the shadcn `Button` |
| Good spacing and alignment | ✅ | |
| Navbar logo style consistent | ✅ | Same logo/wordmark in header, drawer, and footer |
| Equal-size card grid | ✅ | `grid` + `flex h-full` cards |
| New X logo (not old Twitter bird) | ➖ | No social links in the footer yet; use the new X logo when they are added |
| Responsive (mobile/tablet/desktop) | ✅ | Tailwind breakpoints across all pages |

### Challenge requirements

| Requirement | Status | Notes |
| --- | --- | --- |
| Validation in auth forms | ✅ | Signup has full rules; login relies on required + server response |
| Validation in Create Event form | ✅ | Required fields, URL input, future date |
| Validation in Update Event form | ❌ | No update form yet |
| Theme toggle (light ↔ dark) | ✅ | Navbar button, persisted by `next-themes` |
| JWT validation for protected APIs | ❌ | Not implemented |
| Responsive on mobile/tablet/desktop | ✅ | Tailwind breakpoints used throughout |

### Optional tasks (2 of 3 required)

| Optional task | Status | Notes |
| --- | --- | --- |
| Loading skeletons | ❌ | Pages show plain "Loading..." text |
| Profile view + update (name, photo) | ❌ | No profile page |
| One extra feature | ❌ | Nothing beyond the required features yet |

### Submission / key rules

| Rule | Status | Notes |
| --- | --- | --- |
| README with site name + features | ✅ | This file (live URL still a placeholder) |
| Live site URL | ❌ | Not deployed |
| Minimum 15 client commits | ❌ | 7 commits at the time of writing |
| Minimum 8 server commits | ❌ | 3 commits at the time of writing |
| No Lorem ipsum text | ✅ | No placeholder copy found |
| No default browser alerts | ❌ | Join Event still uses `alert()`; everything else uses toasts |
| No error when reloading any route | ⚠️ | Existing routes reload fine; `/manage-events` and `/joined-events` 404 |
| Logged-in user not redirected on private-route reload | ❌ | No protected routes/session gate implemented yet |

## Known issues and next steps

Priority order for finishing the assignment:

1. **Join flow:** add `POST /events/:id/join` + `GET /joined-events`, save `{ eventId, userEmail, ... }`, replace the `alert()` with a real button state and a toast.
2. **Joined Events page** (`/joined-events`): list the logged-in user's joined events, sorted by event date.
3. **Manage Events page** (`/manage-events`): list the user's own events, add update + delete, and enforce ownership on the server.
4. **Route protection:** add `proxy.ts` (Next 16's replacement for `middleware.ts`) so `/create-event`, `/manage-events`, and `/joined-events` redirect logged-out users to `/login`, and keep sessions stable on reload.
5. **Home page sections:** features, six recent events with `.limit(6)` in MongoDB, static gallery, newsletter design.
6. **Create Event:** read name/email from the session instead of a manual email field; redirect to `/events` with a success toast.
7. **JWT:** issue/verify JWTs with Better Auth's JWT plugin and protect the Express endpoints that need it.
8. **Google sign-in:** add real `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` values (redirect URI `http://localhost:3000/api/auth/callback/google`). The `/login` Google button also needs the same "not configured" guard that `/signup` has.
9. **Deployment:** replace the hardcoded `API_URL = "http://localhost:8000"` with an env variable, deploy the client and server, and add the live URL above.
10. **Optional picks:** loading skeletons and a profile page are the quickest two to add.

## Getting started

### Client (`client/`)

```bash
npm install
npm run dev        # http://localhost:3000
npx tsc --noEmit   # type check
npm run lint       # ESLint
npm run build      # production build
```

### Server (`server/`)

```bash
npm install
node index.js              # http://localhost:8000
# or, for auto-restart while editing:
npx nodemon index.js
```

_There is no `dev` script in `server/package.json` yet._

### Environment variables

Client `.env`:

```env
MONGODB_URI=...            # same database as the server
BETTER_AUTH_SECRET=...
GOOGLE_CLIENT_ID=...       # required only for Google sign-in
GOOGLE_CLIENT_SECRET=...
# NEXT_PUBLIC_BETTER_AUTH_URL=   # optional, defaults to same-origin /api/auth
```

Server `.env`:

```env
MONGODB_URI=...
PORT=8000
```

## Project structure

```text
client/src
├── app
│   ├── page.tsx              # home (hero only for now)
│   ├── login/                # email/password + Google login
│   ├── signup/               # page.tsx (server) + signup-form.tsx (client)
│   ├── events/               # upcoming events + [id] details
│   ├── create-event/         # create form
│   └── api/auth/[...all]/    # Better Auth handler
├── components                # navbar, footer, hero, ui primitives
└── lib                       # auth, auth-client, google-oauth
server
└── index.js                  # Express API: add-event, events, events/:id
```
