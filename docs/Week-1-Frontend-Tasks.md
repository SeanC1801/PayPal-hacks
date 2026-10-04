# Week 1 — Frontend Tasks

Oct 4–10, 2026 · For: Guevarra (Frontend Lead, accountable for the result) and Liwanag (frontend backup and contributor)

## Goal

Build a **working visual skeleton** of the app using shared contracts and fixture data. By Saturday Oct 10 a teammate can open the app, see the shared header, move between Coach, Roadmap and Simulation, and see fixture data and placeholder buttons. Nothing is connected to a real AI, Airtable, Slack or PayPal.

## Design guidance

Use a quick sketch or wireframe when it helps clarify a screen. Do not block implementation on a design tool. The code must use the shared contract fields, not names invented only in a design file.

## Designated branch

Work from the `frontend` branch:

https://github.com/SeanC1801/PayPal-hacks/tree/frontend

Do not push directly to `main`. Coordinate shared contract changes with Flores and the backend team before changing frontend data shapes.

## Process

- Day 1: agree who builds which part (suggested split below). Keep changes focused and explain them in the pull request.
- Daily check-in: 10 minutes. Done, doing, blocked.
- Review each other's PRs quickly (within 12 hours).
- Never wait for the backend: build against the fixture procedures. If a contract looks wrong, raise it before building on it (see Contract rule).
- End of week: the frontend checklist below is reviewed before Week 2 is planned.

## What exists now

| Area | State in the repo |
|---|---|
| Next.js 15, TypeScript, Tailwind, ESLint | **Exists** |
| CI (lint, typecheck, build) | **Exists** (`.github/workflows/ci.yml`) |
| Placeholder pages `/coach`, `/roadmap`, `/simulation` | **Exists**, with the Week 1 visual skeleton |
| Placeholder pages `/budget`, `/approvals` | **Exists** from the earlier five-screen plan. Not in the header and not Week 1 work. Leave them alone |
| Shared header and tab navigation | **Exists** in `src/components/header.tsx` |
| tRPC client and React Query provider | **Missing.** Packages are installed but not wired |
| shadcn/ui | Not required for Week 1 |
| Contracts and fixtures | Partly exist. The backend team is finishing them (see the backend document) |

## Dependencies you rely on

| ID | Task | Owner | Status |
|---|---|---|---|
| 1.2 | Repo, CI, MIT license | Guevarra | Repo and CI exist locally; not yet pushed to GitHub |
| 1.3 | Zod contracts v1 | Flores | In progress. **Review them before you build** |
| 1.5 | Fixture-returning tRPC procedures | Cuison | In progress |

## Tasks

Task 1.8 in `tasks.md` is "App shell, navigation, low-fi wireframes". It is split below into four parts. The suggested split is by screen so work can run in parallel; adjust on Day 1 based on available hours. Guevarra stays accountable for all four.

### 1.8-A — Header, navigation and wireframes

| | |
|---|---|
| **Owner / Backup** | Guevarra / Liwanag |
| **Effort** | about 3 h |
| **Depends on** | 1.2 |

**Purpose:** one shared frame for the app and agreed layouts for every screen.

**What to build:** a header with three tabs (Coach, Roadmap, Simulation) that highlights the active one, plus a wireframe of each tab.

**Steps**
1. In your design tool, sketch the header and the three tabs. Export to `docs/wireframes/`.
2. Create `src/components/header.tsx` with the tabs as links to `/coach`, `/roadmap`, `/simulation`. Highlight the active tab with `usePathname()`.
3. Render the header from `src/app/layout.tsx` so it appears on every page.
4. Make `/` redirect to `/coach`.
5. Add a small "Fixture data — integrations not connected" badge to the header so everyone can tell what is real.

**Files:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/header.tsx`, `docs/wireframes/`
**Contract or fixture dependency:** none
**Expected visual result:** the header shows on all three tabs and the active tab is clearly marked.

**Definition of Done:** merged PR, CI green, wireframes committed, header visible on all three routes.
**Checklist item:** Header renders · All three tabs are reachable

### 1.8-B — Data plumbing and shared UI states

| | |
|---|---|
| **Owner / Backup** | Guevarra / Liwanag |
| **Effort** | about 2 h |
| **Depends on** | 1.5 (can start with a local stub) |

**Purpose:** one way for every screen to call the backend and show loading, empty and error states.

**What to build:** the tRPC client with React Query, and small reusable state components.

**Steps**
1. Create the tRPC React client (`src/lib/trpc.ts`) typed with `AppRouter` and a provider in `layout.tsx`.
2. Create `src/components/states.tsx` with `Loading`, `Empty`, `ErrorState` and a `StatusBadge` (pending, approved, disabled, placeholder).
3. Add a "Placeholder" style (dashed border or badge) used by everything that is not real yet.

**Files:** `src/lib/trpc.ts`, `src/components/states.tsx`, `src/app/layout.tsx`
**Contract or fixture dependency:** `AppRouter` type from `src/server/routers/app.ts`
**Expected visual result:** any screen can show a spinner, an empty message, an error with a retry button and consistent badges.

**Definition of Done:** merged PR, CI green, at least one screen uses the components.
**Checklist item:** Loading/error/empty states exist · Frontend uses the shared contracts

### 1.8-C — Coach tab

| | |
|---|---|
| **Owner / Backup** | Liwanag / Guevarra |
| **Effort** | about 5 h |
| **Depends on** | 1.8-A, 1.8-B, 1.5 |

**Purpose:** show the conversation entry point for the whole product.

**What to build** at `/coach`:
- Chat message history (user and Coach messages)
- Input field and Send button
- Suggested prompts that fill the input
- A fixture Coach reply after Send
- A **Prepare Airtable view** button and a **Prepare Slack draft** button
- A status panel stating that Airtable and Slack are **not connected**

**Steps**
1. Design the screen in your design tool; export the image.
2. Load history and suggested prompts from the fixture procedure (`coach.messages`).
3. Keep new messages in local React state. On Send, append the user message, show a loading state, then append the fixture reply.
4. Disable Send while the input is empty or a reply is loading.
5. Wire the two Prepare buttons to the fixture procedures (`integration.prepareAirtable`, `integration.prepareSlackDraft`). Show the returned status (for example "Prepared — pending approval") in the status panel.
6. Add empty (no messages), loading and error states.

**Files:** `src/app/coach/page.tsx`, `src/components/coach/*`
**Contract or fixture dependency:** `CoachMessage`, `IntegrationAction`
**Expected visual result:** a chat that visibly responds when you send a message, two working placeholder buttons and a clear "not connected" notice.

**Definition of Done:** merged PR, CI green, send interaction works locally, no network call leaves the app.
**Checklist item:** Coach input and send interaction work locally · Airtable and Slack placeholders are visible

### 1.8-D — Roadmap tab

| | |
|---|---|
| **Owner / Backup** | Liwanag / Guevarra |
| **Effort** | about 6 h |
| **Depends on** | 1.8-A, 1.8-B, 1.5 |

**Purpose:** show the roadmap, let the user edit a decision and see that approval is needed again.

**What to build** at `/roadmap`:
- Four weekly cards with roadmap items, status labels, due dates and dependencies
- **Edit decision**, **Save changes** and **Approve roadmap** buttons
- **Export / Print PDF** button (placeholder: calls `window.print()` with a print stylesheet, or shows "coming soon")
- Airtable preparation status and Slack draft status
- A pending-approval banner

**Steps**
1. Design the screen, including the "needs approval" and "approved" versions. Export the images.
2. Load the roadmap with `roadmap.get` and the decision with `decision.list`.
3. Render four week cards. Each item shows title, status badge, due date and "Depends on: …".
4. **Edit decision** opens a small form (hours per week, hourly rate). **Save changes** calls `decision.update`.
5. After saving, refetch the roadmap. The banner must visibly change to "Roadmap changed — needs approval again" and Approve must become enabled.
6. **Approve roadmap** calls `roadmap.approve`. Show an "Approved" state and disable the Approve button. Edit decision stays available; editing again returns the roadmap to "needs approval".
7. Show Airtable and Slack status badges (not connected / prepared / pending approval).
8. Add loading, empty and error states.

**Files:** `src/app/roadmap/page.tsx`, `src/components/roadmap/*`, optionally `src/app/print.css`
**Contract or fixture dependency:** `Roadmap`, `RoadmapItem`, `Decision`, `IntegrationAction`
**Expected visual result:** four week cards; after editing a decision the roadmap visibly flips to "needs approval", then to "approved" after approving.

**Definition of Done:** merged PR, CI green, edit then approve works end to end on fixtures.
**Checklist item:** Fixture data displays correctly · Roadmap edit state works · Approval state is visible · Export/print control is visible

### 1.8-E — Simulation tab

| | |
|---|---|
| **Owner / Backup** | Guevarra / Liwanag |
| **Effort** | about 4 h |
| **Depends on** | 1.8-A, 1.8-B, 1.5 |

**Purpose:** show the budget and what a decision would change.

**What to build** at `/simulation`:
- Current budget summary and initialized decisions
- Proposed payment schedule
- Budget impact
- A chart, or a chart placeholder
- **Update simulation** and **Apply changes** buttons
- A label on every number: **Illustrative estimate** or **Calculated**

**Steps**
1. Design the screen. Export the image.
2. Load `simulation.get`, `budget.getProposal`, `payment.list` and `decision.list`.
3. Render the budget summary, decisions list and payment schedule table (amounts shown from cents, for example 1250 → $12.50).
4. Chart: render a simple before/after chart from the simulation months, or a labelled placeholder if the chart library is not ready.
5. **Update simulation** refetches with the current inputs. **Apply changes** updates the decision through `decision.update`, then shows the roadmap-needs-approval notice with a link to the Roadmap tab.
6. Add loading, empty and error states.

**Files:** `src/app/simulation/page.tsx`, `src/components/simulation/*`
**Contract or fixture dependency:** `SimulationResult`, `BudgetProposal`, `PaymentLine`, `Decision`
**Expected visual result:** budget, decisions and payment schedule visible, a chart area, and clear labels showing which numbers are estimates.

**Definition of Done:** merged PR, CI green, all fixture numbers visible with labels.
**Checklist item:** Simulation budget and decisions are visible · Fixture data displays correctly

## Contract rule

- Use only fields from `src/contracts/`. Do not create frontend-only data shapes for server data.
- Review the contracts before you build on them. Any contract change needs one frontend and one backend reviewer.
- If you need a field that does not exist, ask Flores in the PR; do not add it locally.

## Frontend checklist

- [ ] Header renders on every page
- [ ] All three tabs are reachable and the active tab is shown
- [ ] Fixture data displays correctly on each tab
- [ ] Coach input and Send interaction work locally
- [ ] Roadmap edit state works (edit → needs approval → approve)
- [ ] Approval state is visible
- [ ] Export/print control is visible
- [ ] Airtable and Slack placeholders are visible and labelled "not connected"
- [ ] Simulation budget and decisions are visible
- [ ] Loading, error and empty states exist
- [ ] Frontend uses the shared contracts
- [ ] Wireframes for the three tabs are in `docs/wireframes/`
- [ ] No external Airtable or Slack calls are made in Week 1
- [ ] CI is green and the app runs locally (or on Render if 1.7 is done)

## Repository guide

| Path | Use it for | Frontend rule |
|---|---|---|
| `src/app/` | Pages and routes | **Yours.** Build the tabs here |
| `src/components/`, `src/lib/` | Shared UI and the tRPC client | **Yours** |
| `src/contracts/` | Shared Zod schemas | **Read, don't edit.** Flores owns them. Propose changes in a PR |
| `src/server/routers/` | tRPC procedures and fixtures | Read-only. Ask Cuison or Flores for changes |
| `src/server/db/` | Database schema and access | Backend only |
| `scripts/` | Setup and verification scripts | Backend only |
| `docs/` | Decisions, learnings, team docs | Put wireframes in `docs/wireframes/` |
| `.github/workflows/` | CI | Guevarra only |
| `.env.example` | Env variable names, no secrets | Ask before adding. Never commit real values |
| `README.md` | Setup and overview | Guevarra |

Week 2 will be planned only after the Week 1 checklist is reviewed.
