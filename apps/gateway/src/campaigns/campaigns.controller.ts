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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import {
  CreateCampaignDto,
  UpdateCampaignDto,
  CampaignDto,
  CampaignStatus,
} from './dto/campaign.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/base.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('campaigns')
@Controller('campaigns')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({ status: 201, description: 'Campaign created', type: CampaignDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Body() createCampaignDto: CreateCampaignDto,
    @User('sub') userId: string,
    @User('orgId') orgId: string,
  ): Promise<CampaignDto> {
    return this.campaignsService.create(createCampaignDto, userId, orgId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  @ApiResponse({ status: 200, description: 'Campaigns retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @User('orgId') orgId: string,
  ): Promise<PaginatedResponseDto<CampaignDto>> {
    return this.campaignsService.findAll(paginationDto, orgId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign retrieved', type: CampaignDto })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async findOne(
    @Param('id') id: string,
    @User('orgId') orgId: string,
  ): Promise<CampaignDto> {
    return this.campaignsService.findOne(id, orgId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign updated', type: CampaignDto })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
    @User('orgId') orgId: string,
  ): Promise<CampaignDto> {
    return this.campaignsService.update(id, updateCampaignDto, orgId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 204, description: 'Campaign deleted' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async remove(
    @Param('id') id: string,
    @User('orgId') orgId: string,
  ): Promise<void> {
    return this.campaignsService.remove(id, orgId);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Start campaign processing' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign started', type: CampaignDto })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async start(
    @Param('id') id: string,
    @User('orgId') orgId: string,
  ): Promise<CampaignDto> {
    return this.campaignsService.start(id, orgId);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve campaign for export' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign approved', type: CampaignDto })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async approve(
    @Param('id') id: string,
    @User('orgId') orgId: string,
  ): Promise<CampaignDto> {
    return this.campaignsService.approve(id, orgId);
  }

  @Get(':id/kit')
  @ApiOperation({ summary: 'Get campaign kit (all generated content)' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign kit retrieved' })
  @ApiResponse({ status: 404, description: 'Campaign not found' })
  async getKit(
    @Param('id') id: string,
    @User('orgId') orgId: string,
  ): Promise<any> {
    return this.campaignsService.getKit(id, orgId);
  }
}
