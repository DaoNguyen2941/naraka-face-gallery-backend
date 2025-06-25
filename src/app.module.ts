import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/typeorm.config';
import { UseConfigModule } from './config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/constants/jwt.constants';
import { AdminModule } from './modules/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [
    UseConfigModule,
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${jwtConstants.expirationTimeDefault}s` },
    }),
    AdminModule,
  ],
})
export class AppModule { }
