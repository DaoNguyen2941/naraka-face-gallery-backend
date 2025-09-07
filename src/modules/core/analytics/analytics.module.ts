import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomRedisModule } from '../redis/redis.module';
import { AnalyticsFaceViews } from "./entities/analyticsFaceViews.entity";
import { TrafficAnalysisEntity } from "./entities/trafficAnalysis.entity";
import { AnalyticsService } from "./services/analytics.service";
import { FaceViewsService } from "./services/faceViews.service";
import { FaceModule } from "../faces/face.moduler";
import { TrafficAnalysisService } from "./services/trafficAnalysis.service";
@Module({
    imports: [
        TypeOrmModule.forFeature([
            AnalyticsFaceViews,
            TrafficAnalysisEntity,
        ]),
        CustomRedisModule,
        FaceModule,
    ],
    providers: [
        AnalyticsService,
        FaceViewsService,
        TrafficAnalysisService,
    ],
    exports: [
        AnalyticsService,
        FaceViewsService,
        TrafficAnalysisService
    ]
})

export class AnalyticsModule { }