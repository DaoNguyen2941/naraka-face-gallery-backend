import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { JOB_ACTIVITY } from '../queue.constants';
import { ActivityLogService } from '../../activityLogs/activityLog.service';
import { CreateActivityLogDto } from '../../activityLogs/dtos/createActivityLogDto';

@Processor(JOB_ACTIVITY.NAME)
export class ActivityLogProcessor {
  constructor(
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Process(JOB_ACTIVITY.CREATE_LOG)
  async handleLog(job: Job<CreateActivityLogDto>) {
        await this.activityLogService.logAction(job.data)
  }

}
