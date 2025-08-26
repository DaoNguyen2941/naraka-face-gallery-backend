import { SharedBullAsyncConfiguration } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const BullConfig: SharedBullAsyncConfiguration = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    redis: {
      host: configService.get<string>('redis.host'),
      port: configService.get<number>('redis.port'),
    },
  }),
};
