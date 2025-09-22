import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entitys/admin.entity';
import { AdminAuthModule } from './auth/adminAuth.module';
import { AdminCharactersModule } from './characters/character.module';
import { StorageModule } from '../core/object-storage/object-storage.module';
import { CustomRedisModule } from '../core/redis/redis.module';
import { AdminCategoryModule } from './categorys/category.module';
import { AdminFaceModule } from './faces/face.module';
import { AdminTagModule } from './tags/tag.modulle';
import { APP_GUARD } from '@nestjs/core';
import { JwtAdminAuthGuard } from './auth/guards/jwtAdminAuth.guard';
import { AdminAnalyticsModule } from './analytics/analytics.module';
import { AdminActivityLogModule } from './activity/activity.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    AdminAuthModule,
    AdminCharactersModule,
    StorageModule,
    CustomRedisModule,
    AdminCategoryModule,
    AdminFaceModule,
    AdminTagModule,
    AdminAnalyticsModule,
    AdminActivityLogModule,
  ],
  controllers: [
    AdminController,
  ],
  providers: [
    AdminService,
    {
      provide: APP_GUARD,
      useClass: JwtAdminAuthGuard,
    },
  ],
  exports: [AdminService],
})
export class AdminModule { }