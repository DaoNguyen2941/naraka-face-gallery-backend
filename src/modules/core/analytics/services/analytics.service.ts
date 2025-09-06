// src/modules/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../redis/services/cache.service';
import { FaceViewsService } from './faceViews.service';


@Injectable()
export class AnalyticsService {
  constructor(
    private readonly cacheService: RedisCacheService,
    private readonly faceViewsService: FaceViewsService

  ) { }

  async trackFaceViewBySlug(faceSlug: string) {
    const today = new Date().toISOString().slice(0, 10);
    const key = `analytics:face:${today}:${faceSlug}`;
    const existing = await this.cacheService.exists(key)
    if (!existing) {
      const faceView = await this.faceViewsService.getByFaceSlug(faceSlug)
     await this.cacheService.setCache(key,faceView.views,86400)
    }
    return await this.cacheService.incr(key, 86400);
  }

}
