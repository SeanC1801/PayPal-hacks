# MVP Overview — AI Business Coach

PayPal AI Hackathon · Deadline Nov 12, 2026 (internal target Nov 11, 9:00 PM Manila)

## 1. Purpose and user

**Purpose:** help a small-business owner turn a business decision ("should I hire a part-time assistant?") into a reviewed budget, payment schedule and roadmap, then carry out the approved steps safely.

**Target user:** a small-business owner without a finance or project-management team. The demo user is a seeded café owner (Sunrise Café). There is no login.

## 2. The MVP flow

1. The seeded café owner enters a business decision, such as hiring a part-time assistant.
2. The Coach asks questions and proposes a budget, a payment schedule and a roadmap.
3. The user reviews and edits the roadmap and decisions.
4. The user approves the finalized roadmap.
5. The user can export or print the finalized decisions and roadmap as a PDF.
6. The approved data is prepared for Airtable visualization.
7. The Coach prepares draft Slack messages and project-management records.
8. The user reviews and approves those external actions.
9. Only approved actions are sent to Slack or placed in the project-management system.
10. PayPal Payouts executes the approved payment through the sandbox.

Steps 1–5 are the core of Weeks 1–3. Steps 6–10 are placeholders or follow-up work until the approval gate and external integration plan are ready. Week 1 uses fixture data only.

## 3. Main screen

One header with three tabs: **Coach · Roadmap · Simulation**. The active tab is highlighted. There is no login.

### Coach tab

- Chat history and a message input with a Send button
- Suggested decision prompts (for example "Hire a part-time assistant")
- Coach replies. **Week 1: replies come from fixtures, not a real AI.**
- Actions to ask the Coach to prepare an Airtable view and a Slack draft
- A status line showing external integrations are not connected yet

### Roadmap tab

- Four weekly roadmap cards, each with tasks, status, due date and dependencies
- Edit decision and Save changes buttons
- Approve roadmap button and Export / Print PDF button
- Airtable preparation status and Slack draft status
- A clear banner when external actions are pending approval, and when an edit means the roadmap needs approval again

### Simulation tab

- Current budget summary and the initialized business decisions
- Payment schedule preview and projected budget impact
- Simple charts (or chart placeholders)
- Update simulation and Apply changes buttons
- A visible label separating **illustrative estimates** from **real financial calculations**. Totals shown as real must come from deterministic budget math, never from the AI.

## 4. Role of each part

| Part | Role in the MVP | Not in the MVP |
|---|---|---|
| **AI** | Asks follow-up questions; proposes a budget, payment lines and a four-week roadmap; drafts Slack and Airtable content. Output must pass the shared Zod schemas. | Making payments, calculating the official totals, acting without approval |
| **PayPal** | Later MVP work: Payouts API in the **sandbox** after the approval flow is ready. | Week 1 payments, production payments, invoices, webhooks |
| **Airtable** | Eventually holds approved budget and task records for visualization: grid, Kanban, calendar, timeline/Gantt-style views, linked records, budget and decision dashboards, interfaces, rich fields and automations. | **Week 1: contracts, placeholders and fixtures only. No real writes.** |
| **Slack** | Draft messages, team notifications, approval updates, weekly summaries and reminders. | **Week 1: contracts, placeholders and fixtures only. No real messages.** |

## 5. Approval and safety model

- Every external action (payout, Airtable record, Slack message) is stored first as a **pending action**: proposed → approved or rejected → executed or failed.
- Nothing external runs until the user approves it. From Week 4 the PayPal, Slack and Airtable SDKs are reachable only through one `executeApproved()` function.
- Editing a decision or roadmap after approval resets it to "needs approval".
- The user always sees the exact payee, amount and date before approving.
- Secrets live in environment variables and never in the repo or browser.
- Honest framing: the café assistant is a contractor payment. Production Payouts needs PayPal account enablement, and real wages carry payroll and tax obligations.

## 6. How the data connects

```
OwnerProfile
  └─ Decision (e.g. hire part-time assistant)
       ├─ BudgetProposal ── PaymentLine(s) ── PendingAction(payout) ── PayoutResult
       ├─ Roadmap ── RoadmapItem(s)  (weekly tasks, with dependencies)
       │      └─ PendingAction(Airtable record) / PendingAction(Slack draft)
       └─ Simulation (baseline vs. with-decision budget impact)
```

- A **decision** produces one **budget proposal** and one **roadmap**.
- The budget proposal contains **payment lines**. Approving one produces a payout.
- The roadmap contains **tasks** that depend on each other and map to Airtable task records.
- Changing the decision changes the budget, roadmap and simulation, and sends the roadmap back to approval.

## 7. Scope

**In the MVP:** the three tabs · the café decision flow · AI budget and roadmap proposals · edit and approve · print/PDF export · approval gate · one PayPal sandbox payout later in the build · Airtable and Slack as approved, gated actions.

**Deferred or outside the MVP:** authentication · invoices and production payments · PayPal webhooks · a payment scheduler · multiple businesses or users · real Airtable and Slack calls in Week 1 · the Optional weekly check-in.

## 8. How the repository is organized

| Path | What it holds |
|---|---|
| `src/app/` | Frontend pages and routes |
| `src/contracts/` | Shared Zod data contracts (frontend and backend both import these) |
| `src/server/routers/` | tRPC backend procedures |
| `src/server/db/` | Database schema and access (not created yet) |
| `scripts/` | Setup and verification scripts, such as the PayPal spike (not created yet) |
| `docs/` | Product, planning, team workflow, logs, wireframes |
| `.github/workflows/` | Continuous integration |
| `.env.example` | Required environment variable names, no secrets |
| `README.md` | Setup and project overview |

Week 1 detail is in `docs/planning/week-1/Frontend-Tasks.md` and `docs/planning/week-1/Backend-Tasks.md`.
