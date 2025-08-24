import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsObject, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { BaseEntityDto } from '../../common/dto/base.dto';

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

export class CreateCampaignDto {
  @ApiProperty({ description: 'Campaign name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Campaign brief' })
  @IsString()
  brief: string;

  @ApiProperty({ description: 'Target platforms', enum: Platform, isArray: true })
  @IsArray()
  platforms: Platform[];

  @ApiProperty({ description: 'Target audience information' })
  @IsObject()
  targetAudience: Record<string, any>;

  @ApiProperty({ description: 'Tone and voice settings' })
  @IsObject()
  tone: Record<string, any>;

  @ApiProperty({ description: 'Campaign goals' })
  @IsObject()
  goals: Record<string, any>;

  @ApiProperty({ description: 'Brand constraints and guidelines', required: false })
  @IsOptional()
  @IsObject()
  constraints?: Record<string, any>;
}

export class UpdateCampaignDto {
  @ApiProperty({ description: 'Campaign name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Campaign brief', required: false })
  @IsOptional()
  @IsString()
  brief?: string;

  @ApiProperty({ description: 'Target platforms', enum: Platform, isArray: true, required: false })
  @IsOptional()
  @IsArray()
  platforms?: Platform[];

  @ApiProperty({ description: 'Target audience information', required: false })
  @IsOptional()
  @IsObject()
  targetAudience?: Record<string, any>;

  @ApiProperty({ description: 'Tone and voice settings', required: false })
  @IsOptional()
  @IsObject()
  tone?: Record<string, any>;

  @ApiProperty({ description: 'Campaign goals', required: false })
  @IsOptional()
  @IsObject()
  goals?: Record<string, any>;

  @ApiProperty({ description: 'Brand constraints and guidelines', required: false })
  @IsOptional()
  @IsObject()
  constraints?: Record<string, any>;
}

export class CampaignDto extends BaseEntityDto {
  @ApiProperty({ description: 'Campaign name' })
  name: string;

  @ApiProperty({ description: 'Campaign brief' })
  brief: string;

  @ApiProperty({ description: 'Target platforms', enum: Platform, isArray: true })
  platforms: Platform[];

  @ApiProperty({ description: 'Target audience information' })
  targetAudience: Record<string, any>;

  @ApiProperty({ description: 'Tone and voice settings' })
  tone: Record<string, any>;

  @ApiProperty({ description: 'Campaign goals' })
  goals: Record<string, any>;

  @ApiProperty({ description: 'Brand constraints and guidelines' })
  constraints: Record<string, any>;

  @ApiProperty({ description: 'Campaign status', enum: CampaignStatus })
  status: CampaignStatus;

  @ApiProperty({ description: 'Organization ID' })
  @IsUUID()
  orgId: string;

  @ApiProperty({ description: 'Created by user ID' })
  @IsUUID()
  createdBy: string;
}
