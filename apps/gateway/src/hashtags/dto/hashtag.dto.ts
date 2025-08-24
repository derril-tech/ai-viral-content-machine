import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsEnum, IsArray, IsOptional, IsObject } from 'class-validator';
import { BaseEntityDto } from '../../common/dto/base.dto';

export enum Platform {
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
  YOUTUBE = 'youtube',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
}

export enum HashtagBucket {
  LARGE = 'large',
  MEDIUM = 'medium',
  NICHE = 'niche',
}

export class CreateHashtagDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Angle ID' })
  @IsUUID()
  angleId: string;

  @ApiProperty({ description: 'Target platform', enum: Platform })
  @IsEnum(Platform)
  platform: Platform;

  @ApiProperty({ description: 'Hashtag bucket', enum: HashtagBucket })
  @IsEnum(HashtagBucket)
  bucket: HashtagBucket;

  @ApiProperty({ description: 'Array of hashtags' })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ description: 'Saturation score (0-1)' })
  @IsNumber()
  saturation: number;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class UpdateHashtagDto {
  @ApiProperty({ description: 'Hashtag bucket', required: false })
  @IsOptional()
  @IsEnum(HashtagBucket)
  bucket?: HashtagBucket;

  @ApiProperty({ description: 'Array of hashtags', required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ description: 'Saturation score', required: false })
  @IsOptional()
  @IsNumber()
  saturation?: number;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class HashtagDto extends BaseEntityDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Angle ID' })
  @IsUUID()
  angleId: string;

  @ApiProperty({ description: 'Target platform', enum: Platform })
  @IsEnum(Platform)
  platform: Platform;

  @ApiProperty({ description: 'Hashtag bucket', enum: HashtagBucket })
  @IsEnum(HashtagBucket)
  bucket: HashtagBucket;

  @ApiProperty({ description: 'Array of hashtags' })
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({ description: 'Saturation score (0-1)' })
  @IsNumber()
  saturation: number;

  @ApiProperty({ description: 'Additional metadata' })
  meta: Record<string, any>;
}

export class GenerateHashtagsDto {
  @ApiProperty({ description: 'Angle ID' })
  @IsUUID()
  angleId: string;

  @ApiProperty({ description: 'Target platform', enum: Platform })
  @IsEnum(Platform)
  platform: Platform;

  @ApiProperty({ description: 'Number of hashtags per bucket', default: 5 })
  @IsOptional()
  @IsNumber()
  count?: number = 5;
}
