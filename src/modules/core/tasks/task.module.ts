import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { CustomRedisModule } from '../redis/redis.module';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
    imports: [CustomRedisModule, AnalyticsModule],
    providers: [TasksService],
})
export class TasksModule { }