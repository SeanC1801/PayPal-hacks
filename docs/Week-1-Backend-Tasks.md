# Week 1 — Backend Tasks

Oct 4–10, 2026 · For: Flores (Backend Lead, contract owner) and Cuison (backend backup and contributor). Guevarra may help when needed but mainly coordinates dependencies and supports the frontend.

## Goal

Give the frontend **stable contracts and fixture-returning procedures** so it can build without waiting for the database, an AI provider, Airtable, Slack or PayPal.

Nothing in Week 1 writes to Airtable, sends Slack messages, calls a real AI, or runs a payment.

## Designated branch

Work from the `backend` branch:

https://github.com/SeanC1801/PayPal-hacks/tree/backend

Do not push directly to `main`. The initial contracts are the baseline for Week 1; propose changes through the team review process instead of changing them silently.

## Process

- Day 1: confirm each person's hours and agree on the task split. Keep changes focused and explain them in the pull request.
- Daily check-in: 10 minutes. Done, doing, blocked.
- Quick review when a task is done. Contracts need review from the frontend (see Working agreement).
- No authentication. One seeded café owner.
- End of week: the backend checklist below is reviewed before Week 2 is planned.

## What exists now

| Area | State in the repo |
|---|---|
| tRPC server, `/api/trpc`, `/api/health` | **Exists** |
| Contracts: `owner`, `decision`, `payment-line`, `pending-action`, `roadmap` | **Exist but are drafts.** `decision` currently models project decisions (AI provider, budget tier), not a café business decision; `roadmap` has no items or approval state; `pending-action` lacks Airtable and Slack types. All need revision |
| Contracts: RoadmapItem, BudgetProposal, PayoutResult, SimulationResult, CoachMessage, Airtable and Slack placeholders, IntegrationAction | **Missing** |
| Routers with fixtures: `owner.get/list`, `decision.byOwner`, `payment.list` | **Exist**, shaped for the old contracts |
| Other procedures (roadmap, budget, approvals, simulation, integrations, coach) | **Missing** |
| `src/server/db/` (Drizzle schema, migrations, seed) | **Future work; not a Week 1 blocker** |
| `scripts/` (PayPal spike) | **Future work; not a Week 1 blocker** |
| CI | **Exists** |
| `/api/health` | Returns a hard-coded `owners: 1`; it does not read the database yet |

## Dependencies

| ID | Task | Owner | Notes |
|---|---|---|---|
| 1.1 | Lock decisions | Guevarra | AI provider choice is still open. It does not block Week 1 backend work |
| 1.3 | Zod contracts | Flores | Blocks 1.4 and 1.5, and all frontend work |
| 1.6 | PayPal spike | Flores | Needs a PayPal sandbox app with Payouts enabled |

## Tasks

### 1.3 — Zod contracts v1

| | |
|---|---|
| **Owner / Backup** | Flores / Cuison |
| **Effort** | 6 h |
| **Depends on** | 1.1 |
| **Frontend dependency** | **All frontend tasks.** Merge a first version by **Tue Oct 6** |

**Purpose:** one agreed set of data shapes used by frontend and backend.

**Steps**
1. Open a draft PR with the contract names and fields by Monday night so the frontend can review early.
2. Rewrite or add each contract in `src/contracts/`, one file per contract, exported from `index.ts` (table below). Money is integer cents; dates are ISO strings.
3. Give every contract an inferred TypeScript type.
4. Get the PR reviewed by one frontend and one backend member (Guevarra or Liwanag; Cuison). Merge by Tuesday.
5. Afterwards, any change follows the Working agreement.

| Contract | What it represents | Main fields | Used by |
|---|---|---|---|
| `OwnerProfile` | The seeded café owner | id, name, email, cafe_name, monthly_budget_cents | All tabs (header, budget) |
| `Decision` | A business decision, such as hiring a part-time assistant | id, owner_id, title, type, hours_per_week, hourly_rate_cents, start_date, status | Coach, Roadmap, Simulation |
| `RoadmapItem` | One weekly task | id, roadmap_id, week (1–4), title, status, due_date, depends_on (ids) | Roadmap |
| `Roadmap` | The four-week plan for a decision | id, decision_id, version, status (draft / needs_approval / approved), items, approved_at | Roadmap |
| `BudgetProposal` | Proposed budget for a decision | id, decision_id, monthly_cost_cents, runway_months, lines (PaymentLine), is_estimate | Simulation |
| `PaymentLine` | One scheduled payment | id, payee, amount_cents, due_date, status, purpose | Simulation |
| `PendingAction` | An external action waiting for approval | id, action_type (payout / airtable / slack), status (proposed / approved / rejected / executed / failed), payload, timestamps | Roadmap (status), later Approvals |
| `PayoutResult` | Outcome of a PayPal payout | pending_action_id, payout_batch_id, status (pending / success / failed), error | Later payment status; proven by 1.6 |
| `AirtableBudgetRecord` | **Placeholder** for a budget row in Airtable | decision_id, monthly_cost_cents, runway_months, status | Roadmap (Airtable status) |
| `AirtableTaskRecord` | **Placeholder** for a task row in Airtable | roadmap_item_id, title, status, due_date, depends_on | Roadmap (Airtable status) |
| `SlackDraftMessage` | **Placeholder** for a draft message | id, channel, text, kind (summary / reminder / approval update), status | Coach, Roadmap |
| `IntegrationAction` | **Placeholder** wrapper for an Airtable or Slack action | id, kind (airtable / slack), status (not_connected / prepared / pending_approval), payload | Coach, Roadmap |
| `SimulationResult` | Baseline vs. with-decision budget by month, labelled estimate or calculated | months[], baseline_cents, with_decision_cents, is_estimate | Simulation |
| `CoachMessage` | A chat message plus suggested prompts | id, role, content, created_at | Coach |

`SimulationResult` and `CoachMessage` are not on the original contract list, but the Simulation and Coach tabs cannot render without them.

**Expected output:** all contracts exported from `src/contracts/index.ts`.
**Definition of Done:** merged PR approved by one frontend and one backend member, CI green.
**Checklist item:** Contracts exist and are exported · Frontend has reviewed the contracts

### 1.5 — Fixture-returning tRPC procedures

| | |
|---|---|
| **Owner / Backup** | Cuison / Flores |
| **Effort** | 5 h |
| **Depends on** | 1.3 |
| **Frontend dependency** | Every screen. Procedure names must be stable by **Thu Oct 8** |

**Purpose:** let the frontend call every planned API now, with fake data shaped exactly like the future real data.

**Steps**
1. Put fixtures in `src/server/fixtures/` (a Sunrise Café owner, one hiring decision, a four-week roadmap, a budget proposal with payment lines, a simulation, some coach messages). Parse each fixture with its contract when the server loads.
2. Keep fixture state in memory so edits persist until the server restarts.
3. Add these procedures, each in its own router file and registered in `src/server/routers/app.ts`:

| Procedure | Returns or does |
|---|---|
| `owner.get` | The seeded owner |
| `decision.list` | The owner's decisions |
| `decision.update` | Updates a decision in fixture state, sets the roadmap to `needs_approval`, increments its `version`, and updates the simulation |
| `roadmap.get` | The roadmap with items |
| `roadmap.approve` | Sets the roadmap to `approved` in fixture state |
| `budget.getProposal` | The budget proposal |
| `payment.list` | Payment lines |
| `approval.listPending` | Pending actions |
| `simulation.get` | Simulation data |
| `integration.prepareAirtable` | Returns an Airtable `IntegrationAction` with status `prepared`. **Writes nothing** |
| `integration.prepareSlackDraft` | Returns a `SlackDraftMessage` / `IntegrationAction` with status `prepared`. **Sends nothing** |
| `coach.messages` | Fixture chat history and suggested prompts |

4. Every procedure runs its output through the matching contract (`Contract.parse`) before returning.
5. Test each one in the browser at `/api/trpc/<router>.<name>`.
6. Post the procedure names in the team channel as soon as they are agreed.

**Files:** `src/server/routers/*`, `src/server/fixtures/*`, `src/server/routers/app.ts`
**Expected output:** the frontend can call every procedure and receive contract-valid data.
**Definition of Done:** merged PR, CI green, all listed procedures return valid data, no external call is made.
**Checklist item:** Fixture data parses against the contracts · tRPC procedures return contract-valid data · Roadmap editing can be represented · Approval state can be represented · Simulation data is available · Airtable placeholders exist · Slack draft placeholders exist

### Future follow-up - database schema, migration and seed

| | |
|---|---|
| **Owner / Backup** | Cuison / Flores |
| **Effort** | 6 h |
| **Depends on** | 1.3 |
| **Frontend dependency** | **None.** The frontend uses fixtures. This task must not delay 1.5 |

**Purpose:** a real database ready for later weeks, without blocking the frontend.

**Steps**
1. Create a Supabase project and use the Session pooler connection string in `.env.local` (never commit it).
2. Add Drizzle config and tables that mirror the contracts in `src/server/db/schema.ts`.
3. Generate and run a migration.
4. Write an idempotent seed script that inserts the Sunrise Café owner (running it twice must not duplicate).
5. Make `/api/health` read the owner count from the database.

**Files:** `src/server/db/*`, `drizzle.config.ts`, `scripts/seed.ts`, `.env.example`
**Expected output:** a fresh database migrates and seeds with one command.
**Definition of Done:** merged PR, CI green, seed run twice shows one owner, `.env.example` lists the variable names.
**Checklist item:** Database setup does not block frontend work

### Future follow-up - PayPal sandbox payout spike

| | |
|---|---|
| **Owner / Backup** | Flores / Cuison |
| **Effort** | 5 h |
| **Depends on** | 1.1 |
| **Frontend dependency** | None |

**Purpose:** prove the hardest external piece now: one real sandbox payout.

**Steps**
1. Create a PayPal developer account and sandbox business and personal accounts. Make sure the business account has balance.
2. Create a sandbox app with Payouts enabled. Put the client id and secret in `.env.local`.
3. Write `scripts/paypal-spike.ts` that gets an OAuth token, creates one payout batch with a unique `sender_batch_id`, and polls the batch until SUCCESS or FAILED.
4. Re-send the same `sender_batch_id` and confirm PayPal rejects it.
5. Record the time from PENDING to SUCCESS, setup gotchas and errors in `docs/learnings.md`.
6. If blocked for more than 4 hours, tell Guevarra.

**Files:** `scripts/paypal-spike.ts`, `docs/learnings.md`
**Expected output:** a payout that reaches SUCCESS and shows in the sandbox personal account.
**Definition of Done:** merged PR, no secrets in code or screenshots, notes written.
**Checklist item:** PayPal sandbox payout reaches SUCCESS (sandbox only; no production payments)

## Working agreement with the frontend

- The backend defines the data shape first. The frontend reviews contracts before building.
- Frontend builds against fixtures. Fixtures must be shaped exactly like the eventual real data.
- Any contract change needs review from one frontend and one backend member.
- Announce contract changes in the team channel **before** frontend work depending on them continues.
- Never rename or remove a procedure without telling the frontend first.

## Backend checklist

- [ ] Contracts exist and are exported
- [ ] Frontend has reviewed the contracts
- [ ] Fixture data parses against the contracts
- [ ] tRPC procedures return contract-valid data
- [ ] Roadmap editing can be represented
- [ ] Approval state can be represented
- [ ] Simulation data is available
- [ ] Airtable placeholders exist
- [ ] Slack draft placeholders exist
- [ ] No real external integration (Airtable, Slack, AI, production PayPal) is called in Week 1
- [ ] Database setup does not block frontend work
- [ ] PayPal sandbox payout reaches SUCCESS and a duplicate `sender_batch_id` is rejected
- [ ] CI passes

## Repository guide

| Path | Use it for | Backend rule |
|---|---|---|
| `src/contracts/` | Shared Zod contracts | **Flores owns.** Cuison contributes through PRs |
| `src/server/routers/` | tRPC procedures | **Backend.** Cuison leads 1.5 |
| `src/server/db/` | Database schema and access | **Backend.** Cuison leads 1.4 |
| `scripts/` | Seed and PayPal spike | **Backend** |
| `src/app/` | Frontend pages and routes | Frontend only. Do not edit; ask in a PR |
| `docs/` | Decisions, learnings, team docs | Add notes to `learnings.md` |
| `.github/workflows/` | CI | Guevarra. Tell him if a check must change |
| `.env.example` | Env variable names, no secrets | Add new names here. Never commit values |
| `README.md` | Setup and overview | Guevarra |

Week 2 will be planned only after the Week 1 checklist is reviewed.
