import { Module } from '@nestjs/common';
import { CopyController } from './copy.controller';
import { CopyService } from './copy.service';

@Module({
  controllers: [CopyController],
  providers: [CopyService],
  exports: [CopyService],
})
export class CopyModule {}
