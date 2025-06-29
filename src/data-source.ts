import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });
const configService = new ConfigService();

const dataSource = new DataSource({
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [
        "src/**/**/*.entity.ts",
        "src/**/**/entitys/*.entity.ts",
    ],
   migrations: ['src/database/migrations/*.ts'],
    migrationsRun: false,
    synchronize: false,  // Chỉ đặt thành true trong môi trường phát triển,nếu dùng migration thì không để true
});

export default dataSource;
