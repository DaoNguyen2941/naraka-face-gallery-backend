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

    this.cacheService.incr(key, 86400).catch(err => {
      console.error('Redis incr face view failed:', err);
    });

    return { success: true };
  }

  async trackPageViewByPath(data: CreatePageviewDto) {
    const { path, visitorId, sessionId, newVisitor } = data;
    const today = new Date().toISOString().slice(0, 10);

    const tasks = [
      this.cacheService.incr(`${KEY_CACHE_ANALYTICS.PAGE}:${today}:${path}`),
      this.cacheService.setHsetCache(`${KEY_CACHE_ANALYTICS.VISITOR}:${today}`, { [visitorId]: 1 }),
      this.cacheService.setHsetCache(`${KEY_CACHE_ANALYTICS.SESSION}:${today}`, { [sessionId]: 1 }),
    ];

    if (newVisitor) {
      tasks.push(this.cacheService.incr(`${KEY_CACHE_ANALYTICS.NEW_VISITOR}:${today}`));
    }

    Promise.all(tasks).catch(err => {
      console.error('Redis trackPageView failed:', err);
    });

    return { success: true };
  }
}
