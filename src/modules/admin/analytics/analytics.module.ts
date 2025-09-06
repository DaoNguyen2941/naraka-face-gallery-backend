import { Module } from '@nestjs/common';
import { AnalyticsModule } from 'src/modules/core/analytics/analytics.module';
import { AdminAnalyticsController } from './analytics.controller';
@Module({
  imports: [AnalyticsModule],
  controllers: [AdminAnalyticsController],
})
export class AdminAnalyticsModule {}
