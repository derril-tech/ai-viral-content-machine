import {
  Controller,
  Get,
  Post,
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
import { AnalyticsService } from './analytics.service';
import {
  CampaignMetricsDto,
  ABTestResultDto,
  GetAnalyticsDto,
} from './dto/analytics.dto';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('campaigns/:id')
  @ApiOperation({ summary: 'Get campaign analytics' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date (ISO string)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date (ISO string)' })
  @ApiQuery({ name: 'platform', required: false, description: 'Platform filter' })
  @ApiQuery({ name: 'includeABTests', required: false, description: 'Include A/B test results' })
  @ApiResponse({
    status: 200,
    description: 'Campaign analytics retrieved successfully',
    type: CampaignMetricsDto,
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async getCampaignAnalytics(
    @Param('id') id: string,
    @Query() query: GetAnalyticsDto,
    @User() user: any,
  ): Promise<CampaignMetricsDto> {
    try {
      return await this.analyticsService.getCampaignAnalytics(id, query, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get campaign analytics',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('campaigns/:id/ab-tests')
  @ApiOperation({ summary: 'Get A/B test results for campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'A/B test results retrieved successfully',
    type: [ABTestResultDto],
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async getABTestResults(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<ABTestResultDto[]> {
    try {
      return await this.analyticsService.getABTestResults(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get A/B test results',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard analytics' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard analytics retrieved successfully',
  })
  async getDashboardAnalytics(@User() user: any): Promise<any> {
    try {
      return await this.analyticsService.getDashboardAnalytics(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get dashboard analytics',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('campaigns/:id/refresh')
  @ApiOperation({ summary: 'Refresh campaign analytics' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Analytics refresh initiated successfully',
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async refreshCampaignAnalytics(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<{ message: string; jobId: string }> {
    try {
      return await this.analyticsService.refreshCampaignAnalytics(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to refresh campaign analytics',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('campaigns/:id/export')
  @ApiOperation({ summary: 'Export campaign analytics' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiQuery({ name: 'format', required: false, description: 'Export format (csv, json, xlsx)' })
  @ApiResponse({
    status: 200,
    description: 'Analytics exported successfully',
  })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async exportCampaignAnalytics(
    @Param('id') id: string,
    @Query('format') format: string = 'csv',
    @User() user: any,
  ): Promise<{ downloadUrl: string; expiresAt: string }> {
    try {
      return await this.analyticsService.exportCampaignAnalytics(id, format, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to export campaign analytics',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
