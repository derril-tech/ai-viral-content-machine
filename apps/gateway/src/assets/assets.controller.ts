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
import { AssetsService } from './assets.service';
import {
  CreateAssetDto,
  UpdateAssetDto,
  AssetDto,
  GenerateAssetsDto,
} from './dto/asset.dto';

@ApiTags('assets')
@Controller('assets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new asset' })
  @ApiResponse({
    status: 201,
    description: 'Asset created successfully',
    type: AssetDto,
  })
  async create(
    @Body() createAssetDto: CreateAssetDto,
    @User() user: any,
  ): Promise<AssetDto> {
    try {
      return await this.assetsService.create(createAssetDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create asset',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all assets' })
  @ApiQuery({ name: 'campaignId', required: false, description: 'Filter by campaign ID' })
  @ApiQuery({ name: 'angleId', required: false, description: 'Filter by angle ID' })
  @ApiQuery({ name: 'kind', required: false, description: 'Filter by asset kind' })
  @ApiResponse({
    status: 200,
    description: 'Assets retrieved successfully',
    type: [AssetDto],
  })
  async findAll(
    @Query('campaignId') campaignId?: string,
    @Query('angleId') angleId?: string,
    @Query('kind') kind?: string,
    @User() user?: any,
  ): Promise<AssetDto[]> {
    try {
      return await this.assetsService.findAll({ campaignId, angleId, kind }, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get assets',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get asset by ID' })
  @ApiParam({ name: 'id', description: 'Asset ID' })
  @ApiResponse({
    status: 200,
    description: 'Asset retrieved successfully',
    type: AssetDto,
  })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async findOne(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<AssetDto> {
    try {
      return await this.assetsService.findOne(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get asset',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update asset' })
  @ApiParam({ name: 'id', description: 'Asset ID' })
  @ApiResponse({
    status: 200,
    description: 'Asset updated successfully',
    type: AssetDto,
  })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async update(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
    @User() user: any,
  ): Promise<AssetDto> {
    try {
      return await this.assetsService.update(id, updateAssetDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update asset',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete asset' })
  @ApiParam({ name: 'id', description: 'Asset ID' })
  @ApiResponse({
    status: 200,
    description: 'Asset deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async remove(
    @Param('id') id: string,
    @User() user: any,
  ): Promise<{ message: string }> {
    try {
      return await this.assetsService.remove(id, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete asset',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate assets for an angle' })
  @ApiResponse({
    status: 201,
    description: 'Asset generation initiated successfully',
    type: [AssetDto],
  })
  async generate(
    @Body() generateAssetsDto: GenerateAssetsDto,
    @User() user: any,
  ): Promise<AssetDto[]> {
    try {
      return await this.assetsService.generate(generateAssetsDto, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to generate assets',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('angles/:angleId')
  @ApiOperation({ summary: 'Get assets by angle ID' })
  @ApiParam({ name: 'angleId', description: 'Angle ID' })
  @ApiResponse({
    status: 200,
    description: 'Assets retrieved successfully',
    type: [AssetDto],
  })
  async findByAngle(
    @Param('angleId') angleId: string,
    @User() user: any,
  ): Promise<AssetDto[]> {
    try {
      return await this.assetsService.findByAngle(angleId, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get assets by angle',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('campaigns/:campaignId')
  @ApiOperation({ summary: 'Get assets by campaign ID' })
  @ApiParam({ name: 'campaignId', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Assets retrieved successfully',
    type: [AssetDto],
  })
  async findByCampaign(
    @Param('campaignId') campaignId: string,
    @User() user: any,
  ): Promise<AssetDto[]> {
    try {
      return await this.assetsService.findByCampaign(campaignId, user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get assets by campaign',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
