import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Mock user validation
    if (email === 'test@example.com' && password === 'password') {
      return {
        id: 'user_1',
        email: 'test@example.com',
        orgId: 'org_1',
        role: 'admin',
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      orgId: user.orgId,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        orgId: user.orgId,
        role: user.role,
      },
    };
  }
}
