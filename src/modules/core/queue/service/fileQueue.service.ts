import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { FileEntity } from 'src/modules/core/object-storage/entitys/file.entity';
import { JOB_FILE } from '../queue.constants';

@Injectable()
export class FileQueueService {
  constructor(@InjectQueue(JOB_FILE.NAME) private readonly fileQueue: Queue) { }

  async enqueueDelete(file: FileEntity) {
    await this.fileQueue.add(JOB_FILE.DELETE, { key: file.key }, {
      removeOnComplete: true,
      removeOnFail: false,
    });
  }

  async enqueueDeleteMany(files: FileEntity[]) {
    await this.fileQueue.add(JOB_FILE.DELETE_MANY, {
      keys: files.map(f => f.key),
    }, {
      removeOnComplete: true,
      removeOnFail: false,
    });
  }

}
