import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLogEntity } from './entity/activityLog.entity';
import { ActivityLogService } from './activityLog.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ActivityLogEntity])
    ],
    providers: [ActivityLogService],
    exports: [ActivityLogService],
})

export class ActivityLogModule {}