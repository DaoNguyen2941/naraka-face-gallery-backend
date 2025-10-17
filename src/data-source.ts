import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';

dotenvConfig({ path: '.env' });
const configService = new ConfigService();
const isCompiled = path.extname(__filename) === '.js'; // Kiểm tra nếu đang chạy file .js (trong dist)

const dataSource = new DataSource({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: isCompiled
        ? [
            "dist/**/**/entitys/*.entity.js",
            "dist/**/**/**/entitys/*.entity.js",
        ]
        : [
            "src/**/**/entitys/*.entity.ts",
            "src/**/**/**/entitys/*.entity.ts",
        ],
    migrations: [
        isCompiled
            ? 'dist/database/migrations/*.js'
            : 'src/database/migrations/*.ts',
    ],
    migrationsRun: false,
    synchronize: false,
});

export default dataSource;
