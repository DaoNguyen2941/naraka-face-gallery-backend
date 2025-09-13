// src/modules/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../redis/services/cache.service';
import { KEY_CACHE_ANALYTICS } from '../constants';
import { CreatePageviewDto } from 'src/modules/public/Analytics/dtos/analytics.dto';
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

  async trackPageViewByPath(data: CreatePageviewDto) {
    const { path, visitorId, sessionId, newVisitor } = data
    const today = new Date().toISOString().slice(0, 10);
    const key = `${KEY_CACHE_ANALYTICS.PAGE}:${today}:${path}`;
    await this.cacheService.incr(key);
    // unique visitors
    await this.cacheService.setHsetCache(`${KEY_CACHE_ANALYTICS.VISITOR}:${today}`, {
      [visitorId]: 1,
    });
    // unique sessions
    await this.cacheService.setHsetCache(`${KEY_CACHE_ANALYTICS.SESSION}:${today}`, {
      [sessionId]: 1,
    });
    if (newVisitor) {
      await this.cacheService.incr(`${KEY_CACHE_ANALYTICS.NEW_VISITOR}:${today}`)
    }
  }
}
