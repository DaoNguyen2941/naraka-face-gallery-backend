import { Module } from '@nestjs/common';
import { PublicTagController } from './tag.controller';
import { TagModule } from 'src/modules/core/tags/tag.module';

@Module({
  imports: [TagModule],
  controllers: [PublicTagController],
})
export class PublicTagModule { }
