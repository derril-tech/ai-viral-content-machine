import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignDto, UpdateCampaignDto, CampaignDto, CampaignStatus } from './dto/campaign.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/base.dto';

@Injectable()
export class CampaignsService {
  // Mock data for development
  private campaigns: CampaignDto[] = [];

  async create(
    createCampaignDto: CreateCampaignDto,
    userId: string,
    orgId: string,
  ): Promise<CampaignDto> {
    const campaign: CampaignDto = {
      id: `campaign_${Date.now()}`,
      ...createCampaignDto,
      status: CampaignStatus.CREATED,
      orgId,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.campaigns.push(campaign);
    return campaign;
  }

  async findAll(
    paginationDto: PaginationDto,
    orgId: string,
  ): Promise<PaginatedResponseDto<CampaignDto>> {
    const { page = 1, limit = 20 } = paginationDto;
    const orgCampaigns = this.campaigns.filter(c => c.orgId === orgId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = orgCampaigns.slice(start, end);

    return {
      data,
      total: orgCampaigns.length,
      page,
      limit,
      hasMore: end < orgCampaigns.length,
    };
  }

  async findOne(id: string, orgId: string): Promise<CampaignDto> {
    const campaign = this.campaigns.find(c => c.id === id && c.orgId === orgId);
    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }
    return campaign;
  }

  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
    orgId: string,
  ): Promise<CampaignDto> {
    const campaign = await this.findOne(id, orgId);
    const updatedCampaign = {
      ...campaign,
      ...updateCampaignDto,
      updatedAt: new Date().toISOString(),
    };

    const index = this.campaigns.findIndex(c => c.id === id);
    this.campaigns[index] = updatedCampaign;

    return updatedCampaign;
  }

  async remove(id: string, orgId: string): Promise<void> {
    await this.findOne(id, orgId);
    this.campaigns = this.campaigns.filter(c => c.id !== id);
  }

  async start(id: string, orgId: string): Promise<CampaignDto> {
    const campaign = await this.findOne(id, orgId);
    const updatedCampaign = {
      ...campaign,
      status: CampaignStatus.RESEARCHING,
      updatedAt: new Date().toISOString(),
    };

    const index = this.campaigns.findIndex(c => c.id === id);
    this.campaigns[index] = updatedCampaign;

    return updatedCampaign;
  }

  async approve(id: string, orgId: string): Promise<CampaignDto> {
    const campaign = await this.findOne(id, orgId);
    const updatedCampaign = {
      ...campaign,
      status: CampaignStatus.EXPORTED,
      updatedAt: new Date().toISOString(),
    };

    const index = this.campaigns.findIndex(c => c.id === id);
    this.campaigns[index] = updatedCampaign;

    return updatedCampaign;
  }

  async getKit(id: string, orgId: string): Promise<any> {
    await this.findOne(id, orgId);
    
    // Mock kit data
    return {
      campaignId: id,
      angles: [
        {
          id: 'angle_1',
          title: 'The Unexpected Twist',
          rationale: 'This angle plays on surprise and curiosity...',
          score: 0.85,
        },
        {
          id: 'angle_2',
          title: 'Behind the Scenes',
          rationale: 'Authentic, relatable content that builds trust...',
          score: 0.78,
        },
        {
          id: 'angle_3',
          title: 'The Challenge',
          rationale: 'Engaging format that encourages participation...',
          score: 0.72,
        },
      ],
      copy: {
        tiktok: [
          {
            id: 'copy_1',
            text: 'You won\'t believe what happened when...',
            variant: 'A',
            platform: 'tiktok',
          },
        ],
        instagram: [
          {
            id: 'copy_2',
            text: 'The secret to viral content is...',
            variant: 'A',
            platform: 'instagram',
          },
        ],
      },
      assets: [
        {
          id: 'asset_1',
          type: 'image',
          url: 'https://example.com/image1.jpg',
          prompt: 'Modern, vibrant social media image',
        },
      ],
      hashtags: {
        tiktok: ['#viral', '#trending', '#fyp'],
        instagram: ['#viral', '#trending', '#reels'],
      },
      schedule: {
        posts: [
          {
            id: 'post_1',
            platform: 'tiktok',
            scheduledAt: '2024-08-25T10:00:00Z',
            content: 'copy_1',
            asset: 'asset_1',
          },
        ],
      },
    };
  }
}
