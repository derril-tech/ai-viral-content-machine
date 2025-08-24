# Project Plan — Viral Content Machine

## Current Goal
Ship a demoable slice: brief intake → trend harvest (mock provider ok) → generate 10 angles → select top 3 → produce A/B copy (2 platforms), hashtag ladders, and 3–6 image prompts/storyboards → build a 7‑day schedule → export kit (ZIP + Notion/Drive) and queue posts to a scheduler sandbox. Runs locally via docker‑compose; FE to Vercel; APIs/workers to Render.

## 80/20 Build Strategy
- 80% [Cursor]: monorepo scaffolds, REST/OpenAPI, typed SDKs, FE pages/components, queue/storage, exports, CI/CD, tests, partner OAuth wiring.
- 20% [Claude]: agent prompt graphs (Trend Scout, Copywriter, Designer, Growth, EIC), angle/copy prompt engineering, hashtag ranking logic, schedule heuristics, moderation policy rules.

## Next 3 Tasks
1. [Cursor] API Gateway (NestJS) `/v1` surface (auth, campaigns, angles/copy/assets/hashtags, schedule, exports, integrations, analytics) + typed SDKs.
2. [Claude] Orchestrator skeleton (FastAPI + CrewAI) with campaign FSM (created→researching→drafting→assembling→scheduling→reviewing→exported) and initial agent tool contracts.
3. [Cursor] Database migration #1 (orgs/users, campaigns/angles/copies/hashtags/assets/schedules, experiments/metrics, trend_topics, integrations, audit_log).

## Phase Plan & Milestones
- **P0 Repo & Rules** — structure, rules, envs.
- **P1 Contracts & Scaffolds** — gateway/orchestrator/workers stubs, DB migration #1.
- **P2 Angles & Copy** — trend harvest → angles → A/B copy (2 platforms).
- **P3 Assets & Hashtags** — image prompts/storyboards + ladder generation.
- **P4 Schedule & Export** — recommended slots, A/B mapping, Notion/Drive/ZIP + scheduler queue.
- **P5 Review, Moderation, Analytics** — EIC review, policy filters, KPI ingestion.
- **P6 Hardening & Deploy** — observability, E2E/load/security, CI/CD to Vercel/Render.

## Definition of Done (Launch)
- Create brief → kit for 3 angles in < 5 minutes median (dev settings).
- P95 first copy partial < 1.8 s; image preview < 10 s (provider mock acceptable).
- Export success ≥ 99% (non‑partner outages excluded); scheduler queue confirmation < 30 s P95.
