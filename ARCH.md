# Architecture Overview — Viral Content Machine

## High‑Level Topology
- **Frontend**: Next.js 14 (Vercel), App Router, TS, shadcn/Tailwind, TanStack Query + Zustand, WebSockets/SSE, Recharts.
- **API Gateway**: NestJS (/v1 OpenAPI, RBAC, Idempotency‑Key, rate limits) → services via REST/NATS RPC.
- **Auth**: Auth.js (OAuth), JWT + rotating refresh; SAML/OIDC later; OAuth per‑org for partner schedulers & Drive/Notion.
- **Orchestration**: FastAPI + CrewAI (Trend Scout, Copywriter, Designer, Growth Hacker, Editor‑in‑Chief) with campaign FSM.
- **Workers (Python)**:
  - `trend-harvester` (approved providers only; no ToS‑breaking scraping)
  - `copy-generator` (angles/hooks/captions/threads/CTAs, A/B matrix)
  - `visual-generator` (image prompt → provider, upscaling/crops; video storyboard)
  - `hashtag-engine` (ranking, ladders, saturation scoring)
  - `scheduler` (slot recommendations, A/B mapping, collision avoidance)
  - `exporter` (Notion/Drive/ZIP/schedule.csv; partner queueing)
  - `moderator` (toxicity/policy/brand safety; image safety)
  - `analytics-puller` (KPI ingestion from partners)
  - `billing-service`, `analytics-service`
- **Event Bus**: NATS (`campaign.*`, `asset.*`, `export.*`).
- **Queues**: Celery (Redis/NATS backend).
- **DB**: Postgres + pgvector (angles/copy embeddings).
- **Object Store**: S3/R2 (images, ZIPs, CSVs).
- **Cache**: Upstash Redis (hot campaign state, presence).
- **Realtime**: WS gateway (Nest) + SSE fallback.
- **Observability**: OpenTelemetry → Prometheus/Grafana; Sentry; structured logs.
- **Secrets**: Cloud secrets manager; KMS for partner tokens; no plaintext secrets in DB or repo.

## Key Data Model (Postgres)
- Tenancy: `orgs`, `users`, `memberships`
- Core: `campaigns` (brief, platforms, goals, status), `angles`, `copies` (platform, variant, text, meta, embedding),
  `hashtags` (bucket, tags, saturation), `assets` (image/video_storyboard, prompt/provider, s3_key, moderation),
  `schedules` (platform, time, variant, refs, status, external_ref)
- Experiments/Analytics: `experiments` (factors, design), `metrics` (KPI series)
- Trends/Integrations: `trend_topics`, `integrations`
- Governance: `audit_log`

## API Surface (/v1 highlights)
- Auth/Orgs: `POST /auth/login|token|refresh`, `GET /me`; `POST /integrations/:provider/connect`, `DELETE /integrations/:id`
- Campaigns: `POST /campaigns`, `GET /campaigns/:id`, `POST /campaigns/:id/start`, `POST /campaigns/:id/approve`, `GET /campaigns/:id/kit`
- Angles/Copy/Hashtags/Assets:
  - `POST /campaigns/:id/angles/generate`
  - `POST /angles/:id/copy/generate`
  - `POST /angles/:id/hashtags/generate`
  - `POST /angles/:id/assets/generate`
  - `GET /assets/:id` (signed download)
- Scheduling & Export:
  - `POST /campaigns/:id/schedule/recommend`
  - `POST /schedules/:id/queue`
  - `POST /exports/notion` `POST /exports/drive`
  - `GET /analytics/campaigns/:id`
- Conventions: Idempotency‑Key on mutating routes; Problem+JSON errors; cursor pagination; RBAC + RLS enforced.

## Orchestration & Tools
- **Agents**: Trend Scout, Copywriter, Designer, Growth Hacker, Editor‑in‑Chief (moderation runs as policy pass).
- **Tools**: `Trends.get/cluster`, `Copy.generate`, `Thread.generate`, `Visual.prompt/generate/upscale`, `Hashtags.rank/ladder`,
  `Schedule.recommend`, `Experiment.plan`, `Moderation.check`, `Export.push`.
- **FSM**: created → researching → drafting → assembling → scheduling → reviewing → exported/failed.

## Background Jobs
- `TrendHarvest`, `GenerateAngles`, `GenerateCopy`, `GenerateAssets`, `GenerateHashtags`,
  `BuildSchedule`, `ExportKit`, `QueuePublish`, `PullMetrics`, `CostRollup`, `RetentionSweeper`, `AlertOnFailure`.

## Realtime Channels
- `campaign:{id}:progress` (angles/copy/assets ticks)
- `campaign:{id}:review` (comments/approvals)
- `export:{id}:status` (export/publish updates)

## Security & Safety
- RBAC + Postgres RLS; OAuth token vaulting (KMS); signed URLs; webhook HMAC.
- Brand‑safety moderation (toxicity/policy/banned words); image safety classifier; watermark option.
- PII/DLP checks in copy; policy‑driven blocks/quarantine.
- Audit trail for approvals/exports/publishes; tamper‑evident store.

## Deployment
- FE: Vercel. Services: Render/Fly/GKE. DB: Neon. Redis: Upstash. NATS: managed/self‑hosted. Storage: S3/R2.
- CI/CD: GitHub Actions (lint/typecheck/unit/contract → docker build/push → SBOM/sign → deploy with approvals).
