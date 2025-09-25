import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entitys/tag.entity';
import { TagService } from './tag.service';
import { CustomRedisModule } from '../redis/redis.module';
import { QueueModule } from '../queue/queue.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([TagEntity]),
        CustomRedisModule,
        QueueModule
    ],
    providers: [TagService],
    exports: [TagService],
})

export class TagModule { }
