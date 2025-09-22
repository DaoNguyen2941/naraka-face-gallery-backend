import {
    Controller,
} from '@nestjs/common';
import { ActivityLogService } from 'src/modules/core/activityLogs/activityLog.service';

@Controller('admin/activity')
export class AdminActivityController {
    constructor(
        private readonly activityService: ActivityLogService
    ) {}

}