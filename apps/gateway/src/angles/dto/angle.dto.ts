import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, IsOptional, IsObject } from 'class-validator';
import { BaseEntityDto } from '../../common/dto/base.dto';

export class CreateAngleDto {
  @ApiProperty({ description: 'Angle title' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Angle rationale' })
  @IsString()
  rationale: string;

  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class UpdateAngleDto {
  @ApiProperty({ description: 'Angle title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Angle rationale', required: false })
  @IsOptional()
  @IsString()
  rationale?: string;

  @ApiProperty({ description: 'Additional metadata', required: false })
  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;
}

export class AngleDto extends BaseEntityDto {
  @ApiProperty({ description: 'Angle title' })
  title: string;

  @ApiProperty({ description: 'Angle rationale' })
  rationale: string;

  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Angle score' })
  @IsNumber()
  score: number;

  @ApiProperty({ description: 'Additional metadata' })
  meta: Record<string, any>;
}

export class GenerateAnglesDto {
  @ApiProperty({ description: 'Campaign ID' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ description: 'Number of angles to generate', default: 10 })
  @IsOptional()
  @IsNumber()
  count?: number = 10;
}
