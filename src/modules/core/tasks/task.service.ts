import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { RedisCacheService } from '../redis/services/cache.service';
import { FaceViewsService } from '../analytics/services/faceViews.service';
import { TrafficAnalysisService } from '../analytics/services/trafficAnalysis.service';
import { KEY_CACHE_ANALYTICS } from '../analytics/constants';
@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly redisCache: RedisCacheService,
        private readonly faceViewsService: FaceViewsService,
        private readonly trafficService: TrafficAnalysisService,

    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleFlush() {
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

        // --- Flush Top Pages / Traffic Analysis ---
        await this.flushPattern(`${KEY_CACHE_ANALYTICS.PAGE}:${today}:*`, async (key) => {
            // key = analytics:pageviews:2025-09-06:/some/path
            const parts = key.split(':');
            const path = parts.slice(3).join(':'); // để chắc chắn path có dấu ":"

            const views = await this.redisCache.getCache<number>(key);
            if (!views) return;

            await this.trafficService.savePageview(path, today, views);

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
            const [newCursor, keys] = await this.redisCache.scan(pattern,100);
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

    // @Cron('45 * * * * *')
    // handleCron() {
    //     this.logger.debug('Called when the second is 45');
    // }

    // @Interval(10000)
    // handleInterval() {
    //     this.logger.debug('Called every 10 seconds');
    // }

    // @Timeout(5000)
    // handleTimeout() {
    //     this.logger.debug('Called once after 5 seconds');
    // }

}
