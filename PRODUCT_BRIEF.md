VIRAL CONTENT MACHINE — END‑TO‑END PRODUCT BLUEPRINT
(React 18 + Next.js 14 App Router; CrewAI for multi‑agent orchestration; TypeScript‑first contracts.)
1) Product Description & Presentation
One‑liner:
A multi‑agent system that turns a topic, product, or brand brief into a ready‑to‑publish viral campaign kit: trend analysis, hooks, headlines, captions, hashtags, images/video storyboards, posting schedule, and A/B variants—auto‑exportable to social schedulers and team workspaces.
Positioning:
•
For solo creators, brands, agencies, growth teams, and UGC shops needing repeatable virality, faster.
•
Outputs a Campaign Kit: Copy pack, asset pack (images/video storyboards), hashtag sets, posting calendar, platform‑specific variants, and a growth playbook.
Demo narrative:
1.
Paste a product URL + choose platforms (TikTok, IG Reels, YT Shorts, X, LinkedIn).
2.
Agents scrape & summarize, map trends, propose 10 viral angles with hooks.
3.
You pick 3 angles → system generates A/B captions, 3–6 image prompts/storyboards, hashtag ladders, CTA experiments, and a 7‑day schedule.
4.
One click → exports to your approved scheduler (Buffer/Later/Hootsuite) + Notion/Drive folder with assets.
2) Target User
•
Creators & social managers optimizing daily content at scale.
•
Agencies delivering campaign kits to clients.
•
D2C & SaaS marketing teams systemizing growth content.
•
UGC creators pitching data‑driven creative to brands.
3) Features & Functionalities (Extensive)
Campaign Creation
•
Brief intake: brand, audience, tone, goals (awareness, clicks, conversions), platforms, constraints (banned words, legal).
•
Trend mining: ingest trending topics/hashtags from approved sources; cluster by theme & platform.
•
Angle generator: 10+ angles with hooks, proof points, and creative concepts.
•
Persona controls: voice sliders (witty/pro, edgy/safe), reading level, brand lexicon whitelist/blacklist.
Creative Generation
•
Copy pack: headlines, captions (short/long), CTAs, thread scripts, carousel text.
•
Hashtag ladders: large/medium/niche mix with estimated reach & saturation score.
•
Visuals:
o
Images: prompt library + negative prompts; upscaling & aspect ratios per platform.
o
Video: storyboards (shot list, B‑roll ideas, on‑screen text, captions timing).
•
A/B variants: controls for hook, CTA, angle, length; auto‑tag variations.
Scheduling & Publishing
•
Calendar: recommended slots by platform; collision avoidance; cadence dial.
•
Drafts → ready‑to‑publish workflow; approval gates; client review links.
Collaboration
•
Multi‑user comments & mentions; approvals; change requests; revision history.
•
Brand asset vault: fonts, colors, logos, example posts; usage rules.
Analytics (first‑party & partner pull)
•
Per‑post KPIs (impressions, CTR, watch time, saves, shares); A/B outcome diffs.
•
Angle/Hook performance cohorting; hashtag effectiveness over time.
Export & Integrations
•
Social scheduler partners (e.g., Buffer/Later/Hootsuite)** via approved APIs**.
•
Notion/Google Drive export (folders: /copy, /images, /video‑boards, /calendar).
•
Slack daily summary; CSV/XLSX export for captions/schedules.
Guardrails & Compliance
•
Profanity/brand‑safety filters; banned topic list; platform policy checks.
•
Licensing flags for third‑party material; watermark options.
4) Backend Architecture (Extremely Detailed & Deployment‑Ready)
4.1 High‑Level Topology
•
Frontend/BFF: Next.js 14 (Vercel).
•
API Gateway: Node/NestJS (REST, OpenAPI, RBAC, rate limiting).
•
Auth: Auth.js (OAuth) + JWT (short‑lived) + refresh rotation; SAML/OIDC for enterprise.
•
Orchestration: CrewAI “orchestrator” (Python FastAPI) coordinating agents: Trend Scout, Copywriter, Designer, Growth Hacker, Editor‑in‑Chief (EIC).
•
Workers (Python):
o
trend-harvester (fetch/normalize trends from approved providers)
o
copy-generator (angles, hooks, captions, threads, CTAs)
o
visual-generator (image prompts, SDXL/DALL·E calls, upscaling; video storyboard)
o
hashtag-engine (ranking, ladders, saturation scoring)
o
scheduler (slot recommendations, calendar build)
o
exporter (Notion/Drive, schedulers)
o
moderator (brand‑safety, policy checks, toxicity)
o
analytics-puller (ingests post metrics from partners)
•
Event Bus: NATS (subjects like campaign.*, asset.*, export.*).
•
Queue/Tasks: Celery (Redis/NATS backend).
•
DB: Postgres (Neon/Cloud SQL) + pgvector for retrieval on briefs/angles/copy.
•
Object Storage: S3/R2 for images, packs, exports.
•
Cache: Upstash Redis (sessions, hot campaign objects).
•
Realtime: WebSocket gateway (NestJS Gateway) + SSE fallback.
•
Observability: OpenTelemetry traces + Prometheus/Grafana; Sentry for errors; structured logs.
•
Secrets: Cloud Secrets Manager/Vault; KMS for provider tokens; no plaintext secrets in env.
4.2 Service Responsibilities
1.
api-gateway (Node/NestJS)
a.
Validates requests (zod/ajv), enforces RBAC & rate limits, signs upload URLs, exposes OpenAPI.
b.
Fan‑out to orchestrator/workers via REST or NATS RPC.
2.
auth-service
a.
OAuth for users; OAuth per‑org connections to scheduler partners; token vaulting (encrypted at rest).
b.
Issues JWT access tokens (5–15 min) + rotating refresh.
3.
orchestrator (Python FastAPI + CrewAI)
a.
Session state machine per campaign: created → researching → drafting → assembling → scheduling → reviewing → exported.
b.
Manages agent graph & tool permissions; aggregates outputs into a single Campaign Kit object.
c.
Emits fine‑grained tick events (e.g., angle.proposed, copy.partial, image.previewed).
4.
trend-harvester
a.
Pulls from approved trend providers or internal datasets (no scraping against ToS).
b.
Normalizes to schema: {platform, topic, velocity, examples[], hashtags[], updated_at}.
c.
Clustering & velocity scoring; stores top‑N per platform.
5.
copy-generator
a.
Generates angles → hooks → captions; supports A/B matrix generation.
b.
Voice constraints (tone, banned words, brand lexicon).
c.
Citations/justifications optionally attached (why this angle should work based on trend features).
6.
visual-generator
a.
Image prompt writer → calls provider (e.g., SDXL, DALL·E) via tool adapter; aspect ratio & safe content flags.
b.
Upscaling/compression pipeline; multiple formats & platform crops; thumbnail generation.
c.
Video storyboard creator: shot list, overlays, captions timing (SRT/WEBVTT).
7.
hashtag-engine
a.
Ranks & buckets tags by size tiers (Large/Medium/Niche) with saturation score.
b.
Per‑platform syntax (e.g., X vs. IG differences); blacklist/whitelist.
8.
scheduler
a.
Builds posting calendar: recommended times, cadence, platform caps; collision avoidance across campaigns.
b.
Computes A/B schedule mapping (Variant A vs. B distribution).
c.
Tracks post dependencies (assets ready, approvals done).
9.
exporter
a.
Writes pack to Notion/Drive; zips all assets; generates schedule.csv; calls partner scheduler APIs.
b.
Handles OAuth token refresh + retries; webhooks to confirm publish queueing.
10.
moderator
•
Brand‑safety & compliance: toxicity, harassment, political sensitivity filters; legal phrase checks.
•
Image safety classifier (nudity/violence) before export.
11.
analytics-puller
•
Imports KPIs from partner APIs post‑publish; maps to experiment variants; stores time series.
12.
billing-service
•
Stripe seats + metered (tokens, image generations); usage caps; webhook reconciliation.
13.
analytics-service
•
Aggregates and serves dashboards: angle performance cohorts, hashtag effectiveness, time‑of‑day lift.
4.3 Data Model (Postgres + pgvector)
CREATE TABLE orgs ( id UUID PRIMARY KEY, name TEXT NOT NULL, plan TEXT, created_at TIMESTAMPTZ DEFAULT now() ); CREATE TABLE users ( id UUID PRIMARY KEY, org_id UUID REFERENCES orgs(id), email CITEXT UNIQUE, name TEXT, role TEXT, created_at TIMESTAMPTZ DEFAULT now() ); CREATE TABLE campaigns ( id UUID PRIMARY KEY, org_id UUID REFERENCES orgs(id), name TEXT, brief TEXT, platforms TEXT[] CHECK (array_length(platforms,1) > 0), target_audience JSONB, tone JSONB, goals JSONB, status TEXT CHECK (status IN ('created','researching','drafting','assembling','scheduling','reviewing','exported','failed')) DEFAULT 'created', created_by UUID REFERENCES users(id), created_at TIMESTAMPTZ DEFAULT now() ); CREATE TABLE angles ( id UUID PRIMARY KEY, campaign_id UUID REFERENCES campaigns(id), title TEXT, rationale TEXT, score NUMERIC, meta JSONB, created_at TIMESTAMPTZ DEFAULT now() ); CREATE TABLE copies ( id UUID PRIMARY KEY, campaign_id UUID, angle_id UUID, platform TEXT, variant TEXT, text TEXT, reading_level INT, banned_flags JSONB, meta JSONB, created_at TIMESTAMPTZ DEFAULT now() );
CREATE TABLE hashtags ( id UUID PRIMARY KEY, campaign_id UUID, angle_id UUID, platform TEXT, bucket TEXT CHECK (bucket IN ('large','medium','niche')), tags TEXT[], saturation NUMERIC, created_at TIMESTAMPTZ DEFAULT now() ); CREATE TABLE assets ( id UUID PRIMARY KEY, campaign_id UUID, angle_id UUID, kind TEXT CHECK (kind IN ('image','video_storyboard')), prompt TEXT, provider TEXT, s3_key TEXT, width INT, height INT, format TEXT, moderation JSONB, created_at TIMESTAMPTZ DEFAULT now() ); CREATE TABLE schedules ( id UUID PRIMARY KEY, campaign_id UUID, platform TEXT, scheduled_at TIMESTAMPTZ, variant TEXT, copy_id UUID, asset_id UUID, status TEXT CHECK (status IN ('draft','queued','published','failed')) DEFAULT 'draft', external_ref TEXT, created_at TIMESTAMPTZ DEFAULT now() ); CREATE TABLE experiments ( id UUID PRIMARY KEY, campaign_id UUID, name TEXT, factors JSONB, -- e.g., {hook:['H1','H2'], cta:['CTA1','CTA2']} design TEXT CHECK (design IN ('ab','multi-factor')), created_at TIMESTAMPTZ DEFAULT now() ); CREATE TABLE metrics ( id BIGSERIAL PRIMARY KEY, campaign_id UUID, schedule_id UUID, platform TEXT, kpi TEXT, value NUMERIC, observed_at TIMESTAMPTZ ); CREATE TABLE trend_topics ( id UUID PRIMARY KEY, platform TEXT, topic TEXT, velocity NUMERIC,
examples JSONB, hashtags TEXT[], updated_at TIMESTAMPTZ DEFAULT now() ); CREATE TABLE integrations ( id UUID PRIMARY KEY, org_id UUID, provider TEXT, scopes TEXT[], access_token TEXT, refresh_token TEXT, expires_at TIMESTAMPTZ, meta JSONB ); CREATE TABLE audit_log ( id BIGSERIAL PRIMARY KEY, org_id UUID, user_id UUID, action TEXT, target TEXT, meta JSONB, created_at TIMESTAMPTZ DEFAULT now() );
Embeddings: store on angles, copies (VECTOR(1536)) to enable semantic reuse and retrieval.
4.4 API Surface (REST /v1, OpenAPI)
Auth & Orgs
•
POST /v1/auth/login / POST /v1/auth/token / POST /v1/auth/refresh
•
GET /v1/me (orgs, roles)
•
POST /v1/integrations/:provider/connect (OAuth start)
•
DELETE /v1/integrations/:id (revoke)
Campaigns
•
POST /v1/campaigns {name, brief, platforms[], audience, tone, goals}
•
GET /v1/campaigns/:id / GET /v1/campaigns?cursor=
•
POST /v1/campaigns/:id/start → state→researching
•
POST /v1/campaigns/:id/approve (EIC sign‑off)
•
GET /v1/campaigns/:id/kit (assembled outputs)
Angles/Copy/Hashtags/Assets
•
POST /v1/campaigns/:id/angles/generate {count}
•
POST /v1/angles/:id/copy/generate {platform, variants}
•
POST /v1/angles/:id/hashtags/generate {platform}
•
POST /v1/angles/:id/assets/generate {kind, count, prompt_overrides?}
•
GET /v1/assets/:id (signed download)
Scheduling & Export
•
POST /v1/campaigns/:id/schedule/recommend {cadence, window}
•
POST /v1/schedules/:id/queue (send to scheduler partner)
•
POST /v1/exports/notion {campaign_id, page_id}
•
POST /v1/exports/drive {campaign_id, folder_id}
•
GET /v1/analytics/campaigns/:id (KPIs, A/B diffs)
Conventions
•
Idempotency‑Key on all POST/PUT/PATCH.
•
Problem+JSON errors; typed codes.
•
Cursor pagination; RLS enforced on org_id.
4.5 Orchestration Logic (CrewAI)
Agents & Tools
•
Trend Scout: pulls trend topics; Trends.get(platform), Trends.cluster().
•
Copywriter: Copy.generate(angle, platform, tone, banned), Thread.generate().
•
Designer: Visual.prompt(angle, brand_assets), Image.generate(), Video.storyboard(), Image.upscale().
•
Growth Hacker: Hashtags.rank(), Schedule.recommend(), Experiment.plan() (A/B factors).
•
Editor‑in‑Chief (EIC): enforces brand voice & policy; Moderation.check(), sign‑off.
State Machine
created → researching (Trend Scout) → drafting (Copywriter/Designer/Growth) → assembling (EIC synthesis) → scheduling (slots + A/B mapping) → reviewing (approvals) → exported (Notion/Drive/Scheduler).
Turn Loop Example (angle → copy → assets)
1.
Trend Scout proposes 10 angles with rationale.
2.
EIC filters to 3 (policy/brand fit).
3.
Copywriter generates A/B captions per platform + CTAs.
4.
Designer generates image prompts → provider → previews + crops; video storyboard.
5.
Growth Hacker creates hashtag ladders & posting times; constructs experiments.
6.
EIC compiles Campaign Kit; Moderator runs safety pass; ready for export.
4.6 Background Jobs
•
TrendHarvest(platform) every N minutes (provider dependent).
•
GenerateAngles(campaignId) → writes angles.
•
GenerateCopy(angleId, platform); GenerateAssets(angleId); GenerateHashtags(angleId).
•
BuildSchedule(campaignId) → writes schedules.
•
ExportKit(campaignId, destination) → Notion/Drive/ZIP, plus schedule.csv.
•
QueuePublish(scheduleId) → partner scheduler; update external_ref; poll status.
•
PullMetrics(scheduleId) periodically after publish.
•
CostRollup(orgId), RetentionSweeper(), AlertOnFailure(jobId).
4.7 Realtime
•
WS channels:
o
campaign:{id}:progress (angles/copy/assets ticks)
o
campaign:{id}:review (comments, approvals)
o
export:{id}:status
•
Events: angle.proposed, copy.partial, asset.preview, asset.moderated, schedule.ready, export.completed.
•
SSE fallback for restricted networks.
4.8 Caching & Performance
•
Redis caches: hot campaigns, trend clusters per platform, last recs.
•
Debounce/queue expensive generations; concurrency caps per org.
•
Token bucket rate limits per user + per org; cost guardrails.
•
SLOs: first partial copy < 1.8s P95; image preview < 10s P95; full kit assembly (3 angles) < 90s P95.
4.9 Observability
•
Traces across gateway → orchestrator → workers; model/provider labels.
•
Metrics: copy gen time, image gen success %, moderation rejection rate, export success %, publish queue latency.
•
Logs: structured; correlation ids; PII‑safe; audit trail on approvals & exports.
5) Frontend Architecture (React 18 + Next.js 14)
5.1 Tech Choices
•
Next.js 14 App Router, TypeScript, Server Components where feasible.
•
UI: shadcn/ui + Tailwind (Mantine optional).
•
State/data: TanStack Query (server cache) + Zustand for ephemeral creation state.
•
Forms: react‑hook‑form + Zod (shared types from OpenAPI).
•
Realtime: WebSocket client with reconnect & backoff; SSE fallback.
•
Charts: Recharts (A/B outcomes, posting heatmaps).
•
Media: custom AssetViewer (image previews, crops); StoryboardViewer.
5.2 App Structure
/app /(marketing)/page.tsx /(app) dashboard/page.tsx campaigns/ page.tsx new/page.tsx [campaignId]/ page.tsx // Campaign Overview brief/page.tsx // Brief & brand assets angles/page.tsx copy/page.tsx assets/page.tsx hashtags/page.tsx schedule/page.tsx
review/page.tsx exports/page.tsx admin/ usage/page.tsx audit/page.tsx /components BriefForm/* AngleBoard/* CopyWorkbench/* AssetStudio/* HashtagLab/* ScheduleBuilder/* ReviewCenter/* ExportHub/* Analytics/* /lib api-client.ts ws-client.ts zod-schemas.ts rbac.ts /store useCampaignStore.ts useRealtimeStore.ts
5.3 Key Pages & UX Flows
Dashboard
•
Quick actions: “New Campaign”, “Resume in Progress”, “Latest Exports”.
•
Cards show: campaigns running, assets ready, pending approvals.
Brief
•
Form with brand, audience, tone, constraints; brand asset uploader (logos, palettes).
•
Validation: banned word list; tone presets selectable.
•
Save as Template for reuse.
Angles
•
Real‑time stream of proposed angles with rationale & trend references.
•
Triage UI: Keep/Discard; drag to Top 3; EIC approval gate.
Copy
•
CopyWorkbench with tabs per platform.
•
A/B matrix grid (rows=hooks, columns=CTAs); inline edits; reading level meter.
•
Moderation flags show inline; guidance tooltips for policy conflicts.
Assets
•
AssetStudio: image preview grid, prompt editor, regeneration, upscaling toggle, platform crops (1:1, 4:5, 9:16).
•
StoryboardViewer: frame list with on‑screen text layers and caption timing.
•
Brand overlay switch (watermark/logo placement).
Hashtags
•
Ladder builder with size buckets; blacklist enforcement; saturation warnings.
Schedule
•
Calendar heatmap + recommended slots; drag‑and‑drop posts; collision warnings.
•
A/B assignment: split sliders and per‑platform caps.
Review
•
Threaded comments by step (Angles/Copy/Assets/Schedule).
•
EIC Approve/Request changes; change log; compare versions.
Exports
•
Notion/Drive destination selector; ZIP export; schedule.csv.
•
Scheduler partner picker; publish queue status with live updates.
5.4 Component Breakdown (Selected)
•
AngleBoard/AngleCard.tsx
Props: { angle, onKeep, onDiscard }. Shows title, rationale, trend references. Emits selection events used by Orchestrator.
•
CopyWorkbench/VariantGrid.tsx
Props: { platform, variants, onEdit, onAddVariant }. Inline editing, validation against zodSchemas.copy, shows moderation badges.
•
AssetStudio/PromptEditor.tsx
Props: { angleId, prompt, negatives, onGenerate }. Provides guidance tokens (brand lexicon), aspect ratio picker; renders generation progress.
•
ScheduleBuilder/Calendar.tsx
Props: { recommendedSlots, posts, onDrag }. Collision detection; warns if required asset/copy missing; A/B mapping preview.
•
ExportHub/PartnerConnector.tsx
Props: { providers, connected, onConnect }. OAuth initiation, scope display; token status.
5.5 Data Fetching & Caching
•
Server Components for campaign overview, angles list.
•
TanStack Query for interactive generation (useMutation) and lists.
•
WebSocket streams write to cache via queryClient.setQueryData.
•
Route prefetch for step transitions.
5.6 Validation & Errors
•
Zod shared types; Problem+JSON parser for server errors.
•
Idempotency keys on all generates/exports to avoid dupes.
•
Friendly recoveries: regeneration on failed image; retry with backoff on partner API.
•
Empty states with help text (e.g., “Connect a scheduler to enable publishing”).
5.7 Accessibility & i18n
•
Keyboard navigation for grids, drag handles with accessible alternatives.
•
ARIA on previews and modals; focus management.
•
next-intl scaffolding; RTL readiness; copy externalized.
6) Integrations
•
Schedulers (approved partners): Buffer, Later, Hootsuite (OAuth; per‑platform scopes).
•
Storage & Docs: Google Drive/Docs, Notion.
•
Image/Video Gen: pluggable providers via adapter (e.g., SDXL, DALL·E) with safety filters & content flags.
•
Analytics: partner API pulls for post KPIs (subject to platform permissions).
•
Comms: Slack webhooks for daily digest, “kit ready”, “publish queued”.
•
Identity/SSO: Auth.js + SAML/OIDC; SCIM for enterprise user lifecycle.
•
Billing: Stripe (seats + metered for generations & tokens).
•
Monitoring: Sentry, Grafana stack; optional Langsmith for LLM traces.
7) DevOps & Deployment
•
FE: Vercel (Next.js 14).
•
APIs/Workers: Render/Fly.io (simple) or GKE (scale).
•
DB: Neon/Cloud SQL Postgres + pgvector; PITR backups.
•
Cache: Upstash Redis.
•
Object Storage: R2/S3 with lifecycle policies.
•
Event Bus: NATS (managed or self‑hosted).
•
CI/CD: GitHub Actions (lint, typecheck, unit/integration tests, Docker build, deploy approvals).
•
IaC: Terraform modules for DB, Redis, NATS, buckets, secrets, DNS, CDN.
•
Testing: unit (copy/hashtag/slots), contract (OpenAPI), E2E (Playwright), load (k6 concurrent campaigns), chaos (model latency), security (ZAP).
•
Content Moderation: pre‑export scanning pipeline; blocked outputs quarantined with review queue.
•
Cost Controls: per‑org limits; alerting on spike in generations.
8) Success Criteria
Product KPIs
•
70%+ campaigns exported within 24h of creation.
•
A/B improvements: Variant B beats A in ≥ 55% tests on primary KPI (CTR or watch time).
•
Time to first ready kit (3 angles) < 5 minutes median.
•
30‑day org retention ≥ 40%.
Engineering SLOs
•
P95 time to first copy partial < 1.8s.
•
P95 image preview < 10s.
•
Export success rate ≥ 99% (excluding partner outages).
•
Publish queue confirmation < 30s P95.
9) Security & Compliance
•
AuthZ: org‑scoped RBAC (Owner/Admin/Editor/Viewer); least‑privilege on tool calls.
•
Encryption: TLS 1.2+; AES‑256 at rest; envelope encryption for tokens.
•
Token Safety: provider OAuth tokens encrypted, scoped, and rotated; no logging of tokens.
•
Content Safety: toxicity & policy classifiers; banned words; platform ToS checks; watermark option for AI images.
•
PII/DLP: detection in copy; redact or block per policy.
•
Tenant Isolation: Postgres RLS; S3 prefix isolation per org.
•
Auditability: immutable audit log of approvals, exports, publishes; tamper‑evident store.
•
Supply Chain: SLSA provenance; container image signing; pinned base images.
•
Compliance: SOC 2 Type II roadmap, ISO 27001; GDPR readiness (DSRs, data retention); brand/IP guidelines logging.
10) Visual/Logical Flows
Generation Flow
Brief → Trend Scout proposes angles → EIC selects top 3 → Copywriter generates A/B per platform → Designer generates image prompts & storyboards → Growth Hacker builds hashtag ladders & schedule → Moderator safety pass → EIC finalizes → Export to Notion/Drive + Scheduler.
Data Flow
Brief & brand assets → embeddings for reuse → angles/copy/assets stored & versioned → schedules linked to variants → exports created (ZIP, CSV, Notion/Drive) → publish queue refs saved → KPIs pulled back → analytics cohorting.
A/B Experiment Flow
Define factors (hook/CTA/length) → Scheduler maps calendar slots to variants → After publish, Analytics‑puller imports metrics → Evaluator computes lifts & significance → Dashboard shows winners → Recommendations feed next campaign.