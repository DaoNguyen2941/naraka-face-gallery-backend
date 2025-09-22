import { Module } from '@nestjs/common';
import { AdminActivityController } from './activity.controller';
import { ActivityLogModule } from 'src/modules/core/activityLogs/activityLog.mudule';

@Module({
    imports: [ActivityLogModule],
    controllers: [AdminActivityController]
})

export class AdminActivityLogModule {}