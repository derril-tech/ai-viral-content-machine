import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsEnum, IsOptional, IsObject } from 'class-validator';
import { BaseEntityDto } from '../../common/dto/base.dto';

export enum Platform {
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
}

export class CreateCopyDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Angle ID' })
  @IsUUID()
  angleId: string;

  @ApiProperty({ description: 'Target platform', enum: Platform })
  @IsEnum(Platform)
  platform: Platform;

  @ApiProperty({ description: 'Copy variant (A, B, C, etc.)' })
  @IsString()
  variant: string;

  @ApiProperty({ description: 'Copy text content' })
  @IsString()
  text: string;

  @ApiProperty({ description: 'Reading level score' })
  @IsNumber()
  readingLevel: number;

  @ApiProperty({ description: 'Banned word flags', required: false })
  @IsOptional()
  @IsObject()
  bannedFlags?: Record<string, any>;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class UpdateCopyDto {
  @ApiProperty({ description: 'Copy text content', required: false })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({ description: 'Reading level score', required: false })
  @IsOptional()
  @IsNumber()
  readingLevel?: number;

  @ApiProperty({ description: 'Banned word flags', required: false })
  @IsOptional()
  @IsObject()
  bannedFlags?: Record<string, any>;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class CopyDto extends BaseEntityDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Angle ID' })
  @IsUUID()
  angleId: string;

  @ApiProperty({ description: 'Target platform', enum: Platform })
  @IsEnum(Platform)
  platform: Platform;

  @ApiProperty({ description: 'Copy variant' })
  @IsString()
  variant: string;

  @ApiProperty({ description: 'Copy text content' })
  @IsString()
  text: string;

  @ApiProperty({ description: 'Reading level score' })
  @IsNumber()
  readingLevel: number;

  @ApiProperty({ description: 'Banned word flags' })
  bannedFlags: Record<string, any>;

  @ApiProperty({ description: 'Additional metadata' })
  meta: Record<string, any>;
}

export class GenerateCopyDto {
  @ApiProperty({ description: 'Angle ID' })
  @IsUUID()
  angleId: string;

  @ApiProperty({ description: 'Target platforms', enum: Platform, isArray: true })
  platforms: Platform[];

  @ApiProperty({ description: 'Number of variants per platform', default: 2 })
  @IsOptional()
  @IsNumber()
  variants?: number = 2;
}
