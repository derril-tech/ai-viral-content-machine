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
import { ScheduleService } from './schedule.service';
import {
  CreateScheduleDto,
  UpdateScheduleDto,
  ScheduleDto,
  RecommendScheduleDto,
} from './dto/schedule.dto';

@ApiTags('schedule')
@Controller('schedule')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new schedule' })
  @ApiResponse({
    status: 201,
    description: 'Schedule created successfully',
    type: ScheduleDto,
  })
  async create(
    @Body() createScheduleDto: CreateScheduleDto,
    @User() user: any,
  ): Promise<ScheduleDto> {
    try {
      return await this.scheduleService.create(createScheduleDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create schedule',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all schedules' })
  @ApiQuery({ name: 'campaignId', required: false, description: 'Filter by campaign ID' })
  @ApiQuery({ name: 'platform', required: false, description: 'Filter by platform' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiResponse({
    status: 200,
    description: 'Schedules retrieved successfully',
    type: [ScheduleDto],
  })
  async findAll(
    @Query('campaignId') campaignId?: string,
    @Query('platform') platform?: string,
    @Query('status') status?: string,
    @User() user?: any,
  ): Promise<ScheduleDto[]> {
    try {
      return await this.scheduleService.findAll({ campaignId, platform, status }, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get schedules',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get schedule by ID' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @ApiResponse({
    status: 200,
    description: 'Schedule retrieved successfully',
    type: ScheduleDto,
  })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async findOne(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<ScheduleDto> {
    try {
      return await this.scheduleService.findOne(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get schedule',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update schedule' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @ApiResponse({
    status: 200,
    description: 'Schedule updated successfully',
    type: ScheduleDto,
  })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async update(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @User() user: any,
  ): Promise<ScheduleDto> {
    try {
      return await this.scheduleService.update(id, updateScheduleDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update schedule',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete schedule' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @ApiResponse({
    status: 200,
    description: 'Schedule deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async remove(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<{ message: string }> {
    try {
      return await this.scheduleService.remove(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete schedule',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('recommend')
  @ApiOperation({ summary: 'Recommend schedule for campaign' })
  @ApiResponse({
    status: 201,
    description: 'Schedule recommendation generated successfully',
    type: [ScheduleDto],
  })
  async recommend(
    @Body() recommendScheduleDto: RecommendScheduleDto,
    @User() user: any,
  ): Promise<ScheduleDto[]> {
    try {
      return await this.scheduleService.recommend(recommendScheduleDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to recommend schedule',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('campaigns/:campaignId')
  @ApiOperation({ summary: 'Get schedules by campaign ID' })
  @ApiParam({ name: 'campaignId', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Schedules retrieved successfully',
    type: [ScheduleDto],
  })
  async findByCampaign(
    @Param('campaignId') campaignId: string,
    @User() user: any,
  ): Promise<ScheduleDto[]> {
    try {
      return await this.scheduleService.findByCampaign(campaignId, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get schedules by campaign',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/queue')
  @ApiOperation({ summary: 'Queue schedule for publishing' })
  @ApiParam({ name: 'id', description: 'Schedule ID' })
  @ApiResponse({
    status: 200,
    description: 'Schedule queued successfully',
  })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async queueSchedule(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<{ message: string; jobId: string }> {
    try {
      return await this.scheduleService.queueSchedule(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to queue schedule',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
