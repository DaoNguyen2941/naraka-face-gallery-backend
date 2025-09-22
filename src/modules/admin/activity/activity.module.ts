import { Module } from '@nestjs/common';
import { AdminActivityController } from './activity.controller';
import { ActivityLogModule } from 'src/modules/core/activityLogs/activityLog.module';

@Module({
    imports: [ActivityLogModule],
    controllers: [AdminActivityController]
})

export class AdminActivityLogModule {}