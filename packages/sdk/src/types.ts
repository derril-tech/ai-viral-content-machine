// Created automatically by Cursor AI (2024-08-24)

export enum CampaignStatus {
  CREATED = 'created',
  RESEARCHING = 'researching',
  DRAFTING = 'drafting',
  ASSEMBLING = 'assembling',
  SCHEDULING = 'scheduling',
  REVIEWING = 'reviewing',
  EXPORTED = 'exported',
  FAILED = 'failed',
}

export enum Platform {
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign extends BaseEntity {
  name: string;
  brief: string;
  platforms: Platform[];
  targetAudience: Record<string, any>;
  tone: Record<string, any>;
  goals: Record<string, any>;
  constraints: Record<string, any>;
  status: CampaignStatus;
  orgId: string;
  createdBy: string;
}

export interface Angle extends BaseEntity {
  title: string;
  rationale: string;
  campaignId: string;
  score: number;
  meta: Record<string, any>;
}

export interface Copy extends BaseEntity {
  campaignId: string;
  angleId: string;
  platform: Platform;
  variant: string;
  text: string;
  readingLevel: number;
  bannedFlags: Record<string, any>;
  meta: Record<string, any>;
}

export interface Asset extends BaseEntity {
  campaignId: string;
  angleId: string;
  kind: 'image' | 'video_storyboard';
  prompt: string;
  provider: string;
  s3Key: string;
  width: number;
  height: number;
  format: string;
  moderation: Record<string, any>;
}

export interface Hashtag extends BaseEntity {
  campaignId: string;
  angleId: string;
  platform: Platform;
  bucket: 'large' | 'medium' | 'niche';
  tags: string[];
  saturation: number;
}

export interface Schedule extends BaseEntity {
  campaignId: string;
  platform: Platform;
  scheduledAt: string;
  variant: string;
  copyId: string;
  assetId: string;
  status: 'draft' | 'queued' | 'published' | 'failed';
  externalRef: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  nextCursor?: string;
  hasMore: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}
