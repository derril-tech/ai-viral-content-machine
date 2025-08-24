import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAngleDto,
  UpdateAngleDto,
  AngleDto,
  GenerateAnglesDto,
} from './dto/angle.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/base.dto';

@Injectable()
export class AnglesService {
  // Mock data for development
  private angles: AngleDto[] = [];

  async create(createAngleDto: CreateAngleDto, orgId: string): Promise<AngleDto> {
    const angle: AngleDto = {
      id: `angle_${Date.now()}`,
      ...createAngleDto,
      score: Math.random() * 0.3 + 0.7, // Random score between 0.7-1.0
      meta: createAngleDto.meta || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.angles.push(angle);
    return angle;
  }

  async findAll(
    paginationDto: PaginationDto,
    orgId: string,
  ): Promise<PaginatedResponseDto<AngleDto>> {
    const { page = 1, limit = 20 } = paginationDto;
    const orgAngles = this.angles.filter(a => a.orgId === orgId);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = orgAngles.slice(start, end);

    return {
      data,
      total: orgAngles.length,
      page,
      limit,
      hasMore: end < orgAngles.length,
    };
  }

  async findOne(id: string, orgId: string): Promise<AngleDto> {
    const angle = this.angles.find(a => a.id === id && a.orgId === orgId);
    if (!angle) {
      throw new NotFoundException(`Angle with ID ${id} not found`);
    }
    return angle;
  }

  async update(
    id: string,
    updateAngleDto: UpdateAngleDto,
    orgId: string,
  ): Promise<AngleDto> {
    const angle = await this.findOne(id, orgId);
    const updatedAngle = {
      ...angle,
      ...updateAngleDto,
      updatedAt: new Date().toISOString(),
    };

    const index = this.angles.findIndex(a => a.id === id);
    this.angles[index] = updatedAngle;

    return updatedAngle;
  }

  async remove(id: string, orgId: string): Promise<void> {
    await this.findOne(id, orgId);
    this.angles = this.angles.filter(a => a.id !== id);
  }

  async generate(generateAnglesDto: GenerateAnglesDto, orgId: string): Promise<AngleDto[]> {
    const { campaignId, count = 10 } = generateAnglesDto;
    
    // Mock angle generation
    const mockAngles = [
      {
        title: 'The Unexpected Twist',
        rationale: 'This angle plays on surprise and curiosity, leveraging the human tendency to seek closure and answers.',
        score: 0.85,
      },
      {
        title: 'Behind the Scenes',
        rationale: 'Authentic, relatable content that builds trust and shows the human side of your brand.',
        score: 0.78,
      },
      {
        title: 'The Challenge',
        rationale: 'Engaging format that encourages participation and creates a sense of community.',
        score: 0.72,
      },
      {
        title: 'The Comparison',
        rationale: 'Before/after or this vs that content that clearly demonstrates value and transformation.',
        score: 0.68,
      },
      {
        title: 'The Secret',
        rationale: 'Exclusive information that makes viewers feel like insiders with special access.',
        score: 0.65,
      },
    ];

    const generatedAngles: AngleDto[] = mockAngles.slice(0, count).map((mock, index) => ({
      id: `angle_gen_${Date.now()}_${index}`,
      ...mock,
      campaignId,
      meta: {
        generated: true,
        timestamp: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    this.angles.push(...generatedAngles);
    return generatedAngles;
  }

  async findByCampaign(campaignId: string, orgId: string): Promise<AngleDto[]> {
    return this.angles.filter(a => a.campaignId === campaignId && a.orgId === orgId);
  }
}
