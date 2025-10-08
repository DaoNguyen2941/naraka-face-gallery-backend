// src/modules/analytics/analytics.controller.ts
import { Controller, Post, Param, Body } from '@nestjs/common';
import { AnalyticsService } from 'src/modules/core/analytics/services/analytics.service';
import { ParamsSlugDto } from 'src/common/dtos';
import { SkipAuth } from 'src/common/decorate/skipAuth';
import { CreatePageviewDto } from './dtos/analytics.dto';

@Controller('analytics')
export class PublicAnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post('/face/:slug/view')
    @SkipAuth()
    async trackFaceView(@Param() params: ParamsSlugDto) {
        const { slug } = params
        await this.analyticsService.trackFaceViewBySlug(slug);
        return {
            success: true,
        };
    }

    @Post('/pageview')
    @SkipAuth()
    async trackPageView(
        @Body() dto: CreatePageviewDto,
    ) {
        await this.analyticsService.trackPageViewByPath(dto)
        return {
            success: true,
        };
    }
}
