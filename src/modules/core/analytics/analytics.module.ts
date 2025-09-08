import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomRedisModule } from '../redis/redis.module';
import {
    DailyStatisticsService,
    AnalyticsService,
    FaceViewsService,
    TrafficAnalysisService
} from "./services";
import { FaceModule } from "../faces/face.moduler";
import {
    AnalyticsDailyStatsEntity,
    TrafficAnalysisEntity,
    AnalyticsFaceViewsEntity,
} from "./entities";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AnalyticsFaceViewsEntity,
            TrafficAnalysisEntity,
            AnalyticsDailyStatsEntity,
        ]),
        CustomRedisModule,
        FaceModule,
    ],
    providers: [
        AnalyticsService,
        FaceViewsService,
        TrafficAnalysisService,
        DailyStatisticsService
    ],
    exports: [
        AnalyticsService,
        FaceViewsService,
        TrafficAnalysisService,
        DailyStatisticsService
    ]
})

export class AnalyticsModule { }