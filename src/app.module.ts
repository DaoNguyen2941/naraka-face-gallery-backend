import { Module } from '@nestjs/common';
import { UseConfigModule } from './config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/constants/jwt.constants';
import { AdminModule } from './modules/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database/database.module';
import { JwtService } from '@nestjs/jwt';
import { CustomRedisModule } from './modules/core/redis/redis.module';
import { QueueModule } from './modules/core/queue/queue.module';
@Module({
  imports: [
    UseConfigModule,
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
  ],
  providers: [
    JwtService
  ]
})
export class AppModule { }
