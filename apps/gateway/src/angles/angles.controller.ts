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
import { AnglesService } from './angles.service';
import {
  CreateAngleDto,
  UpdateAngleDto,
  AngleDto,
  GenerateAnglesDto,
} from './dto/angle.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/base.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';

@ApiTags('angles')
@Controller('angles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnglesController {
  constructor(private readonly anglesService: AnglesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new angle' })
  @ApiResponse({ status: 201, description: 'Angle created', type: AngleDto })
  async create(
    @Body() createAngleDto: CreateAngleDto,
    @User('orgId') orgId: string,
  ): Promise<AngleDto> {
    return this.anglesService.create(createAngleDto, orgId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all angles' })
  @ApiResponse({ status: 200, description: 'Angles retrieved' })
  async findAll(
    @Query() paginationDto: PaginationDto,
    @User('orgId') orgId: string,
  ): Promise<PaginatedResponseDto<AngleDto>> {
    return this.anglesService.findAll(paginationDto, orgId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get angle by ID' })
  @ApiParam({ name: 'id', description: 'Angle ID' })
  @ApiResponse({ status: 200, description: 'Angle retrieved', type: AngleDto })
  async findOne(
    @Param('id') id: string,
    @User('orgId') orgId: string,
  ): Promise<AngleDto> {
    return this.anglesService.findOne(id, orgId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update angle' })
  @ApiParam({ name: 'id', description: 'Angle ID' })
  @ApiResponse({ status: 200, description: 'Angle updated', type: AngleDto })
  async update(
    @Param('id') id: string,
    @Body() updateAngleDto: UpdateAngleDto,
    @User('orgId') orgId: string,
  ): Promise<AngleDto> {
    return this.anglesService.update(id, updateAngleDto, orgId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete angle' })
  @ApiParam({ name: 'id', description: 'Angle ID' })
  @ApiResponse({ status: 204, description: 'Angle deleted' })
  async remove(
    @Param('id') id: string,
    @User('orgId') orgId: string,
  ): Promise<void> {
    return this.anglesService.remove(id, orgId);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate angles for a campaign' })
  @ApiResponse({ status: 201, description: 'Angles generated', type: [AngleDto] })
  async generate(
    @Body() generateAnglesDto: GenerateAnglesDto,
    @User('orgId') orgId: string,
  ): Promise<AngleDto[]> {
    return this.anglesService.generate(generateAnglesDto, orgId);
  }

  @Get('campaign/:campaignId')
  @ApiOperation({ summary: 'Get angles for a specific campaign' })
  @ApiParam({ name: 'campaignId', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign angles retrieved' })
  async findByCampaign(
    @Param('campaignId') campaignId: string,
    @User('orgId') orgId: string,
  ): Promise<AngleDto[]> {
    return this.anglesService.findByCampaign(campaignId, orgId);
  }
}
