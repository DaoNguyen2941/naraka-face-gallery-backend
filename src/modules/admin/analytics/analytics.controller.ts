// src/modules/analytics/analytics.controller.ts
import { Controller, Post, Param } from '@nestjs/common';
import { AnalyticsService } from 'src/modules/core/analytics/services/analytics.service';
import { ParamsSlugDto } from 'src/common/dtos';
// Controller
@Controller('analytics')
export class AdminAnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }
}
