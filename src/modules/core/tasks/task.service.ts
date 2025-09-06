import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression,Interval, Timeout } from '@nestjs/schedule';
import { RedisCacheService } from '../redis/services/cache.service';
import { FaceViewsService } from '../analytics/services/faceViews.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly redisCache: RedisCacheService,
        private readonly faceViewsService: FaceViewsService,

    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleFlush() {
        const today = new Date().toISOString().slice(0, 10);
        const pattern = `analytics:face:${today}:*`;
        const keys = await this.redisCache['redis'].keys(pattern);

        for (const key of keys) {
            const parts = key.split(':'); // analytics:face:2025-09-06:slug-or-id
            const date = parts[2];
            const faceSlug = parts[3];
            console.log(faceSlug);
            
            const views = await this.redisCache.getCache<number>(key);
            if (!views) continue;

            await this.faceViewsService.saveFaceView(faceSlug, date, Number(views));
            await this.redisCache.deleteCache(key); 
        }

        this.logger.log(`Flushed ${keys.length} face view keys to DB`);
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
