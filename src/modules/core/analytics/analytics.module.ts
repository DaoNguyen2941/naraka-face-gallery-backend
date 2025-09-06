import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomRedisModule } from '../redis/redis.module';
import { AnalyticsFaceViews } from "./entities/analyticsFaceViews.entity";
import { AnalyticsService } from "./services/analytics.service";
import { FaceViewsService } from "./services/faceViews.service";
import { FaceModule } from "../faces/face.moduler";
@Module({
    imports: [
        TypeOrmModule.forFeature([AnalyticsFaceViews]),
        CustomRedisModule, FaceModule
    ],
    providers: [AnalyticsService, FaceViewsService],
    exports: [AnalyticsService, FaceViewsService]
})

export class AnalyticsModule { }