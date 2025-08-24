import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsEnum, IsOptional, IsObject } from 'class-validator';
import { BaseEntityDto } from '../../common/dto/base.dto';

export enum AssetKind {
  IMAGE = 'image',
  VIDEO_STORYBOARD = 'video_storyboard',
}

export class CreateAssetDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Angle ID' })
  @IsUUID()
  angleId: string;

  @ApiProperty({ description: 'Asset kind', enum: AssetKind })
  @IsEnum(AssetKind)
  kind: AssetKind;

  @ApiProperty({ description: 'Generation prompt' })
  @IsString()
  prompt: string;

  @ApiProperty({ description: 'AI provider used' })
  @IsString()
  provider: string;

  @ApiProperty({ description: 'S3 key for the asset' })
  @IsString()
  s3Key: string;

  @ApiProperty({ description: 'Asset width' })
  @IsNumber()
  width: number;

  @ApiProperty({ description: 'Asset height' })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'File format' })
  @IsString()
  format: string;

  @ApiProperty({ description: 'Moderation results', required: false })
  @IsOptional()
  @IsObject()
  moderation?: Record<string, any>;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class UpdateAssetDto {
  @ApiProperty({ description: 'Generation prompt', required: false })
  @IsOptional()
  @IsString()
  prompt?: string;

  @ApiProperty({ description: 'Moderation results', required: false })
  @IsOptional()
  @IsObject()
  moderation?: Record<string, any>;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class AssetDto extends BaseEntityDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Angle ID' })
  @IsUUID()
  angleId: string;

  @ApiProperty({ description: 'Asset kind', enum: AssetKind })
  @IsEnum(AssetKind)
  kind: AssetKind;

  @ApiProperty({ description: 'Generation prompt' })
  @IsString()
  prompt: string;

  @ApiProperty({ description: 'AI provider used' })
  @IsString()
  provider: string;

  @ApiProperty({ description: 'S3 key for the asset' })
  @IsString()
  s3Key: string;

  @ApiProperty({ description: 'Asset width' })
  @IsNumber()
  width: number;

  @ApiProperty({ description: 'Asset height' })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'File format' })
  @IsString()
  format: string;

  @ApiProperty({ description: 'Moderation results' })
  moderation: Record<string, any>;

  @ApiProperty({ description: 'Additional metadata' })
  meta: Record<string, any>;
}

export class GenerateAssetsDto {
  @ApiProperty({ description: 'Angle ID' })
  @IsUUID()
  angleId: string;

  @ApiProperty({ description: 'Asset kind', enum: AssetKind })
  @IsEnum(AssetKind)
  kind: AssetKind;

  @ApiProperty({ description: 'Number of assets to generate', default: 3 })
  @IsOptional()
  @IsNumber()
  count?: number = 3;

  @ApiProperty({ description: 'Custom prompt', required: false })
  @IsOptional()
  @IsString()
  prompt?: string;
}
