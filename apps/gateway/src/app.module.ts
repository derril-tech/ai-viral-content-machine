import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';

import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { AnglesModule } from './angles/angles.module';
import { CopyModule } from './copy/copy.module';
import { AssetsModule } from './assets/assets.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ExportsModule } from './exports/exports.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { HealthModule } from './health/health.module';
import { WebSocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    TerminusModule,
    AuthModule,
    CampaignsModule,
    AnglesModule,
    CopyModule,
    AssetsModule,
    HashtagsModule,
    ScheduleModule,
    ExportsModule,
    AnalyticsModule,
    HealthModule,
    WebSocketModule,
  ],
})
export class AppModule {}
