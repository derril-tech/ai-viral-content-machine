import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsEnum, IsOptional, IsObject } from 'class-validator';
import { BaseEntityDto } from '../../common/dto/base.dto';

export enum Platform {
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
}

export enum ScheduleStatus {
  DRAFT = 'draft',
  QUEUED = 'queued',
  PUBLISHED = 'published',
  FAILED = 'failed',
}

export class CreateScheduleDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Target platform', enum: Platform })
  @IsEnum(Platform)
  platform: Platform;

  @ApiProperty({ description: 'Scheduled date/time' })
  @IsString()
  scheduledAt: string;

  @ApiProperty({ description: 'Content variant' })
  @IsString()
  variant: string;

  @ApiProperty({ description: 'Copy ID' })
  @IsUUID()
  copyId: string;

  @ApiProperty({ description: 'Asset ID' })
  @IsUUID()
  assetId: string;

  @ApiProperty({ description: 'Schedule status', enum: ScheduleStatus })
  @IsEnum(ScheduleStatus)
  status: ScheduleStatus;

  @ApiProperty({ description: 'External reference ID', required: false })
  @IsOptional()
  @IsString()
  externalRef?: string;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class UpdateScheduleDto {
  @ApiProperty({ description: 'Scheduled date/time', required: false })
  @IsOptional()
  @IsString()
  scheduledAt?: string;

  @ApiProperty({ description: 'Schedule status', required: false })
  @IsOptional()
  @IsEnum(ScheduleStatus)
  status?: ScheduleStatus;

  @ApiProperty({ description: 'External reference ID', required: false })
  @IsOptional()
  @IsString()
  externalRef?: string;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class ScheduleDto extends BaseEntityDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Target platform', enum: Platform })
  @IsEnum(Platform)
  platform: Platform;

  @ApiProperty({ description: 'Scheduled date/time' })
  @IsString()
  scheduledAt: string;

  @ApiProperty({ description: 'Content variant' })
  @IsString()
  variant: string;

  @ApiProperty({ description: 'Copy ID' })
  @IsUUID()
  copyId: string;

  @ApiProperty({ description: 'Asset ID' })
  @IsUUID()
  assetId: string;

  @ApiProperty({ description: 'Schedule status', enum: ScheduleStatus })
  @IsEnum(ScheduleStatus)
  status: ScheduleStatus;

  @ApiProperty({ description: 'External reference ID' })
  @IsString()
  externalRef: string;

  @ApiProperty({ description: 'Additional metadata' })
  meta: Record<string, any>;
}

export class RecommendScheduleDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Posting cadence (posts per day)', default: 2 })
  @IsOptional()
  @IsString()
  cadence?: string = '2';

  @ApiProperty({ description: 'Time window (days)', default: 7 })
  @IsOptional()
  @IsString()
  window?: string = '7';
}
