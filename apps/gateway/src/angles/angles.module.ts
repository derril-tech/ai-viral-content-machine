import { Module } from '@nestjs/common';
import { AnglesController } from './angles.controller';
import { AnglesService } from './angles.service';

@Module({
  controllers: [AnglesController],
  providers: [AnglesService],
  exports: [AnglesService],
})
export class AnglesModule {}
