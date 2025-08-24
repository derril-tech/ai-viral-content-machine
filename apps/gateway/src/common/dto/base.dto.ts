import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsOptional } from 'class-validator';

export class BaseEntityDto {
  @ApiProperty({ description: 'Unique identifier' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ description: 'Last update timestamp' })
  @IsDateString()
  updatedAt: string;
}

export class PaginationDto {
  @ApiProperty({ description: 'Page number', default: 1, required: false })
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ description: 'Items per page', default: 20, required: false })
  @IsOptional()
  limit?: number = 20;

  @ApiProperty({ description: 'Cursor for pagination', required: false })
  @IsOptional()
  cursor?: string;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Array of items' })
  data: T[];

  @ApiProperty({ description: 'Total count of items' })
  total: number;

  @ApiProperty({ description: 'Current page' })
  page: number;

  @ApiProperty({ description: 'Items per page' })
  limit: number;

  @ApiProperty({ description: 'Next cursor for pagination', required: false })
  nextCursor?: string;

  @ApiProperty({ description: 'Has more items' })
  hasMore: boolean;
}
