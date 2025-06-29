import { Module } from '@nestjs/common';
import { FaceModule } from 'src/modules/core/faces/face.moduler';
import { TagModule } from 'src/modules/core/tags/tag.module';
import { AdminTagController } from './tag.controller';

@Module({
  imports: [TagModule],
  controllers: [AdminTagController],
})
export class AdminTagModule {}
