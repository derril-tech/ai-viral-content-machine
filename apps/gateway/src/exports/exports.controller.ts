import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { ExportsService } from './exports.service';
import {
  CreateExportDto,
  UpdateExportDto,
  ExportDto,
  QueueExportDto,
} from './dto/export.dto';

@ApiTags('exports')
@Controller('exports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new export' })
  @ApiResponse({
    status: 201,
    description: 'Export created successfully',
    type: ExportDto,
  })
  async create(
    @Body() createExportDto: CreateExportDto,
    @User() user: any,
  ): Promise<ExportDto> {
    try {
      return await this.exportsService.create(createExportDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create export',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all exports' })
  @ApiQuery({ name: 'campaignId', required: false, description: 'Filter by campaign ID' })
  @ApiQuery({ name: 'format', required: false, description: 'Filter by export format' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by export status' })
  @ApiResponse({
    status: 200,
    description: 'Exports retrieved successfully',
    type: [ExportDto],
  })
  async findAll(
    @Query('campaignId') campaignId?: string,
    @Query('format') format?: string,
    @Query('status') status?: string,
    @User() user?: any,
  ): Promise<ExportDto[]> {
    try {
      return await this.exportsService.findAll({ campaignId, format, status }, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get exports',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get export by ID' })
  @ApiParam({ name: 'id', description: 'Export ID' })
  @ApiResponse({
    status: 200,
    description: 'Export retrieved successfully',
    type: ExportDto,
  })
  @ApiResponse({ status: 404, description: 'Export not found' })
  async findOne(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<ExportDto> {
    try {
      return await this.exportsService.findOne(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get export',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update export' })
  @ApiParam({ name: 'id', description: 'Export ID' })
  @ApiResponse({
    status: 200,
    description: 'Export updated successfully',
    type: ExportDto,
  })
  @ApiResponse({ status: 404, description: 'Export not found' })
  async update(
    @Param('id') id: string,
    @Body() updateExportDto: UpdateExportDto,
    @User() user: any,
  ): Promise<ExportDto> {
    try {
      return await this.exportsService.update(id, updateExportDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update export',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete export' })
  @ApiParam({ name: 'id', description: 'Export ID' })
  @ApiResponse({
    status: 200,
    description: 'Export deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Export not found' })
  async remove(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<{ message: string }> {
    try {
      return await this.exportsService.remove(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete export',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('queue')
  @ApiOperation({ summary: 'Queue export for generation' })
  @ApiResponse({
    status: 201,
    description: 'Export queued successfully',
    type: ExportDto,
  })
  async queue(
    @Body() queueExportDto: QueueExportDto,
    @User() user: any,
  ): Promise<ExportDto> {
    try {
      return await this.exportsService.queue(queueExportDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to queue export',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('campaigns/:campaignId')
  @ApiOperation({ summary: 'Get exports by campaign ID' })
  @ApiParam({ name: 'campaignId', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Exports retrieved successfully',
    type: [ExportDto],
  })
  async findByCampaign(
    @Param('campaignId') campaignId: string,
    @User() user: any,
  ): Promise<ExportDto[]> {
    try {
      return await this.exportsService.findByCampaign(campaignId, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get exports by campaign',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Download export file' })
  @ApiParam({ name: 'id', description: 'Export ID' })
  @ApiResponse({
    status: 200,
    description: 'Export file downloaded successfully',
  })
  @ApiResponse({ status: 404, description: 'Export not found' })
  async download(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<{ downloadUrl: string; expiresAt: string }> {
    try {
      return await this.exportsService.download(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to download export',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
