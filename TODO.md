# TODO — Viral Content Machine
> 80/20: [Cursor] scaffolds, wiring, UI, infra; [Claude] agent prompts/graphs, ranking & schedule heuristics, moderation rules.

---

## Phase 0 — Repo & Rules
- [x] [Cursor] Create monorepo folders: apps/{frontend,gateway,orchestrator,workers}, packages/sdk, PRODUCT_BRIEF.
- [x] [Cursor] Add `.cursor/rules/*.mdc`, PLAN/ARCH/TODO/DONE/DECISIONS/RULES-INDEX at root.
- [x] [Cursor] `.env.example` (POSTGRES_URL, REDIS_URL, NATS_URL, S3 creds, JWT_SECRET, OAUTH providers).
- [x] [Cursor] `docker-compose.dev.yml` → Postgres+pgvector, Redis, NATS, MinIO.
- [x] [Cursor] Pre‑commit hooks (ruff/black; eslint/prettier); `.gitignore`.

## Phase 1 — Contracts & Scaffolds
### Backend
- [x] [Cursor] Bootstrap NestJS gateway: `/v1/health`, Problem+JSON, Idempotency‑Key middleware.
- [x] [Cursor] Define OpenAPI: auth, campaigns, angles, copy, hashtags, assets, schedule, exports, integrations, analytics.
- [x] [Cursor] Generate typed SDKs: `packages/sdk-node`, `packages/sdk-web`.
- [x] [Cursor] FastAPI orchestrator skeleton with campaign FSM endpoints; NATS publisher.
- [x] [Cursor] Worker skeletons: `trend-harvester`, `copy-generator`, `visual-generator`, `hashtag-engine`, `scheduler`, `exporter`, `moderator`, `analytics-puller`, `billing-service`, `analytics-service`.
- [ ] [Claude] DB migration #1 (orgs/users, campaigns/angles/copies/hashtags/assets/schedules, experiments/metrics, trend_topics, integrations, audit_log).

### Frontend
- [x] [Cursor] Next.js 14 scaffold; Tailwind + shadcn; base layout/theme.
- [ ] [Cursor] Routes/pages: `/dashboard`, `/campaigns`, `/campaigns/new`, `/campaigns/[campaignId]/{brief,angles,copy,assets,hashtags,schedule,review,exports}`, `/admin`.
- [ ] [Cursor] Lib: `api-client.ts`, `ws-client.ts`, `zod-schemas.ts`; Stores: `useCampaignStore.ts`, `useRealtimeStore.ts`.

### Infra
- [ ] [Cursor] GitHub Actions (lint/typecheck/test/build).
- [ ] [Cursor] Dockerfiles for gateway, orchestrator, workers.

---

## Phase 2 — Angles & Copy (Vertical Slice)
### Backend
- [Cursor] `POST /v1/campaigns` (create), `POST /v1/campaigns/:id/start` → state=researching.
- [Cursor] `trend-harvester`: provider adapter interface; mock provider returning 20 topics/hashtags per platform.
- [Claude] Trend clustering & velocity scoring heuristic; “angle seeds” synthesizer (topic → hook/rationale schema).
- [Cursor] `POST /v1/campaigns/:id/angles/generate` → write 10 angles.
- [Claude] Copywriter prompt templates per platform; A/B matrix parameters (hook × CTA × length).
- [Cursor] `POST /v1/angles/:id/copy/generate {platform, variants}`; persist copy variants + reading level.

### Frontend
- [Cursor] **BriefForm** (brand, audience, tone, constraints, asset uploader).
- [Cursor] **AngleBoard** (realtime proposals; triage Keep/Discard; Top‑3 selection).
- [Cursor] **CopyWorkbench** (platform tabs; A/B grid; inline edit; reading-level meter).

---

## Phase 3 — Assets & Hashtags
### Backend
- [Claude] Designer prompt templates (image & storyboard) incl. brand lexicon and negatives; safety tags.
- [Cursor] `visual-generator`: provider adapter (e.g., SDXL/DALL·E), upscaling, crops (1:1, 4:5, 9:16); thumbnailing; signed download.
- [Cursor] `POST /v1/angles/:id/assets/generate {kind, count}` → create previews; store moderation JSON.
- [Claude] Hashtag ranking & ladder logic (Large/Medium/Niche with saturation).
- [Cursor] `POST /v1/angles/:id/hashtags/generate {platform}` → persist buckets & saturation.

### Frontend
- [Cursor] **AssetStudio** (prompt editor, preview grid, regenerate, upscaling toggle, platform crops).
- [Cursor] **StoryboardViewer** (frame list with overlay/captions timing).
- [Cursor] **HashtagLab** (ladder builder, blacklist enforcement, saturation warnings).

---

## Phase 4 — Schedule & Export
### Backend
- [Claude] Schedule heuristics: recommended slots by platform, cadence dial, collision avoidance, A/B mapping policy.
- [Cursor] `POST /v1/campaigns/:id/schedule/recommend {cadence, window}` → write schedules for 7 days.
- [Cursor] `exporter`: assemble kit → ZIP (copy, images, storyboards, schedule.csv) + Notion/Drive exports.
- [Cursor] `POST /v1/schedules/:id/queue` → partner scheduler (sandbox) with OAuth refresh + retries; store `external_ref`.

### Frontend
- [Cursor] **ScheduleBuilder** (calendar heatmap, drag‑drop posts, A/B knobs, dependency warnings).
- [Cursor] **ExportHub** (destination pickers; ZIP download; queue to scheduler; status with WS updates).

---

## Phase 5 — Review, Moderation, Analytics
### Backend
- [Cursor] `moderator`: toxicity/policy/banned‑word scans; image safety classifier; quarantine queue + audit entries.
- [Claude] EIC review rubric & auto‑feedback comments; policy‑fix suggestions.
- [Cursor] `analytics-puller`: fetch KPIs from partner APIs; map to `schedule_id` & variant → store `metrics`.
- [Cursor] `GET /v1/analytics/campaigns/:id` (KPIs, A/B diffs, time series).

### Frontend
- [Cursor] **ReviewCenter** (threaded comments, approvals, change requests, version compare).
- [Cursor] **Analytics** (A/B diffs, cohorting by angle/hook; posting heatmap; KPI cards).

---

## Phase 6 — Hardening & Deploy
### Security & Reliability
- [Cursor] RBAC roles + Postgres RLS; OAuth token vaulting (KMS); webhook HMAC.
- [Cursor] Rate limits per org/route; retries with backoff on partner APIs; circuit breaker for providers.
- [Claude] Finalize moderation rules & false‑positive thresholds; watermarking policy.

### Observability & Tests
- [Cursor] OTel traces across gateway→orchestrator→workers; Prometheus metrics; Sentry.
- [Cursor] Unit: angles/copy APIs, assets pipeline, exports.
- [Cursor] Contract: OpenAPI compat; SDK regen in CI.
- [Cursor] E2E (Playwright): brief → angles → copy → assets → hashtags → schedule → export → queue.
- [Cursor] Load (k6): concurrent campaigns; Chaos: model latency spikes & partner 5xx.
- [Cursor] Security scans (SAST/DAST, container vulns).

### CI/CD & Deploy
- [Cursor] GitHub Actions: lint→test→docker build→SBOM/sign→deploy (Vercel FE, Render APIs/workers).
- [Cursor] Terraform stubs (Neon/Upstash/NATS/S3); backups (PITR); retention sweeper.

---

## Ongoing
- [Cursor] Keep `DECISIONS.log` updated; move completed items to `DONE.md` with timestamps.
- [Cursor] Refresh `PLAN.md` “Next 3 Tasks” after each milestone.
- [Claude] Iterate on angle/copy prompts, ladder ranking, schedule heuristics, and EIC feedback quality vs. cost/latency.

