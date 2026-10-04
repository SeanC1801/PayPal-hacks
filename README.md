# PayPal AI Hackathon - AI Business Coach

This repository contains the Week 1 foundation for the AI Business Coach MVP. The current app uses static UI and fixture data so the frontend and backend can work in parallel.

## Run the project locally

```bash
nvm use
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The home route redirects to the Coach tab.

Run the checks before opening a pull request:

```bash
npm run lint
npm run type-check
npm run build
```

Week 1 does not require real database, AI, Airtable, Slack, or PayPal credentials. Keep `.env.local` private and never commit secrets.

## Branch workflow

Use the assigned branch for your work:

- `frontend` - shared header, static MVP pages, and frontend components
- `backend` - shared contracts, fixture data, and placeholder procedures
- `main` - stable shared branch; do not push directly here

Branch links:

- Frontend: https://github.com/SeanC1801/PayPal-hacks/tree/frontend
- Backend: https://github.com/SeanC1801/PayPal-hacks/tree/backend

Before starting work, make sure your branch contains the latest approved changes from `main`. Coordinate contract changes with one frontend and one backend reviewer before merging them.

## Layout

- `src/app/` - Next.js routes for `/coach`, `/roadmap`, and `/simulation`
- `src/components/` - shared frontend components such as the header and status badges
- `src/contracts/` - Zod schemas shared by frontend and backend
- `src/server/routers/` - tRPC procedures and fixture-backed backend work
- `docs/` - product overview, planning, team workflow, logs, and wireframes (start at `docs/README.md`)

The `/budget` and `/approvals` routes are retained as future placeholders and are not part of the Week 1 header.

Generated folders such as `node_modules/`, `.next/`, coverage output, local environment files, editor settings, and operating-system metadata are intentionally hidden by `.gitignore` and should not be shared with the team.

## Team documents

See the index in [`docs/README.md`](docs/README.md).

License: MIT
