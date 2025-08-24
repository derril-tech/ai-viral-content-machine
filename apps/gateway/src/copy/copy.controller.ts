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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CopyService } from './copy.service';
import {
  CreateCopyDto,
  UpdateCopyDto,
  CopyDto,
  GenerateCopyDto,
} from './dto/copy.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/base.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('copy')
@Controller('copy')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CopyController {
  constructor(private readonly copyService: CopyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new copy' })
  @ApiResponse({ status: 201, description: 'Copy created', type: CopyDto })
  async create(
    @Body() createCopyDto: CreateCopyDto,
    @User('orgId') orgId: string,
  ): Promise<CopyDto> {
    return this.copyService.create(createCopyDto, orgId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all copy' })
  @ApiResponse({ status: 200, description: 'Copy retrieved' })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @User('orgId') orgId: string,
  ): Promise<PaginatedResponseDto<CopyDto>> {
    return this.copyService.findAll(paginationDto, orgId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get copy by ID' })
  @ApiParam({ name: 'id', description: 'Copy ID' })
  @ApiResponse({ status: 200, description: 'Copy retrieved', type: CopyDto })
  async findOne(
    @Param('id') id: string,
    @User('orgId') orgId: string,
  ): Promise<CopyDto> {
    return this.copyService.findOne(id, orgId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update copy' })
  @ApiParam({ name: 'id', description: 'Copy ID' })
  @ApiResponse({ status: 200, description: 'Copy updated', type: CopyDto })
  async update(
    @Param('id') id: string,
    @Body() updateCopyDto: UpdateCopyDto,
    @User('orgId') orgId: string,
  ): Promise<CopyDto> {
    return this.copyService.update(id, updateCopyDto, orgId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete copy' })
  @ApiParam({ name: 'id', description: 'Copy ID' })
  @ApiResponse({ status: 204, description: 'Copy deleted' })
  async remove(
    @Param('id') id: string,
    @User('orgId') orgId: string,
  ): Promise<void> {
    return this.copyService.remove(id, orgId);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate copy for an angle' })
  @ApiResponse({ status: 201, description: 'Copy generated', type: [CopyDto] })
  async generate(
    @Body() generateCopyDto: GenerateCopyDto,
    @User('orgId') orgId: string,
  ): Promise<CopyDto[]> {
    return this.copyService.generate(generateCopyDto, orgId);
  }

  @Get('angle/:angleId')
  @ApiOperation({ summary: 'Get copy for a specific angle' })
  @ApiParam({ name: 'angleId', description: 'Angle ID' })
  @ApiResponse({ status: 200, description: 'Angle copy retrieved' })
  async findByAngle(
    @Param('angleId') angleId: string,
    @User('orgId') orgId: string,
  ): Promise<CopyDto[]> {
    return this.copyService.findByAngle(angleId, orgId);
  }

  @Get('campaign/:campaignId')
  @ApiOperation({ summary: 'Get copy for a specific campaign' })
  @ApiParam({ name: 'campaignId', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign copy retrieved' })
  async findByCampaign(
    @Param('campaignId') campaignId: string,
    @User('orgId') orgId: string,
  ): Promise<CopyDto[]> {
    return this.copyService.findByCampaign(campaignId, orgId);
  }
}
