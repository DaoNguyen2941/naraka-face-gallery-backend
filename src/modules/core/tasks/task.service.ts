import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { RedisCacheService } from '../redis/services/cache.service';
import { FaceViewsService } from '../analytics/services/faceViews.service';
import { KEY_CACHE_ANALYTICS } from '../analytics/constants';
import { DailyStatisticsService, TrafficAnalysisService } from '../analytics/services';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly redisCache: RedisCacheService,
        private readonly faceViewsService: FaceViewsService,
        private readonly trafficService: TrafficAnalysisService,
        private readonly dailyStatisticsService: DailyStatisticsService,
    ) { }

    @Cron(CronExpression.EVERY_HOUR)
    async flushHourlyStats() {
        const now = new Date();
        let today = now.toISOString().slice(0, 10);
        const hour = now.getHours()
        if (hour === 0) {
            now.setDate(now.getDate() - 1);
            today = now.toISOString().slice(0, 10);
        }
        // --- Tổng pageviews ---
        let totalPageviews = 0;
        await this.flushPattern(`${KEY_CACHE_ANALYTICS.PAGE}:${today}:*`, async (key) => {
            const parts = key.split(':');
            const path = parts.slice(3).join(':'); // để chắc chắn path có dấu ":"
            const views = await this.redisCache.getCache<number>(key);
            if (!views) return;
            totalPageviews += views;
            await this.trafficService.savePageview(path, today, views);
            await this.redisCache.deleteCache(key);
        });

        // --- Unique visitors ---
        const visitorKeys = await this.redisCache.getHsetCache(
            `${KEY_CACHE_ANALYTICS.VISITOR}:${today}`,
            'all',
        );
        // --- Unique sessions ---
        const sessionKeys = await this.redisCache.getHsetCache(
            `analytics:sessions:${today}`,
            'all',
        );
        const countNewVisitor = await this.redisCache.getCache<number>(`${KEY_CACHE_ANALYTICS.NEW_VISITOR}:${today}`)

        const totalVisitors = visitorKeys ? Object.keys(visitorKeys).length : 0;
        const totalSessions = sessionKeys ? Object.keys(sessionKeys).length : 0;

        const newData = {
            date: today,
            pageviews: totalPageviews,
            sessions: totalSessions,
            unique_visitors: totalVisitors,
            new_visitor: countNewVisitor || 0
        }
        await this.dailyStatisticsService.save(newData)
        this.logger.log(`Hourly statistics update for ${today}`);
    }

    @Cron('5 0 * * *')
    async cleanupRedis() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const date = yesterday.toISOString().slice(0, 10);
        await this.redisCache.deleteCache(`${KEY_CACHE_ANALYTICS.VISITOR}:${date}`);
        await this.redisCache.deleteCache(`${KEY_CACHE_ANALYTICS.SESSION}:${date}`);
        await this.redisCache.deleteCache(`${KEY_CACHE_ANALYTICS.NEW_VISITOR}:${date}`);
        this.logger.log(`[Cleanup] Deleted Redis cache for ${date}`);
    }

    @Cron(CronExpression.EVERY_HOUR)
    async updateFaceViewHourly() {
        const today = new Date().toISOString().slice(0, 10);
        // --- Flush Face Views ---
        await this.flushPattern(`${KEY_CACHE_ANALYTICS.FACE}:${today}:*`, async (key) => {
            // key = analytics:face:2025-09-06:faceSlug
            const parts = key.split(':');
            const faceSlug = parts[3];
            const views = await this.redisCache.getCache<number>(key);
            if (!views) return;
            await this.faceViewsService.saveFaceView(faceSlug, today, views);
            await this.redisCache.deleteCache(key);
        });
        this.logger.log(`Flushed Redis counters to DB for ${today}`);
    }

    /** SCAN incremental */
    private async flushPattern(
        pattern: string,
        handler: (key: string) => Promise<void>,
    ) {
        let cursor = '0';
        do {
            const [newCursor, keys] = await this.redisCache.scan(cursor, pattern, 100);
            cursor = newCursor;
            for (const key of keys) {
                try {
                    await handler(key);
                } catch (err) {
                    this.logger.error(`Error processing key ${key}: ${err}`);
                }
            }
        } while (cursor !== '0');
    }

}
