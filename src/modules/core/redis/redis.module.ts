import { Module, Global } from '@nestjs/common';
import { RedisModule, } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from './services/cache.service';
import redisConfig from 'src/config/register/redis.config';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [redisConfig],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const redis = configService.get('redis'); // namespace
        return {
          type: 'single',
          host: redis.host,
          port: redis.port,
          db: redis.db,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class CustomRedisModule { }
