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
import { HashtagsService } from './hashtags.service';
import {
  CreateHashtagDto,
  UpdateHashtagDto,
  HashtagDto,
  GenerateHashtagsDto,
} from './dto/hashtag.dto';

@ApiTags('hashtags')
@Controller('hashtags')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hashtag' })
  @ApiResponse({
    status: 201,
    description: 'Hashtag created successfully',
    type: HashtagDto,
  })
  async create(
    @Body() createHashtagDto: CreateHashtagDto,
    @User() user: any,
  ): Promise<HashtagDto> {
    try {
      return await this.hashtagsService.create(createHashtagDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create hashtag',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all hashtags' })
  @ApiQuery({ name: 'campaignId', required: false, description: 'Filter by campaign ID' })
  @ApiQuery({ name: 'angleId', required: false, description: 'Filter by angle ID' })
  @ApiQuery({ name: 'platform', required: false, description: 'Filter by platform' })
  @ApiQuery({ name: 'bucket', required: false, description: 'Filter by hashtag bucket' })
  @ApiResponse({
    status: 200,
    description: 'Hashtags retrieved successfully',
    type: [HashtagDto],
  })
  async findAll(
    @Query('campaignId') campaignId?: string,
    @Query('angleId') angleId?: string,
    @Query('platform') platform?: string,
    @Query('bucket') bucket?: string,
    @User() user?: any,
  ): Promise<HashtagDto[]> {
    try {
      return await this.hashtagsService.findAll({ campaignId, angleId, platform, bucket }, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get hashtags',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hashtag by ID' })
  @ApiParam({ name: 'id', description: 'Hashtag ID' })
  @ApiResponse({
    status: 200,
    description: 'Hashtag retrieved successfully',
    type: HashtagDto,
  })
  @ApiResponse({ status: 404, description: 'Hashtag not found' })
  async findOne(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<HashtagDto> {
    try {
      return await this.hashtagsService.findOne(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get hashtag',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update hashtag' })
  @ApiParam({ name: 'id', description: 'Hashtag ID' })
  @ApiResponse({
    status: 200,
    description: 'Hashtag updated successfully',
    type: HashtagDto,
  })
  @ApiResponse({ status: 404, description: 'Hashtag not found' })
  async update(
    @Param('id') id: string,
    @Body() updateHashtagDto: UpdateHashtagDto,
    @User() user: any,
  ): Promise<HashtagDto> {
    try {
      return await this.hashtagsService.update(id, updateHashtagDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update hashtag',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete hashtag' })
  @ApiParam({ name: 'id', description: 'Hashtag ID' })
  @ApiResponse({
    status: 200,
    description: 'Hashtag deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Hashtag not found' })
  async remove(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<{ message: string }> {
    try {
      return await this.hashtagsService.remove(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete hashtag',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate hashtags for an angle' })
  @ApiResponse({
    status: 201,
    description: 'Hashtag generation initiated successfully',
    type: [HashtagDto],
  })
  async generate(
    @Body() generateHashtagsDto: GenerateHashtagsDto,
    @User() user: any,
  ): Promise<HashtagDto[]> {
    try {
      return await this.hashtagsService.generate(generateHashtagsDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to generate hashtags',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('angles/:angleId')
  @ApiOperation({ summary: 'Get hashtags by angle ID' })
  @ApiParam({ name: 'angleId', description: 'Angle ID' })
  @ApiResponse({
    status: 200,
    description: 'Hashtags retrieved successfully',
    type: [HashtagDto],
  })
  async findByAngle(
    @Param('angleId') angleId: string,
    @User() user: any,
  ): Promise<HashtagDto[]> {
    try {
      return await this.hashtagsService.findByAngle(angleId, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get hashtags by angle',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('campaigns/:campaignId')
  @ApiOperation({ summary: 'Get hashtags by campaign ID' })
  @ApiParam({ name: 'campaignId', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Hashtags retrieved successfully',
    type: [HashtagDto],
  })
  async findByCampaign(
    @Param('campaignId') campaignId: string,
    @User() user: any,
  ): Promise<HashtagDto[]> {
    try {
      return await this.hashtagsService.findByCampaign(campaignId, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get hashtags by campaign',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
