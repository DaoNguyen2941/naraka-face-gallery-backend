// src/modules/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../redis/services/cache.service';
import { KEY_CACHE_ANALYTICS } from '../constants';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly cacheService: RedisCacheService,
  ) { }

  async trackFaceViewBySlug(faceSlug: string) {
    const today = new Date().toISOString().slice(0, 10);
    const key = `${KEY_CACHE_ANALYTICS.FACE}:${today}:${faceSlug}`;
    // const existing = await this.cacheService.exists(key)
    // if (!existing) {
    //   const faceView = await this.faceViewsService.getByFaceSlug(faceSlug)
    //  await this.cacheService.setCache(key,faceView.views,86400)
    // }
    return await this.cacheService.incr(key, 86400);
  }

  async trackPageViewByPath(path: string) {
    const today = new Date().toISOString().slice(0, 10);
    const key = `${KEY_CACHE_ANALYTICS.PAGE}:${today}:${path}`;
    return await this.cacheService.incr(key, 86400);
  }


}
