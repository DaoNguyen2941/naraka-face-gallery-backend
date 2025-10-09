import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as Sentry from '@sentry/nestjs';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      const { method, originalUrl } = req;

      if (statusCode >= 400) {
        const msg = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;
        this.logger.warn(msg, { context: 'HTTP' });
        if (statusCode >= 500) {
          Sentry.captureMessage(msg);
        }
      }
    });
    next();
  }
}
