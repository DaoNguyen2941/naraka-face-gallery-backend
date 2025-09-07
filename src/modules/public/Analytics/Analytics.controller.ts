// src/modules/analytics/analytics.controller.ts
import { Controller, Post, Param, Body } from '@nestjs/common';
import { AnalyticsService } from 'src/modules/core/analytics/services/analytics.service';
import { ParamsSlugDto } from 'src/common/dtos';
import { SkipAuth } from 'src/common/decorate/skipAuth';

@Controller('analytics')
export class PublicAnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post('/face/:slug/view')
    @SkipAuth()
    async trackFaceView(@Param() params: ParamsSlugDto) {
        const { slug } = params
        const viewsCount = await this.analyticsService.trackFaceViewBySlug(slug);
        return {
            success: true,
            viewsCount
        };
    }

    @Post('/pageview')
    @SkipAuth()
    async trackPageView(@Body('path') path: string) {
        await this.analyticsService.trackPageViewByPath(path)
        return {
            success: true,
        };
    }
}
