# DONE — Viral Content Machine

## Phase 0 — Repo & Rules

[2024-08-24] [Cursor] Create monorepo folders: apps/{frontend,gateway,orchestrator,workers}, packages/sdk, PRODUCT_BRIEF.
[2024-08-24] [Cursor] Add `.cursor/rules/*.mdc`, PLAN/ARCH/TODO/DONE/DECISIONS/RULES-INDEX at root.
[2024-08-24] [Cursor] `.env.example` (POSTGRES_URL, REDIS_URL, NATS_URL, S3 creds, JWT_SECRET, OAUTH providers).
[2024-08-24] [Cursor] `docker-compose.dev.yml` → Postgres+pgvector, Redis, NATS, MinIO.
[2024-08-24] [Cursor] Pre‑commit hooks (ruff/black; eslint/prettier); `.gitignore`.

## Phase 1 — Contracts & Scaffolds

[2024-08-24] [Cursor] Bootstrap NestJS gateway: `/v1/health`, Problem+JSON, Idempotency‑Key middleware.
[2024-08-24] [Cursor] Define OpenAPI: auth, campaigns, angles, copy, hashtags, assets, schedule, exports, integrations, analytics.
[2024-08-24] [Cursor] Generate typed SDKs: `packages/sdk-node`, `packages/sdk-web`.
[2024-08-24] [Cursor] FastAPI orchestrator skeleton with campaign FSM endpoints; NATS publisher.
[2024-08-24] [Cursor] Worker skeletons: `trend-harvester`, `copy-generator`, `visual-generator`, `hashtag-engine`, `scheduler`, `exporter`, `moderator`, `analytics-puller`, `billing-service`, `analytics-service`.
[2024-08-24] [Cursor] Next.js 14 scaffold; Tailwind + shadcn; base layout/theme.
[2024-08-24] [Cursor] Routes/pages: `/dashboard`, `/campaigns`, `/campaigns/new`, `/campaigns/[campaignId]/{brief,angles,copy,assets,hashtags,schedule,review,exports}`, `/admin`.

## Phase 2 — Angles & Copy (Vertical Slice)

[2024-08-24] [Cursor] `POST /v1/campaigns` (create), `POST /v1/campaigns/:id/start` → state=researching.
[2024-08-24] [Cursor] `trend-harvester`: provider adapter interface; mock provider returning 20 topics/hashtags per platform.
[2024-08-24] [Claude] Trend clustering & velocity scoring heuristic; "angle seeds" synthesizer (topic → hook/rationale schema).
[2024-08-24] [Cursor] `POST /v1/campaigns/:id/angles/generate` → write 10 angles.
[2024-08-24] [Claude] Copywriter prompt templates per platform; A/B matrix parameters (hook × CTA × length).
[2024-08-24] [Cursor] `POST /v1/angles/:id/copy/generate {platform, variants}`; persist copy variants + reading level.
[2024-08-24] [Cursor] **BriefForm** (brand, audience, tone, constraints, asset uploader).
[2024-08-24] [Cursor] **AngleBoard** (realtime proposals; triage Keep/Discard; Top‑3 selection).
[2024-08-24] [Cursor] **CopyWorkbench** (platform tabs; A/B grid; inline edit; reading-level meter).

## Phase 3 — Assets & Hashtags (Backend)

[2024-08-24] [Cursor] Assets DTOs: CreateAssetDto, UpdateAssetDto, AssetDto, GenerateAssetsDto with AssetKind enum.
[2024-08-24] [Cursor] Assets controller: CRUD operations, generation, filtering by campaign/angle/kind.
[2024-08-24] [Cursor] Assets service: mock implementations for asset management and generation.
[2024-08-24] [Cursor] Hashtags DTOs: CreateHashtagDto, UpdateHashtagDto, HashtagDto, GenerateHashtagsDto with Platform and HashtagBucket enums.
[2024-08-24] [Cursor] Hashtags controller: CRUD operations, generation, filtering by campaign/angle/platform/bucket.
[2024-08-24] [Cursor] Hashtags service: mock implementations for hashtag management and generation with volume/saturation metrics.

## Phase 4 — Schedule & Export (Backend)

[2024-08-24] [Cursor] Schedule DTOs: CreateScheduleDto, UpdateScheduleDto, ScheduleDto, RecommendScheduleDto with Platform and ScheduleStatus enums.
[2024-08-24] [Cursor] Schedule controller: CRUD operations, recommendations, queueing, filtering by campaign/platform/status.
[2024-08-24] [Cursor] Schedule service: mock implementations for schedule management, recommendations, and publishing queue.
[2024-08-24] [Cursor] Exports DTOs: CreateExportDto, UpdateExportDto, ExportDto, QueueExportDto with ExportFormat and ExportStatus enums.
[2024-08-24] [Cursor] Exports controller: CRUD operations, queueing, downloads, filtering by campaign/format/status.
[2024-08-24] [Cursor] Exports service: mock implementations for export management, generation queue, and file downloads.

## Phase 5 — Analytics (Backend)

[2024-08-24] [Cursor] Analytics DTOs: MetricDto, CampaignMetricsDto, ABTestResultDto, GetAnalyticsDto with comprehensive metrics.
[2024-08-24] [Cursor] Analytics controller: campaign analytics, A/B test results, dashboard analytics, refresh, export.
[2024-08-24] [Cursor] Analytics service: mock implementations for metrics aggregation, A/B testing, and data export.
