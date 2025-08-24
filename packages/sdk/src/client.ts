// Created automatically by Cursor AI (2024-08-24)
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { z } from 'zod';
import {
  Campaign,
  Angle,
  Copy,
  Asset,
  Hashtag,
  Schedule,
  PaginationParams,
  PaginatedResponse,
  ApiError,
  CampaignStatus,
  Platform,
} from './types';

export class VCMClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = 'http://localhost:3001/v1', token?: string) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data) {
          throw new Error(error.response.data.message || 'API Error');
        }
        throw error;
      }
    );
  }

  setToken(token: string) {
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  // Campaign endpoints
  async createCampaign(campaign: Partial<Campaign>): Promise<Campaign> {
    const response = await this.client.post('/campaigns', campaign);
    return response.data;
  }

  async getCampaigns(params?: PaginationParams): Promise<PaginatedResponse<Campaign>> {
    const response = await this.client.get('/campaigns', { params });
    return response.data;
  }

  async getCampaign(id: string): Promise<Campaign> {
    const response = await this.client.get(`/campaigns/${id}`);
    return response.data;
  }

  async updateCampaign(id: string, campaign: Partial<Campaign>): Promise<Campaign> {
    const response = await this.client.put(`/campaigns/${id}`, campaign);
    return response.data;
  }

  async deleteCampaign(id: string): Promise<void> {
    await this.client.delete(`/campaigns/${id}`);
  }

  async startCampaign(id: string): Promise<Campaign> {
    const response = await this.client.post(`/campaigns/${id}/start`);
    return response.data;
  }

  async approveCampaign(id: string): Promise<Campaign> {
    const response = await this.client.post(`/campaigns/${id}/approve`);
    return response.data;
  }

  async getCampaignKit(id: string): Promise<any> {
    const response = await this.client.get(`/campaigns/${id}/kit`);
    return response.data;
  }

  // Angle endpoints
  async createAngle(angle: Partial<Angle>): Promise<Angle> {
    const response = await this.client.post('/angles', angle);
    return response.data;
  }

  async getAngles(params?: PaginationParams): Promise<PaginatedResponse<Angle>> {
    const response = await this.client.get('/angles', { params });
    return response.data;
  }

  async getAngle(id: string): Promise<Angle> {
    const response = await this.client.get(`/angles/${id}`);
    return response.data;
  }

  async updateAngle(id: string, angle: Partial<Angle>): Promise<Angle> {
    const response = await this.client.put(`/angles/${id}`, angle);
    return response.data;
  }

  async deleteAngle(id: string): Promise<void> {
    await this.client.delete(`/angles/${id}`);
  }

  async generateAngles(campaignId: string, count: number = 10): Promise<Angle[]> {
    const response = await this.client.post('/angles/generate', {
      campaignId,
      count,
    });
    return response.data;
  }

  async getAnglesByCampaign(campaignId: string): Promise<Angle[]> {
    const response = await this.client.get(`/angles/campaign/${campaignId}`);
    return response.data;
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ access_token: string; user: any }> {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async getProfile(): Promise<any> {
    const response = await this.client.get('/auth/me');
    return response.data;
  }
}

// Export a default instance
export const vcmClient = new VCMClient();
