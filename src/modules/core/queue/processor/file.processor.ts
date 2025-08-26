import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { JOB_FILE } from '../queue.constants';
import { StorageService } from '../../object-storage/storage.service';

@Processor(JOB_FILE.NAME)
export class FileProcessor {
  constructor(private readonly storageService: StorageService) {}

  @Process(JOB_FILE.DELETE)
  async handleDelete(job: Job<{ key: string }>) {
    await this.storageService.deleteFile(job.data.key);
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
