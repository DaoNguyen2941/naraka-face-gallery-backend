import { Module, Global } from '@nestjs/common';
import { RedisModule, } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from './services/cache.service';

@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'single',
                host: configService.get('redis.host'),
                port: configService.get<number>('redis.port', 6379),
                db: configService.get<number>('redis.db'),
            }),
            inject: [ConfigService],
        })
    ],
    exports: [
        RedisCacheService
    ],
    providers: [
        RedisCacheService
    ]
})
export class CustomRedisModule { }
