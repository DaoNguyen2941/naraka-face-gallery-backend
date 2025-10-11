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
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single', // hoặc 'cluster'
        url: `redis://${config.get('redis.host')}:${config.get('redis.port')}`,
      }),
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class CustomRedisModule { }
