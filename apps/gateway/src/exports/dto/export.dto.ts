import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsEnum, IsOptional, IsObject, IsArray } from 'class-validator';
import { BaseEntityDto } from '../../common/dto/base.dto';

export enum ExportFormat {
  ZIP = 'zip',
  NOTION = 'notion',
  GOOGLE_DRIVE = 'google_drive',
  CSV = 'csv',
}

export enum ExportStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class CreateExportDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Export format', enum: ExportFormat })
  @IsEnum(ExportFormat)
  format: ExportFormat;

  @ApiProperty({ description: 'Export destinations', isArray: true })
  @IsArray()
  @IsString({ each: true })
  destinations: string[];

  @ApiProperty({ description: 'Include copy', default: true })
  @IsOptional()
  includeCopy?: boolean = true;

  @ApiProperty({ description: 'Include assets', default: true })
  @IsOptional()
  includeAssets?: boolean = true;

  @ApiProperty({ description: 'Include hashtags', default: true })
  @IsOptional()
  includeHashtags?: boolean = true;

  @ApiProperty({ description: 'Include schedule', default: true })
  @IsOptional()
  includeSchedule?: boolean = true;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class UpdateExportDto {
  @ApiProperty({ description: 'Export status', required: false })
  @IsOptional()
  @IsEnum(ExportStatus)
  status?: ExportStatus;

  @ApiProperty({ description: 'Export URL', required: false })
  @IsOptional()
  @IsString()
  exportUrl?: string;

  @ApiProperty({ description: 'Error message', required: false })
  @IsOptional()
  @IsString()
  errorMessage?: string;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class ExportDto extends BaseEntityDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Export format', enum: ExportFormat })
  @IsEnum(ExportFormat)
  format: ExportFormat;

  @ApiProperty({ description: 'Export destinations' })
  @IsArray()
  @IsString({ each: true })
  destinations: string[];

  @ApiProperty({ description: 'Export status', enum: ExportStatus })
  @IsEnum(ExportStatus)
  status: ExportStatus;

  @ApiProperty({ description: 'Export URL', required: false })
  @IsOptional()
  @IsString()
  exportUrl?: string;

  @ApiProperty({ description: 'Error message', required: false })
  @IsOptional()
  @IsString()
  errorMessage?: string;

  @ApiProperty({ description: 'Include copy' })
  includeCopy: boolean;

  @ApiProperty({ description: 'Include assets' })
  includeAssets: boolean;

  @ApiProperty({ description: 'Include hashtags' })
  includeHashtags: boolean;

  @ApiProperty({ description: 'Include schedule' })
  includeSchedule: boolean;

  @ApiProperty({ description: 'Additional metadata' })
  meta: Record<string, any>;
}

export class QueueExportDto {
  @ApiProperty({ description: 'Schedule ID' })
  @IsUUID()
  scheduleId: string;

  @ApiProperty({ description: 'Target platform' })
  @IsString()
  platform: string;

  @ApiProperty({ description: 'Scheduler provider', required: false })
  @IsOptional()
  @IsString()
  provider?: string;
}
