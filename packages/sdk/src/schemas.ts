// Created automatically by Cursor AI (2024-08-24)
import { z } from 'zod';

export const CampaignStatusSchema = z.enum([
  'created',
  'researching',
  'drafting',
  'assembling',
  'scheduling',
  'reviewing',
  'exported',
  'failed',
]);

export const PlatformSchema = z.enum([
  'tiktok',
  'instagram',
  'youtube',
  'twitter',
  'linkedin',
]);

export const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CampaignSchema = BaseEntitySchema.extend({
  name: z.string().min(1),
  brief: z.string().min(1),
  platforms: z.array(PlatformSchema).min(1),
  targetAudience: z.record(z.any()),
  tone: z.record(z.any()),
  goals: z.record(z.any()),
  constraints: z.record(z.any()),
  status: CampaignStatusSchema,
  orgId: z.string().uuid(),
  createdBy: z.string().uuid(),
});

export const CreateCampaignSchema = CampaignSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  orgId: true,
  createdBy: true,
});

export const UpdateCampaignSchema = CreateCampaignSchema.partial();

export const AngleSchema = BaseEntitySchema.extend({
  title: z.string().min(1),
  rationale: z.string().min(1),
  campaignId: z.string().uuid(),
  score: z.number().min(0).max(1),
  meta: z.record(z.any()),
});

export const CreateAngleSchema = AngleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateAngleSchema = CreateAngleSchema.partial();

export const GenerateAnglesSchema = z.object({
  campaignId: z.string().uuid(),
  count: z.number().int().min(1).max(20).default(10),
});

export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const LoginResponseSchema = z.object({
  access_token: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    orgId: z.string(),
    role: z.string(),
  }),
});
