import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, context, stack }) => {
    return stack
      ? `[${timestamp}] [${context || 'App'}] ${level}: ${message} - ${stack}`
      : `[${timestamp}] [${context || 'App'}] ${level}: ${message}`;
  }),
);

export const winstonConfig = {
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '14d',
      level: 'info',
      format: logFormat,
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '30d',
      level: 'error',
      format: logFormat,
    }),
  ],
};
