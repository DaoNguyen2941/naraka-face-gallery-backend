import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullConfig } from './bull.config';
import { FileProcessor } from './processor/file.processor';
import { JOB_FILE } from './queue.constants';
import { StorageModule } from '../object-storage/object-storage.module';
import { FileQueueService } from './service/fileQueue.service';

@Module({
    imports: [
        BullModule.forRootAsync(BullConfig),
        BullModule.registerQueue(
            { name: JOB_FILE.NAME }
        ),
        StorageModule
    ],
    providers: [
        FileQueueService,
        FileProcessor,
    ],
    exports: [
        FileQueueService,
    ]
})

export class QueueModule { }
