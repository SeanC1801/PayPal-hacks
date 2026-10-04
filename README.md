# PayPal AI Hackathon — AI Business Coach (draft)

Working name; the project name is not decided yet.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Checks: `npm run lint`, `npm run type-check`, `npm run build`.

## Layout

- `src/contracts/` — Zod schemas shared by frontend and backend
- `src/server/routers/` — tRPC procedures (fixtures for now)
- `src/app/` — routes: `/coach`, `/roadmap`, `/budget`, `/approvals`, `/simulation`, `/api/health`
- `docs/` — decision log, learnings, wireframes

License: MIT
