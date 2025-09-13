// src/modules/analytics/analytics.controller.ts
import { Controller, Post, Param, Query, Get } from '@nestjs/common';
import { AnalyticsService } from 'src/modules/core/analytics/services/analytics.service';
import { ParamsSlugDto } from 'src/common/dtos';
import { GetDailyStatsDto, GetPageTrafficDto, PageTrafficDto } from 'src/modules/core/analytics/dtos/dailyStatistic.dto';
import { DailyStatisticsService } from 'src/modules/core/analytics/services';
import { TrafficAnalysisService } from 'src/modules/core/analytics/services';
@Controller('admin/analytics')
export class AdminAnalyticsController {
    constructor(
        private readonly dailyStatisticsService: DailyStatisticsService,
        private readonly trafficAnalysisService: TrafficAnalysisService,
    ) { }

    @Get('daily')
    async getDailyStats(@Query() query: GetDailyStatsDto) {
        const { limit, start, end } = query;
        if (start && end) {
            return this.dailyStatisticsService.findByDateRange(start, end);
        }
        return this.dailyStatisticsService.findAll(limit ?? 30); // default 30 ngày
    }

    @Get('page')
    async getPage(@Query() query: GetPageTrafficDto):Promise<PageTrafficDto[]> {
        const { date } = query;
        return this.trafficAnalysisService.findByDateRange(date)
    }

}
