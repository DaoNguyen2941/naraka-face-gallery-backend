import {
    Controller,
    Get,
    Query
} from '@nestjs/common';
import { ActivityLogService } from 'src/modules/core/activityLogs/activityLog.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetActivityLogsDto } from 'src/modules/core/activityLogs/dtos/getActivityLogs.dto';
import { PageDto } from 'src/common/dtos';
import { ActivityLogEntity } from 'src/modules/core/activityLogs/entity/activityLog.entity';

@ApiTags('activity-logs')
@Controller('admin/activity-log')
export class AdminActivityController {
    constructor(
        private readonly activityService: ActivityLogService
    ) { }

    @Get()
    @ApiOkResponse({
        type: PageDto<ActivityLogEntity>,
        description: 'Danh sách activity logs phân trang',
    })
    async findAll(
        @Query() query: GetActivityLogsDto,
    ): Promise<PageDto<ActivityLogEntity>> {
        return this.activityService.findAll(query);
    }

}