import "./instrument";

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RequestLoggerMiddleware } from './common/logger/request-logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER); // 🔹 Lấy Winston logger từ DI
  app.useLogger(logger);
  app.use(new RequestLoggerMiddleware(logger).use);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const configService = app.get(ConfigService);
  app.use(cookieParser());
  const PORT = configService.get('PORT') || 3001;
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(PORT, () => {
    logger.log(`App listening on port ${PORT} ❤️`);
  });
}
bootstrap();
