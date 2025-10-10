import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { JOB_FILE } from '../queue.constants';
import { StorageService } from '../../object-storage/storage.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Inject } from '@nestjs/common';
import { Logger } from 'winston';

@Processor(JOB_FILE.NAME)
export class FileProcessor {
  constructor(
    private readonly storageService: StorageService,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER)
    // private readonly logger: Logger,
  ) { }

  @Process(JOB_FILE.DELETE)
  async handleDelete(job: Job<{ key: string }>) {
    try {
      await this.storageService.deleteFile(job.data.key);
    } catch (err) {
      // this.logger.error(`❌ Failed to delete file: ${job.data.key}`, err);
      console.log(`❌ Failed to delete file: ${job.data.key}`, err);
      
    }
  }

  @Process(JOB_FILE.DELETE_MANY)
  async handleDeleteMany(job: Job<{ keys: string[] }>) {
    for (const key of job.data.keys) {
      try {
        await this.storageService.deleteFile(key);
      } catch (err) {
        console.error(`❌ Failed to delete file: ${key}`, err);
      }
    }
  }

}
