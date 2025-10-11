import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullConfig } from './bull.config';
import { FileProcessor } from './processor/file.processor';
import { JOB_FILE, JOB_ACTIVITY } from './queue.constants';
import { StorageModule } from '../object-storage/object-storage.module';
import { FileQueueService } from './service/fileQueue.service';
import { ActivityLogModule } from '../activityLogs/activityLog.module';
import { ActivityQueueService } from './service/activityQueue.service';
import { ActivityLogProcessor } from './processor/activityLog.processor';

@Module({
    imports: [
        BullModule.forRootAsync(BullConfig),
        BullModule.registerQueue(
            { name: JOB_FILE.NAME },
            { name: JOB_ACTIVITY.NAME }
        ),
        StorageModule,
        ActivityLogModule,
    ],
    providers: [
        FileQueueService,
        FileProcessor,
        ActivityQueueService,
        ActivityLogProcessor,
    ],
    exports: [
        FileQueueService,
        ActivityQueueService,
    ]
})

export class QueueModule { }
