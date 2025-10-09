import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { JOB_ACTIVITY } from '../queue.constants';
import { CreateActivityLogDto } from '../../activityLogs/dtos/createActivityLogDto';
import { validateOrReject } from 'class-validator';

Injectable()
export class ActivityQueueService {
    constructor(
        @InjectQueue(JOB_ACTIVITY.NAME)
        private readonly activityLogQueue: Queue
    ) { }

  async enqueueCreateLog(data: CreateActivityLogDto) {    
    await validateOrReject(Object.assign(new CreateActivityLogDto(), data));
    await this.activityLogQueue.add(JOB_ACTIVITY.CREATE_LOG, data, {
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}