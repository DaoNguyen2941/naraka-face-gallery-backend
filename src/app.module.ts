import { Module } from '@nestjs/common';
import { UseConfigModule } from './config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/constants/jwt.constants';
import { AdminModule } from './modules/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database/database.module';
import { CustomRedisModule } from './modules/core/redis/redis.module';
import { QueueModule } from './modules/core/queue/queue.module';
import { PublicModule } from './modules/public/public.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/core/tasks/task.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';
// import { LoggerModule } from "./common/logger/logger.module";

@Module({
  imports: [
    SentryModule.forRoot(),
    UseConfigModule,
    // LoggerModule,
    DatabaseModule,
    PassportModule,
    QueueModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${jwtConstants.expirationTimeDefault}s` },
    }),
    AdminModule,
    CustomRedisModule,
    PublicModule,
    ScheduleModule.forRoot(),
    TasksModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ]
})
export class AppModule { }
