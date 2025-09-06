import { Module } from '@nestjs/common';
import { AnalyticsModule } from 'src/modules/core/analytics/analytics.module';
import { PublicAnalyticsController } from './Analytics.controller';
@Module({
  imports: [AnalyticsModule],
  controllers: [PublicAnalyticsController],
})
export class PublicAnalyticsModule {}
