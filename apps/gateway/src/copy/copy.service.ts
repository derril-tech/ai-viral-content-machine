import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCopyDto,
  UpdateCopyDto,
  CopyDto,
  GenerateCopyDto,
  Platform,
} from './dto/copy.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/base.dto';

@Injectable()
export class CopyService {
  // Mock data for development
  private copies: CopyDto[] = [];

  async create(createCopyDto: CreateCopyDto, orgId: string): Promise<CopyDto> {
    const copy: CopyDto = {
      id: `copy_${Date.now()}`,
      ...createCopyDto,
      bannedFlags: createCopyDto.bannedFlags || {},
      meta: createCopyDto.meta || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.copies.push(copy);
    return copy;
  }

  async findAll(
    paginationDto: PaginationDto,
    orgId: string,
  ): Promise<PaginatedResponseDto<CopyDto>> {
    const { page = 1, limit = 20 } = paginationDto;
    const orgCopies = this.copies.filter(c => c.orgId === orgId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = orgCopies.slice(start, end);

    return {
      data,
      total: orgCopies.length,
      page,
      limit,
      hasMore: end < orgCopies.length,
    };
  }

  async findOne(id: string, orgId: string): Promise<CopyDto> {
    const copy = this.copies.find(c => c.id === id && c.orgId === orgId);
    if (!copy) {
      throw new NotFoundException(`Copy with ID ${id} not found`);
    }
    return copy;
  }

  async update(
    id: string,
    updateCopyDto: UpdateCopyDto,
    orgId: string,
  ): Promise<CopyDto> {
    const copy = await this.findOne(id, orgId);
    const updatedCopy = {
      ...copy,
      ...updateCopyDto,
      updatedAt: new Date().toISOString(),
    };

    const index = this.copies.findIndex(c => c.id === id);
    this.copies[index] = updatedCopy;

    return updatedCopy;
  }

  async remove(id: string, orgId: string): Promise<void> {
    await this.findOne(id, orgId);
    this.copies = this.copies.filter(c => c.id !== id);
  }

  async generate(generateCopyDto: GenerateCopyDto, orgId: string): Promise<CopyDto[]> {
    const { angleId, platforms, variants = 2 } = generateCopyDto;
    
    // Mock copy generation based on platform
    const platformCopyTemplates = {
      [Platform.TIKTOK]: [
        {
          text: "You won't believe what happened when I tried this... 😱 #viral #trending",
          readingLevel: 3,
        },
        {
          text: "POV: When you discover this amazing hack that changes everything 👀",
          readingLevel: 2,
        },
      ],
      [Platform.INSTAGRAM]: [
        {
          text: "The secret to viral content that nobody talks about... 🤫\n\nSwipe to see the transformation 👉",
          readingLevel: 4,
        },
        {
          text: "Before vs After: The results speak for themselves 📈\n\nWhat do you think? Drop a ❤️ if you agree",
          readingLevel: 3,
        },
      ],
      [Platform.YOUTUBE]: [
        {
          text: "I Tried This Viral Hack For 30 Days - Here's What Happened",
          readingLevel: 5,
        },
        {
          text: "The Truth About Viral Content That Nobody Wants You To Know",
          readingLevel: 6,
        },
      ],
      [Platform.TWITTER]: [
        {
          text: "Hot take: This is why your content isn't going viral 🧵\n\n1/5",
          readingLevel: 4,
        },
        {
          text: "Just discovered something that will change everything about viral marketing 👇",
          readingLevel: 3,
        },
      ],
      [Platform.LINKEDIN]: [
        {
          text: "The Viral Content Formula That Generated 10M+ Views\n\nHere's what I learned after analyzing 1000+ viral posts...",
          readingLevel: 7,
        },
        {
          text: "3 Proven Strategies That Will Make Your Content Go Viral\n\nStrategy #1: Hook psychology...",
          readingLevel: 6,
        },
      ],
    };

    const generatedCopies: CopyDto[] = [];

    platforms.forEach((platform) => {
      const templates = platformCopyTemplates[platform] || [];
      
      for (let i = 0; i < variants; i++) {
        const template = templates[i % templates.length];
        const copy: CopyDto = {
          id: `copy_gen_${Date.now()}_${platform}_${i}`,
          campaignId: 'mock_campaign_id', // This would come from the angle
          angleId,
          platform,
          variant: String.fromCharCode(65 + i), // A, B, C, etc.
          text: template.text,
          readingLevel: template.readingLevel,
          bannedFlags: {},
          meta: {
            generated: true,
            platform,
            variant: i + 1,
            timestamp: new Date().toISOString(),
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        generatedCopies.push(copy);
      }
    });

    this.copies.push(...generatedCopies);
    return generatedCopies;
  }

  async findByAngle(angleId: string, orgId: string): Promise<CopyDto[]> {
    return this.copies.filter(c => c.angleId === angleId && c.orgId === orgId);
  }

  async findByCampaign(campaignId: string, orgId: string): Promise<CopyDto[]> {
    return this.copies.filter(c => c.campaignId === campaignId && c.orgId === orgId);
  }
}
