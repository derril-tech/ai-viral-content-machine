import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsOptional, IsObject, IsArray } from 'class-validator';
import { BaseEntityDto } from '../../common/dto/base.dto';

export class MetricDto {
  @ApiProperty({ description: 'Metric name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Metric value' })
  @IsNumber()
  value: number;

  @ApiProperty({ description: 'Metric unit', required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ description: 'Metric timestamp' })
  @IsString()
  timestamp: string;
}

export class CampaignMetricsDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Total views' })
  @IsNumber()
  totalViews: number;

  @ApiProperty({ description: 'Total likes' })
  @IsNumber()
  totalLikes: number;

  @ApiProperty({ description: 'Total shares' })
  @IsNumber()
  totalShares: number;

  @ApiProperty({ description: 'Total comments' })
  @IsNumber()
  totalComments: number;

  @ApiProperty({ description: 'Engagement rate' })
  @IsNumber()
  engagementRate: number;

  @ApiProperty({ description: 'Reach' })
  @IsNumber()
  reach: number;

  @ApiProperty({ description: 'Impressions' })
  @IsNumber()
  impressions: number;

  @ApiProperty({ description: 'Click-through rate' })
  @IsNumber()
  ctr: number;

  @ApiProperty({ description: 'Conversion rate' })
  @IsNumber()
  conversionRate: number;

  @ApiProperty({ description: 'Revenue generated' })
  @IsNumber()
  revenue: number;

  @ApiProperty({ description: 'Cost per acquisition' })
  @IsNumber()
  cpa: number;

  @ApiProperty({ description: 'Return on ad spend' })
  @IsNumber()
  roas: number;

  @ApiProperty({ description: 'Time series data' })
  @IsArray()
  timeSeries: MetricDto[];

  @ApiProperty({ description: 'Platform breakdown' })
  @IsObject()
  platformBreakdown: Record<string, any>;

  @ApiProperty({ description: 'Content performance' })
  @IsObject()
  contentPerformance: Record<string, any>;

  @ApiProperty({ description: 'Additional metadata' })
  @IsObject()
  meta: Record<string, any>;
}

export class ABTestResultDto {
  @ApiProperty({ description: 'Test ID' })
  @IsString()
  testId: string;

  @ApiProperty({ description: 'Variant A metrics' })
  @IsObject()
  variantA: Record<string, any>;

  @ApiProperty({ description: 'Variant B metrics' })
  @IsObject()
  variantB: Record<string, any>;

  @ApiProperty({ description: 'Statistical significance' })
  @IsNumber()
  significance: number;

  @ApiProperty({ description: 'Winner variant' })
  @IsString()
  winner: string;

  @ApiProperty({ description: 'Confidence interval' })
  @IsObject()
  confidenceInterval: Record<string, any>;
}

export class GetAnalyticsDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Start date', required: false })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({ description: 'End date', required: false })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiProperty({ description: 'Platform filter', required: false })
  @IsOptional()
  @IsString()
  platform?: string;

  @ApiProperty({ description: 'Include A/B test results', default: true })
  @IsOptional()
  includeABTests?: boolean = true;
}
